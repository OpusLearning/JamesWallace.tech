// frontend/src/components/VoiceRecorder.jsx

import React, { useState, useRef, useEffect } from "react";

export default function VoiceRecorder({ onTranscribed }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rafIdRef = useRef(null);
  const canvasRef = useRef(null);

  // 1) init mic + analyser + recorder
  useEffect(() => {
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioCtx = new (window.AudioContext ||
          window.webkitAudioContext)();
        audioCtxRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        analyserRef.current = analyser;
        source.connect(analyser);

        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

        const mr = new MediaRecorder(stream);
        mediaRecorderRef.current = mr;
        mr.addEventListener("dataavailable", (e) => {
          audioChunksRef.current.push(e.data);
        });
        mr.addEventListener("stop", handleStop);
      } catch (err) {
        console.error("🔴 Mic init failed", err);
        alert("Unable to access microphone");
      }
    }
    init();
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  // 2) draw frequency spectrum + gradient fill
  useEffect(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");

    function draw() {
      analyser.getByteFrequencyData(data);

      // clear
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // build gradient fill under the curve
      const lineGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      lineGrad.addColorStop(0, "rgba(0,255,255,0.8)");
      lineGrad.addColorStop(0.5, "rgba(255,0,255,0.8)");
      lineGrad.addColorStop(1, "rgba(0,255,255,0.8)");

      // draw the “curve”
      ctx.beginPath();
      const slice = canvas.width / data.length;
      let x = 0;
      data.forEach((v, i) => {
        const percent = v / 255;
        const y = canvas.height - percent * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += slice;
      });
      // line back to bottom right, then bottom left for fill
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = lineGrad;
      ctx.fill();

      // optionally draw top curve outline
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      x = 0;
      data.forEach((v, i) => {
        const percent = v / 255;
        const y = canvas.height - percent * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += slice;
      });
      ctx.stroke();

      rafIdRef.current = requestAnimationFrame(draw);
    }

    if (recording) draw();
    else cancelAnimationFrame(rafIdRef.current);

    return () => cancelAnimationFrame(rafIdRef.current);
  }, [recording]);

  // 3) When recording stops, send for transcription
  const handleStop = () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        const res = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioBase64: base64 }),
        });
        const { transcript } = await res.json();
        onTranscribed(transcript);
      } catch (err) {
        console.error("🔴 Transcription error", err);
      }
    };
    reader.readAsDataURL(blob);
    audioChunksRef.current = [];
  };

  const startRecording = () => {
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setRecording(true);
  };
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="futuristic-card mx-auto" style={{ maxWidth: 420 }}>
      <h5 className="futuristic-text text-center mb-3">Voice Recorder</h5>

      <canvas
        ref={canvasRef}
        width={380}
        height={120}
        className="waveform rounded mb-3"
      />

      <div className="text-center">
        <button
          className={`futuristic-button px-4 py-2`}
          onClick={recording ? stopRecording : startRecording}
        >
          {recording ? "🛑 Stop" : "🎙️ Record"}
        </button>
      </div>
    </div>
  );
}
