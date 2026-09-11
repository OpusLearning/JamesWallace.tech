// server/index.js

// Force IPv4 for all outbound DNS lookups (MailerLite only allows our IPv4)
import { setDefaultResultOrder } from "node:dns";
setDefaultResultOrder("ipv4first");

/**
 * 1. Load environment variables
 */
import dotenv from "dotenv";
dotenv.config();
console.log("OPENAI_API_KEY", process.env.OPENAI_API_KEY ? "loaded" : "MISSING");  // never print the key itself

/**
 * 2. Imports & setup
 */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";
import { OpenAI } from "openai";
import { getStripe, TIERS } from "./stripe.js";
import { createOrder, saveEnquiry, markEnquiryEmailed, saveHelperChat, storageHealth } from "./db.js";
import { answer as helperAnswer, rateLimit as helperRateLimit, MAX_CHARS as HELPER_MAX_CHARS } from "./helper.js";
import { sendPurchaseConfirmation, sendContactNotification, sendContactAcknowledgement } from "./email.js";

const app = express();

// Global request-timing middleware
app.use((req, res, next) => {
  const start = performance.now();
  res.once("finish", () => {
    const ms = (performance.now() - start).toFixed(1);
    console.log(`[perf] ${req.method} ${req.path} completed in ${ms} ms`);
  });
  next();
});

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://jameswallace.tech",
  "https://blog.jameswallace.tech",
];
app.use(cors({ origin: allowedOrigins }));

/**
 * Stripe webhook — must receive raw body BEFORE JSON middleware
 */
app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = getStripe().webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).json({ error: "Invalid signature" });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_details?.email || "";
      const name = session.customer_details?.name || "";
      const tier = session.metadata?.tier || "";
      const tierData = TIERS[tier];

      try {
        createOrder({
          email,
          name,
          tier,
          amount: session.amount_total || 0,
          stripeSessionId: session.id,
          stripePaymentId: session.payment_intent || null,
        });
        console.log(`[webhook] Order created for ${email}, tier=${tier}`);
      } catch (dbErr) {
        console.error("[webhook] DB write failed:", dbErr.message);
      }

      try {
        await sendPurchaseConfirmation(email, name, tier, tierData?.name || tier);
        console.log(`[webhook] Confirmation email sent to ${email}`);
      } catch (emailErr) {
        console.error("[webhook] Email failed:", emailErr.message);
      }
    }

    return res.json({ received: true });
  }
);

// JSON body parser for all other routes
app.use(bodyParser.json({ limit: "15mb" }));

/**
 * 3. Stripe checkout — create session, return redirect URL
 */
app.post("/api/checkout", async (req, res) => {
  const { tier } = req.body;
  if (!tier || !(tier in TIERS)) {
    return res.status(400).json({ error: "Invalid tier" });
  }

  const tierData = TIERS[tier];
  const baseUrl = process.env.SITE_URL || "https://jameswallace.tech";

  try {
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: tierData.name,
              description: tierData.description,
            },
            unit_amount: tierData.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
      metadata: { tier },
    });
    return res.json({ url: session.url });
  } catch (err) {
    console.error("[/api/checkout] error:", err.message);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
});

/**
 * 4. Contact form
 */
app.post("/api/contact", async (req, res) => {
  const { name, email, message, _hp } = req.body;
  // Honeypot — bots fill this hidden field, humans don't
  if (_hp) return res.json({ ok: true });

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // Store first. An enquiry must survive the notification failing, which is exactly what was happening.
  let id = null;
  try {
    id = saveEnquiry({ name: name.trim(), email: email.trim(), message: message.trim(), page: req.body.page || req.get("referer") || null });
  } catch (err) {
    console.error("[/api/contact] could not store enquiry:", err.message);
  }

  try {
    await sendContactNotification(name.trim(), email.trim(), message.trim());
    await sendContactAcknowledgement(name.trim(), email.trim());
    if (id) markEnquiryEmailed(id, true, null);
    return res.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] email failed:", err.message);
    if (id) markEnquiryEmailed(id, false, err.message);
    // The enquiry is saved and the agent will pick it up, so do not tell a worried parent it failed.
    if (id) return res.json({ ok: true });
    return res.status(500).json({ error: "Failed to send message. Please try emailing hello@jameswallace.tech directly." });
  }
});

/**
 * 5. MailerLite subscribe — blog lead magnet opt-in
 */
