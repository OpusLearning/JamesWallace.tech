// ── server/index.js ──

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
import fetch from "node-fetch";

const app = express();

// Global request‑timing middleware
app.use((req, res, next) => {
  const start = performance.now();
  res.once("finish", () => {
    const ms = (performance.now() - start).toFixed(1);
    console.log(`→ [perf] ${req.method} ${req.path} completed in ${ms} ms`);
  });
  next();
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json({ limit: "15mb" }));

/**
 * 3. Initialise OpenAI client
 */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 4. Define function‑calling “tools”
 */
const functions = [
  {
    name: "cv_query",
    description: "Answer questions about James Wallace’s CV",
    parameters: {
      type: "object",
      properties: {
        question: { type: "string", description: "The user’s CV question" },
      },
      required: ["question"],
    },
  },
  {
    name: "run_demo",
    description: "Execute a demo with user‑provided input",
    parameters: {
      type: "object",
      properties: {
        demo_name: { type: "string", description: "Name of the demo to run" },
        input: { type: "string", description: "Base64‑encoded input file" },
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
  console.error("⚠️ functions array is empty—agent calls will fail.");
}

/**
 * 5. Dispatch function‑call to business logic
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
 * 6. /api/agent — function‑calling LLM loop with metrics
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
    } else {
      reply = choice.message.content;
    }

    console.log(
      `→ [perf] /api/agent LLM loop completed in ${(
        performance.now() - t0
      ).toFixed(1)} ms`
    );
    return res.json({ reply });
  } catch (err) {
    console.error("[/api/agent] error:", err.response?.data || err);
    return res
      .status(500)
      .json({ error: "Agent call failed", details: err.message });
  }
});

/**
 * 7. /api/transcribe — Whisper transcription with metrics
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

    console.log(
      `→ [perf] /api/transcribe completed in ${(performance.now() - t0).toFixed(
        1
      )} ms`
    );
    return res.json({ transcript: transcription });
  } catch (err) {
    console.error("[/api/transcribe] error:", err.response?.data || err);
    return res
      .status(500)
      .json({ error: "Transcription failed", details: err.message });
  }
});

/**
 * 8. /api/tts — Text‑to‑Speech (non‑streaming fallback, robust handler)
 */
app.post("/api/tts", async (req, res) => {
  console.log("[api/tts] body=", req.body);
  const { text, voice = "alloy", format = "mp3" } = req.body;
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "text"' });
  }

  const t0 = performance.now();
  try {
    // SDK may return a Base64 string or a Response object
    const ttsResult = await openai.audio.speech.create({
      model: "tts-1",
      input: text,
      voice,
      format,
      stream: false,
    });

    let buffer;
    if (typeof ttsResult === "string") {
      console.log("[api/tts] received Base64 string");
      buffer = Buffer.from(ttsResult, "base64");
    } else {
      console.log("[api/tts] received Response object, reading ArrayBuffer");
      const arrayBuf = await ttsResult.arrayBuffer();
      buffer = Buffer.from(arrayBuf);
    }

    console.log("[api/tts] buffer length=", buffer.length);
    console.log(
      `→ [perf] /api/tts (non‑stream) completed in ${(
        performance.now() - t0
      ).toFixed(1)} ms`
    );

    res.writeHead(200, { "Content-Type": `audio/${format}` });
    return res.end(buffer);
  } catch (err) {
    console.error("[/api/tts] error:", err.response?.data || err);
    return res.status(500).json({ error: "TTS failed", details: err.message });
  }
});

/**
 * 9. /api/tts-stream — Streaming TTS with fallback
 *     (unchanged)
 */
app.post("/api/tts-stream", async (req, res) => {
  console.log("[api/tts-stream] body=", req.body);
  const { text, voice = "alloy", format = "mp3" } = req.body;
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "text"' });
  }

  // chunk into ~4k–5k slices
  const segments = [];
  const CHUNK_SIZE = 4000;
  for (let i = 0; i < text.length; ) {
    let slice = text.slice(i, i + CHUNK_SIZE);
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
        console.warn("[fetchStream] retrying segment due to server error");
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
      const reader = response.body; // Node Readable
      await new Promise((resolve, reject) => {
        reader.on("data", (chunk) => {
          console.log(`[tts-stream][${idx}] chunk size=`, chunk.length);
          res.write(chunk);
        });
        reader.on("end", resolve);
        reader.on("error", reject);
      });
      console.log(
        `→ [perf] segment ${idx} streamed in ${(
          performance.now() - tSeg
        ).toFixed(1)} ms`
      );
    } catch (err) {
      console.error(`[tts-stream][${idx}] streaming failed`, err);
      // fallback to non‑streaming
      try {
        const base64 = await openai.audio.speech.create({
          model: "tts-1",
          input: seg,
          voice,
          format,
          stream: false,
        });
        const buf = Buffer.from(base64, "base64");
        console.log(`[tts-stream][${idx}] fallback chunk size=`, buf.length);
        res.write(buf);
        console.log(
          `→ [perf] segment ${idx} fallback in ${(
            performance.now() - tSeg
          ).toFixed(1)} ms`
        );
      } catch (fb) {
        console.error(`[tts-stream][${idx}] fallback failed`, fb);
        break;
      }
    }
  }

  console.log(
    `→ [perf] /api/tts-stream total time ${(performance.now() - t0).toFixed(
      1
    )} ms for ${segments.length} segments`
  );
  res.end();
});

/**
 * 11. /api/contact — proxy ContactForm submissions to Google Forms
 */
app.post("/api/contact", async (req, res) => {
  const t0 = performance.now();
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing name, email or message" });
  }

  // The three "entry." field names from your form
  const params = new URLSearchParams();
  params.append("entry.1795528617", name);
  params.append("entry.200897195", email);
  params.append("entry.647383503", message);

  // **All required hidden form fields** observed in the HTML:
  params.append("fvv", "1");
  params.append("pageHistory", "0");
  params.append("draftResponse", "[]");
  params.append("submissionTimestamp", "-1");
  // A pseudo‑random ID
  params.append("fbzx", Math.random().toString().slice(2));

  try {
    const googleRes = await fetch(
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLScAFWKTVZkNzBcfDWQA1DKUp6ahtjJJxMC51to7HdDuJP9_qQ/formResponse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!googleRes.ok) {
      console.error("🚨 Google Forms error:", googleRes.status);
      console.error("🚨 Payload:", params.toString());
      return res
        .status(502)
        .json({ error: "Failed to submit to Google Forms" });
    }

    console.log(
      `→ [perf] /api/contact completed in ${(performance.now() - t0).toFixed(
        1
      )}ms`
    );
    return res.json({ success: true });
  } catch (err) {
    console.error("Contact proxy error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 10. Start the server
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Agent server running on port ${PORT}`));
