import React, { useState, useRef, useEffect } from "react";
import VoiceRecorder from "./VoiceRecorder";
import ChatBubble from "./ChatBubble";
import VisualizerCanvas from "./VisualizerCanvas";

export default function VoiceChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timings, setTimings] = useState({});
  const [error, setError] = useState("");
  const [mode, setMode] = useState("spectrum");

  const visualizerRef = useRef(null);
  const canvasRef = useRef(null);

  // 1) Initialize VisualizerCanvas once
  useEffect(() => {
    visualizerRef.current = new VisualizerCanvas();
    visualizerRef.current.init(canvasRef.current);
    return () => visualizerRef.current.destroy();
  }, []);

  // 2) When the user flips the dropdown, update the visualizer mode
  useEffect(() => {
    if (visualizerRef.current) {
      visualizerRef.current.mode = mode;
    }
  }, [mode]);

  // 3) Handle a completed transcription
  const handleTranscribed = async (userText) => {
    setError("");
    setMessages((ms) => [...ms, { sender: "user", text: userText }]);
    setLoading(true);

    const t0 = performance.now();
    let t1 = t0,
      t2 = t0;

    try {
      // a) send to our /api/agent
      const agRes = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      t1 = performance.now();
      const { reply } = await agRes.json();

      // b) send to TTS (non‑streaming fallback)
      const ttsRes = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reply }),
      });
      const audioBuffer = await ttsRes.arrayBuffer();
      t2 = performance.now();

      // c) show the assistant bubble
      setMessages((ms) => [...ms, { sender: "assistant", text: reply }]);

      // d) play back with the visualizer attached
      const blob = new Blob([audioBuffer], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      const audioEl = new Audio(url);
      visualizerRef.current.startMediaElement(audioEl, mode);
      audioEl.play().catch(console.error);
    } catch (err) {
      console.error("VoiceChat error", err);
      setError("Sorry, something went wrong.");
      setMessages((ms) => [
        ...ms,
        { sender: "assistant", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setTimings({
        agent: Math.round(t1 - t0),
        tts: Math.round(t2 - t1),
        total: Math.round(performance.now() - t0),
      });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Voice Chat</h2>

      {/* Error banner */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {/* Left: chat + recorder */}
        <div className="col-md-6 mb-3 d-flex flex-column">
          <div className="chat-window mb-2 flex-grow-1 overflow-auto border p-2 rounded">
            {messages.map((m, i) => (
              <ChatBubble key={i} sender={m.sender} text={m.text} />
            ))}

            {loading && (
              <div className="d-flex justify-content-center my-2">
                <div className="loading-spinner" role="status" />
              </div>
            )}
          </div>

          <VoiceRecorder onTranscribed={handleTranscribed} />

          {timings.total != null && (
            <div className="mt-2 text-muted small">
              Agent: {timings.agent} ms • TTS: {timings.tts} ms • Total:{" "}
              {timings.total} ms
            </div>
          )}
        </div>

        {/* Right: visualizer + mode switch */}
        <div className="col-md-6 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label mb-0">Mode:</label>
            <select
              className="form-select w-auto"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="waveform">Waveform</option>
              <option value="spectrum">Spectrum</option>
            </select>
          </div>

          <canvas
            ref={canvasRef}
            width={600}
            height={200}
            className="border rounded w-100"
            style={{ background: "#111" }}
          />
        </div>
      </div>
    </div>
  );
}
