// frontend/src/components/VoiceSpectrum.jsx
import React, { useRef, useEffect } from "react";

export default function VoiceSpectrum({ stream, width = 380, height = 120 }) {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!stream) return;

    // 1. Set up Web Audio
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256; // smaller = fatter bars
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    // 2. Start drawing
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(138,220,246,0.6)");
    gradient.addColorStop(1, "rgba(40,60,80,0.2)");

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;

      const barWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i];
        // scale to canvas height
        const barHeight = (value / 255) * height;
        ctx.fillRect(x, height - barHeight, barWidth * 0.8, barHeight);
        x += barWidth;
      }
    }
    draw();

    // cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      analyser.disconnect();
      audioCtx.close();
    };
  }, [stream, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
