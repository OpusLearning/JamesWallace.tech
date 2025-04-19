import React, { useState, useRef, useEffect } from "react";
import VoiceRecorder from "./VoiceRecorder";
import ChatBubble from "./ChatBubble";
import VisualizerCanvas from "./VisualizerCanvas";

export default function VoiceChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timings, setTimings] = useState({});
  const visualizerRef = useRef(null);
  const canvasRef = useRef(null);

  // initialize visualizer once
  useEffect(() => {
    visualizerRef.current = new VisualizerCanvas();
    visualizerRef.current.init(canvasRef.current);
    return () => visualizerRef.current?.destroy();
  }, []);

  const handleTranscribed = async (transcript) => {
    setMessages((m) => [...m, { sender: "user", text: transcript }]);

    setLoading(true);
    const t0 = performance.now();
    let t1 = t0,
      t2 = t0;

    try {
      // 1) Agent
      const agentResp = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: transcript }),
      });
      t1 = performance.now();
      const { reply } = await agentResp.json();
      setMessages((m) => [...m, { sender: "assistant", text: reply }]);

      // 2) TTS (non‑stream)
      const ttsResp = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reply }),
      });
      const audioBuf = await ttsResp.arrayBuffer();
      t2 = performance.now();

      // play
      const blob = new Blob([audioBuf], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      new Audio(url).play().catch(console.error);
    } catch (err) {
      console.error("VoiceChat error", err);
      setMessages((m) => [
        ...m,
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
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="chat-window mb-2">
            {messages.map((m, i) => (
              <ChatBubble key={i} sender={m.sender} text={m.text} />
            ))}
            {loading && (
              <div className="text-center text-muted">…thinking…</div>
            )}
          </div>
          <VoiceRecorder onTranscribed={handleTranscribed} />
          <div className="mt-2 text-muted small">
            {timings.agent != null && (
              <>
                Agent: {timings.agent} ms • TTS: {timings.tts} ms • Total:{" "}
                {timings.total} ms
              </>
            )}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <canvas
            ref={canvasRef}
            width={380}
            height={200}
            className="border rounded"
          />
        </div>
      </div>
    </div>
  );
}