app.post("/api/subscribe", async (req, res) => {
  const { name, email, _hp } = req.body;
  if (_hp) return res.json({ ok: true }); // honeypot

  if (!email?.trim()) {
    return res.status(400).json({ error: "Email address is required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const ML_KEY = process.env.MAILERLITE_API_KEY;
  const ML_GROUP = process.env.MAILERLITE_GROUP_ID;

  try {
    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ML_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        fields: { name: name?.trim() || "" },
        groups: [ML_GROUP],
      }),
    });

    if (!mlRes.ok && mlRes.status !== 409) {
      const err = await mlRes.text();
      console.error("[/api/subscribe] MailerLite error:", err);
      return res.status(500).json({ error: "Could not add you to the list — please try again." });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("[/api/subscribe] error:", err.message);
    return res.status(500).json({ error: "Something went wrong — please try again." });
  }
});

/**
 * 6. Initialise OpenAI client (transcription and speech; the assistant builds its own — see helper.js)
 */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * /api/health — is the site still able to record an enquiry?
 */
app.get("/api/health", (req, res) => {
  const storage = storageHealth();
  res.status(storage.writable ? 200 : 503).json({ ok: storage.writable, storage, postmark: Boolean(process.env.POSTMARK_API_KEY) });
});

/**
 * 7. /api/helper — the assistant in the corner of the site.
 *
 * Deliberately narrow: no tools, no lookups, a hard per-IP rate limit and a fixed body of published facts (helper.js).
 * Every exchange is stored so James can see what people ask; anything that needs him goes through /api/contact, which
 * stores an enquiry and puts it on his board.
 */
app.post("/api/helper", async (req, res) => {
  const { message, history, page, sessionId } = req.body || {};
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Say something and I will try to help." });
  }
  if (message.length > HELPER_MAX_CHARS) {
    return res.json({
      reply: "That is a lot to take in at once. Could you give me the short version, or use the form below so James reads the whole thing himself?",
      offerForm: true,
    });
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.ip || "unknown";
  const limited = helperRateLimit(ip);
  if (limited) {
    return res.json({
      reply:
        limited === "day"
          ? "That is as much as I can answer today. Leave your name and email below and James will pick it up himself."
          : "Give me a few minutes to catch up. If it is urgent, leave your details below or ring James on 07809 735887.",
      offerForm: true,
    });
  }

  const out = await helperAnswer({ message, history, page });
  try {
    saveHelperChat({
      sessionId: String(sessionId || "").slice(0, 40) || "anon",
      page: page || null,
      question: message.slice(0, 2000),
      reply: out.reply.slice(0, 4000),
      degraded: out.degraded,
    });
  } catch (err) {
    console.error("[/api/helper] could not store chat:", err.message);
  }
  return res.json({ reply: out.reply, offerForm: out.offerForm });
});

/**
 * 7b. /api/agent — the older voice-chat endpoint at /chat, now answered by the same assistant.
 *
 * It used to run an unconstrained function-calling loop with no system prompt and no rate limit, over four tools that
 * all returned invented data — including a placeholder Calendly link a visitor could have been handed as if it were
 * James's diary. Anyone who found the endpoint could have run their own chatbot on his OpenAI bill.
 */
app.post("/api/agent", async (req, res) => {
  const { message, history, page } = req.body || {};
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "message"' });
  }
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.ip || "unknown";
  if (helperRateLimit(ip)) {
    return res.json({ reply: "That is as much as I can answer for now. James is on 07809 735887." });
  }
  const out = await helperAnswer({ message, history, page });
  return res.json({ reply: out.reply });
});

/**
 * 8. /api/transcribe — Whisper transcription with metrics
 */
app.post("/api/transcribe", async (req, res) => {
  console.log(
    "[api/transcribe] audioBase64 length=",
    req.body.audioBase64?.length
  );
  const { audioBase64 } = req.body;
  if (typeof audioBase64 !== "string" || !audioBase64) {
    return res.status(400).json({ error: 'Missing or invalid "audioBase64"' });
  }

  const t0 = performance.now();
  try {
    const tmpPath = path.join("/tmp", `audio-${Date.now()}.webm`);
    fs.writeFileSync(tmpPath, Buffer.from(audioBase64, "base64"));
    console.log("[api/transcribe] wrote file=", tmpPath);

    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: fs.createReadStream(tmpPath),
      filename: path.basename(tmpPath),
      response_format: "text",
    });
    console.log("[api/transcribe] transcription=", transcription);

    const duration = (performance.now() - t0).toFixed(1);
    console.log(`[perf] /api/transcribe completed in ${duration} ms`);
    return res.json({ transcript: transcription });
  } catch (err) {
    console.error("[/api/transcribe] error:", err.response?.data || err);
    return res
      .status(500)
      .json({ error: "Transcription failed", details: err.message });
  }
});

