// server/index.js

// Force IPv4 for all outbound DNS lookups (MailerLite only allows our IPv4)
import { setDefaultResultOrder } from "node:dns";
setDefaultResultOrder("ipv4first");

/**
 * 1. Load environment variables
 */
import dotenv from "dotenv";
dotenv.config();
console.log("OPENAI_API_KEY=", process.env.OPENAI_API_KEY);

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
import { createOrder } from "./db.js";
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

  try {
    await sendContactNotification(name.trim(), email.trim(), message.trim());
    await sendContactAcknowledgement(name.trim(), email.trim());
    return res.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] error:", err.message);
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
 * 6. Initialise OpenAI client
 */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 5. Define function-calling "tools"
 */
const functions = [
  {
    name: "cv_query",
    description: "Answer questions about James Wallace's CV",
    parameters: {
      type: "object",
      properties: {
        question: { type: "string", description: "The user's CV question" },
      },
      required: ["question"],
    },
  },
  {
    name: "run_demo",
    description: "Execute a demo with user-provided input",
    parameters: {
      type: "object",
      properties: {
        demo_name: { type: "string", description: "Name of the demo to run" },
        input: { type: "string", description: "Base64-encoded input file" },
      },
      required: ["demo_name", "input"],
    },
  },
  {
    name: "search_blog",
    description: "Retrieve blog posts by keyword",
    parameters: {
      type: "object",
      properties: {
        keyword: { type: "string", description: "Search term for blog posts" },
      },
      required: ["keyword"],
    },
  },
  {
    name: "schedule_call",
    description: "Schedule a Calendly call",
    parameters: {
      type: "object",
      properties: {
        datetime: { type: "string", description: "ISO date for the call" },
        duration: { type: "number", description: "Duration in minutes" },
      },
      required: ["datetime", "duration"],
    },
  },
];

if (!functions.length) {
  console.error("functions array is empty — agent calls will fail.");
}

/**
 * 6. Dispatch function-call to business logic
 */
async function handleFunctionCall(name, args) {
  console.log(`[handleFunctionCall] name=${name}`, args);
  switch (name) {
    case "cv_query":
      return { answer: `(stub) You asked: ${args.question}` };
    case "run_demo":
      return { result: `Ran demo ${args.demo_name}` };
    case "search_blog":
      return { posts: [{ title: "Sample", url: "/blog/sample" }] };
    case "schedule_call":
      return { link: "https://calendly.com/your-link" };
    default:
      throw new Error(`Unknown function: ${name}`);
  }
}

/**
 * 7. /api/agent — function-calling LLM loop with metrics
 */
app.post("/api/agent", async (req, res) => {
  const t0 = performance.now();
  console.log("[api/agent] body=", req.body);
  const { message } = req.body;
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "message"' });
  }

  try {
    const chatResp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      functions,
      function_call: "auto",
    });
    const choice = chatResp.choices[0];
    console.log("[api/agent] choice=", choice);

    let reply;
    if (choice.finish_reason === "function_call") {
      const { name, arguments: jsonArgs } = choice.message.function_call;
      const args = JSON.parse(jsonArgs);
      const fnResult = await handleFunctionCall(name, args);
      console.log("[api/agent] fnResult=", fnResult);

      const followUp = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: message },
          { role: "assistant", function_call: choice.message.function_call },
          { role: "function", name, content: JSON.stringify(fnResult) },
        ],
      });
      reply = followUp.choices[0].message.content;
      console.log("[api/agent] final reply=", reply);
    } else {
      reply = choice.message.content;
    }

    const duration = (performance.now() - t0).toFixed(1);
    console.log(`[perf] /api/agent LLM loop completed in ${duration} ms`);
    return res.json({ reply });
  } catch (err) {
    console.error("[/api/agent] error:", err.response?.data || err);
    return res
      .status(500)
      .json({ error: "Agent call failed", details: err.message });
  }
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
