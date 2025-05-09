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
    // First pass: ask model whether to call a tool
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
      // Execute the requested function
      const { name, arguments: jsonArgs } = choice.message.function_call;
      const args = JSON.parse(jsonArgs);
      const fnResult = await handleFunctionCall(name, args);
      console.log("[api/agent] fnResult=", fnResult);

      // Second pass: feed the function result back to get a user‑facing reply
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
      // Simple text reply
      reply = choice.message.content;
    }

    const duration = (performance.now() - t0).toFixed(1);
    console.log(`→ [perf] /api/agent LLM loop completed in ${duration} ms`);
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
    // Write Base64 to temp file
    const tmpPath = path.join("/tmp", `audio-${Date.now()}.webm`);
    fs.writeFileSync(tmpPath, Buffer.from(audioBase64, "base64"));
    console.log("[api/transcribe] wrote file=", tmpPath);

    // Call Whisper
    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: fs.createReadStream(tmpPath),
      filename: path.basename(tmpPath),
      response_format: "text",
    });
    console.log("[api/transcribe] transcription=", transcription);

    const duration = (performance.now() - t0).toFixed(1);
    console.log(`→ [perf] /api/transcribe completed in ${duration} ms`);
    return res.json({ transcript: transcription });
  } catch (err) {
    console.error("[/api/transcribe] error:", err.response?.data || err);
    return res
      .status(500)
      .json({ error: "Transcription failed", details: err.message });
  }
});

/**
 * 8. /api/tts — Text‑to‑Speech (non‑streaming fallback)
 */
app.post("/api/tts", async (req, res) => {
  console.log("[api/tts] body=", req.body);
  const { text, voice = "alloy", format = "mp3" } = req.body;
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "text"' });
  }

  const t0 = performance.now();
  try {
    // Non‑streaming: returns raw Base64 audio
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
    console.log(`→ [perf] /api/tts (non‑stream) completed in ${duration} ms`);

    res.writeHead(200, { "Content-Type": `audio/${format}` });
    return res.end(buffer);
  } catch (err) {
    console.error("[/api/tts] error:", err.response?.data || err);
    return res.status(500).json({ error: "TTS failed", details: err.message });
  }
});

/**
 * 9. /api/tts-stream — Streaming TTS with chunk‑size logging & fallback
 */
app.post("/api/tts-stream", async (req, res) => {
  console.log("[api/tts-stream] body=", req.body);
  const { text, voice = "alloy", format = "mp3" } = req.body;
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "text"' });
  }

  // Chunk text into ~1k slices
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

  // Helper to fetch a streaming Response
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
        `→ [perf] segment ${idx} streamed in ${(
          performance.now() - tSeg
        ).toFixed(1)} ms`
      );
    } catch (err) {
      console.error(`[tts-stream][${idx}] streaming failed`, err);
      // Fallback to non‑streaming
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
 * 10. Start the server
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Agent server running on port ${PORT}`));