/**
 * 9. /api/tts — Text-to-Speech (non-streaming fallback)
 */
app.post("/api/tts", async (req, res) => {
  console.log("[api/tts] body=", req.body);
  const { text, voice = "alloy", format = "mp3" } = req.body;
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "text"' });
  }

  const t0 = performance.now();
  try {
    const base64 = await openai.audio.speech.create({
      model: "tts-1",
      input: text,
      voice,
      format,
      stream: false,
    });
    const buffer = Buffer.from(base64, "base64");
    console.log("[api/tts] buffer length=", buffer.length);

    const duration = (performance.now() - t0).toFixed(1);
    console.log(`[perf] /api/tts (non-stream) completed in ${duration} ms`);

    res.writeHead(200, { "Content-Type": `audio/${format}` });
    return res.end(buffer);
  } catch (err) {
    console.error("[/api/tts] error:", err.response?.data || err);
    return res.status(500).json({ error: "TTS failed", details: err.message });
  }
});

/**
 * 10. /api/tts-stream — Streaming TTS with chunk-size logging & fallback
 */
app.post("/api/tts-stream", async (req, res) => {
  console.log("[api/tts-stream] body=", req.body);
  const { text, voice = "alloy", format = "mp3" } = req.body;
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "text"' });
  }

  const segments = [];
  for (let i = 0; i < text.length; ) {
    let slice = text.slice(i, i + 1000);
    const lastDot = slice.lastIndexOf(". ");
    if (lastDot > 50) slice = slice.slice(0, lastDot + 1);
    segments.push(slice);
    i += slice.length;
  }

  const t0 = performance.now();
  res.writeHead(200, {
    "Content-Type": `audio/${format}`,
    "Transfer-Encoding": "chunked",
  });

  async function fetchStream(input, attempts = 3) {
    try {
      console.log(
        "[fetchStream] textLen=",
        input.length,
        "attempt=",
        4 - attempts
      );
      return await openai.audio.speech.create({
        model: "tts-1",
        input,
        voice,
        format,
        stream: true,
      });
    } catch (err) {
      if (attempts > 1 && err.status === 500) {
        console.warn("[fetchStream] retrying due to server error");
        await new Promise((r) => setTimeout(r, 500));
        return fetchStream(input, attempts - 1);
      }
      throw err;
    }
  }

  for (let idx = 0; idx < segments.length; idx++) {
    const seg = segments[idx];
    const tSeg = performance.now();
    try {
      const response = await fetchStream(seg);
      const reader = response.body;
      await new Promise((resolve, reject) => {
        reader.on("data", (chunk) => {
          console.log(`[tts-stream][${idx}] chunk size=`, chunk.length);
          res.write(chunk);
        });
        reader.on("end", resolve);
        reader.on("error", reject);
      });
      console.log(
        `[perf] segment ${idx} streamed in ${(
          performance.now() - tSeg
        ).toFixed(1)} ms`
      );
    } catch (err) {
      console.error(`[tts-stream][${idx}] streaming failed`, err);
      try {
        const resp = await openai.audio.speech.create({
          model: "tts-1",
          input: seg,
          voice,
          format,
          stream: false,
        });
        const arrayBuffer = await resp.arrayBuffer();
        const buf = Buffer.from(arrayBuffer);
        console.log(`[tts-stream][${idx}] fallback chunk size=`, buf.length);
        res.write(buf);
        console.log(
          `[perf] segment ${idx} fallback in ${(
            performance.now() - tSeg
          ).toFixed(1)} ms`
        );
      } catch (fb) {
        console.error(`[tts-stream][${idx}] fallback failed`, fb);
        break;
      }
    }
  }

  console.log(
    `[perf] /api/tts-stream total time ${(performance.now() - t0).toFixed(
      1
    )} ms for ${segments.length} segments`
  );
  res.end();
});

/**
 * 11. Start the server
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Agent server running on port ${PORT}`));
