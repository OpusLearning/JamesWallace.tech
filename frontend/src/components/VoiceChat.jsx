// frontend/src/components/VoiceChat.jsx
import React, { useState, useRef, useEffect } from "react";
import VoiceRecorder from "./VoiceRecorder";
import ChatBubble from "./ChatBubble";
import VisualizerCanvas from "./VisualizerCanvas";

export default function VoiceChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timings, setTimings] = useState({});
  const visualizerRef = useRef(null);

  // init our visualizer once
  useEffect(() => {
    visualizerRef.current = new VisualizerCanvas();
    visualizerRef.current.init(document.getElementById("vis-canvas"));
    return () => visualizerRef.current.destroy();
  }, []);

  // handle when microphone stream starts
  const handleStreamStart = (stream) => {
    visualizerRef.current.startStream(stream, "radial");
  };
  // handle whenever we stop (either mic or after TTS)
  const handleStreamStop = () => {
    visualizerRef.current.stop();
  };

  // when transcription arrives…
  const handleTranscribed = async (text) => {
    setMessages((m) => [...m, { sender: "user", text }]);
    setLoading(true);
    const t0 = performance.now();

    try {
      // 1) agent
      const ag = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const { reply } = await ag.json();
      const t1 = performance.now();

      // 2) TTS
      const tts = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reply }),
      });
      const audioBuffer = await tts.arrayBuffer();
      const t2 = performance.now();

      // show assistant
      setMessages((m) => [...m, { sender: "assistant", text: reply }]);

      // play & visualize
      const blob = new Blob([audioBuffer], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      const audioEl = new Audio(url);

      visualizerRef.current.startMediaElement(audioEl, "radial");
      await audioEl.play();

      // timings
      setTimings({
        agent: Math.round(t1 - t0),
        tts: Math.round(t2 - t1),
        total: Math.round(performance.now() - t0),
      });
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { sender: "assistant", text: "Oops, something broke." },
      ]);
    } finally {
      setLoading(false);
      visualizerRef.current.stop();
    }
  };

  return (
    <div className="voice-chat-grid">
      {/* Chat Column */}
      <div className="chat-panel">
        {messages.map((m, i) => (
          <ChatBubble key={i} sender={m.sender} text={m.text} />
        ))}
        {loading && <div className="loading-spinner" />}
        {timings.total && (
          <div className="text-muted small mt-2">
            Agent: {timings.agent} ms • TTS: {timings.tts} ms • Total:{" "}
            {timings.total} ms
          </div>
        )}
      </div>

      {/* Visualizer + Recorder Column */}
      <div className="visualizer-panel">
        <canvas
          id="vis-canvas"
          width={400}
          height={400}
          style={{ maxWidth: "100%", height: "auto", background: "#111" }}
        />
        <VoiceRecorder
          onStreamStart={handleStreamStart}
          onStreamStop={handleStreamStop}
          onTranscribed={handleTranscribed}
        />
      </div>
    </div>
  );
}
