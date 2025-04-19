// frontend/src/pages/VisualizerDemo.jsx

import React, { useRef, useState } from "react";
import VisualizerCanvas from "../components/VisualizerCanvas";

export default function VisualizerDemo() {
  const canvasRef = useRef(null);
  const visualizerRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [mode, setMode] = useState("waveform");
  const [running, setRunning] = useState(false);

  const handleStart = async () => {
    if (!visualizerRef.current) {
      visualizerRef.current = new VisualizerCanvas();
      visualizerRef.current.init(canvasRef.current);
    }
    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setStream(micStream);
    visualizerRef.current.start(micStream, mode);
    setRunning(true);
  };

  const handleStop = () => {
    visualizerRef.current?.stop();
    stream?.getTracks().forEach((t) => t.stop());
    setRunning(false);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Audio Visualizer Demo</h2>

      <div className="mb-3">
        <label className="form-label me-2">Mode:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          disabled={running}
        >
          <option value="waveform">Waveform</option>
          <option value="spectrum">Spectrum</option>
        </select>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        style={{ background: "#111", display: "block", margin: "0 auto" }}
      />

      <div className="text-center mt-3">
        {!running ? (
          <button className="btn btn-success me-2" onClick={handleStart}>
            ▶️ Start
          </button>
        ) : (
          <button className="btn btn-danger" onClick={handleStop}>
            ⏹️ Stop
          </button>
        )}
      </div>
    </div>
  );
}
