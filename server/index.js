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
import { performance } from "perf_hooks";
import { saveEnquiry, markEnquiryEmailed, saveHelperChat, storageHealth } from "./db.js";
import { answer as helperAnswer, rateLimit as helperRateLimit, MAX_CHARS as HELPER_MAX_CHARS } from "./helper.js";
import { sendContactNotification, sendContactAcknowledgement } from "./email.js";

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

// JSON body parser
app.use(bodyParser.json({ limit: "15mb" }));

/**
 * 3. Contact form
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
 * 4. MailerLite subscribe — blog lead magnet opt-in
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
 * 5. /api/health — is the site still able to record an enquiry?
 */
app.get("/api/health", (req, res) => {
  const storage = storageHealth();
  res.status(storage.writable ? 200 : 503).json({ ok: storage.writable, storage, postmark: Boolean(process.env.POSTMARK_API_KEY) });
});

/**
 * 6. /api/helper — the assistant in the corner of the site.
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
 * 7. Start the server
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Agent server running on port ${PORT}`));
