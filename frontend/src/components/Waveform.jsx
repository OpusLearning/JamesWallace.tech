// Waveform.jsx

import React, { useRef, useEffect } from "react";

export default function Waveform({ analyser }) {
  const canvasRef = useRef();
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const data = new Uint8Array(analyser.fftSize);
    function draw() {
      analyser.getByteTimeDomainData(data);
      ctx.fillStyle = "#222";
      ctx.fillRect(0, 0, 300, 80);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0f0";
      ctx.beginPath();
      const sliceWidth = 300 / data.length;
      let x = 0;
      for (let i = 0; i < data.length; i++) {
        const v = data[i] / 128;
        const y = v * 40;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
      requestAnimationFrame(draw);
    }
    draw();
  }, [analyser]);
  return <canvas ref={canvasRef} width={300} height={80} />;
}
