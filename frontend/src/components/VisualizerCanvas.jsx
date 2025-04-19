// frontend/src/components/VisualizerCanvas.jsx

export default class VisualizerCanvas {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.timeData = null;
    this.freqData = null;
    this.rafId = null;
    this.mode = "waveform"; // 'waveform' or 'spectrum'
  }

  /**
   * Bind a <canvas> element and create drawing context
   * @param {HTMLCanvasElement} canvasEl
   */
  init(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext("2d");
  }

  /**
   * Start visualizing a MediaStream
   * @param {MediaStream} stream
   * @param {'waveform'|'spectrum'} mode
   */
  start(stream, mode = "waveform") {
    if (!this.canvas || !this.ctx) {
      throw new Error("VisualizerCanvas: call init(canvas) before start()");
    }
    this.mode = mode;

    // Set up AudioContext + analyser
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.source.connect(this.analyser);

    // Create data arrays
    this.timeData = new Uint8Array(this.analyser.fftSize);
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

    // Kick off draw loop
    this._draw();
  }

  /**
   * Stop visualization (pauses draw loop, but preserves AudioContext)
   */
  stop() {
    cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  /**
   * Tear everything down
   */
  async destroy() {
    this.stop();
    this.source?.disconnect();
    this.analyser?.disconnect();
    await this.audioCtx?.close();
    this.audioCtx = this.analyser = this.source = null;
  }

  _draw() {
    const { canvas, ctx, analyser, timeData, freqData, mode } = this;
    const { width, height } = canvas;

    // schedule next frame
    this.rafId = requestAnimationFrame(() => this._draw());

    // clear
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, width, height);

    if (mode === "waveform") {
      // get time‑domain data
      analyser.getByteTimeDomainData(timeData);

      // gradient for waveform line
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "#0ff");
      grad.addColorStop(0.5, "#f0f");
      grad.addColorStop(1, "#0ff");

      ctx.lineWidth = 2;
      ctx.strokeStyle = grad;
      ctx.beginPath();

      const sliceWidth = width / timeData.length;
      let x = 0;
      for (let i = 0; i < timeData.length; i++) {
        const v = timeData[i] / 128;
        const y = (v * height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
    } else {
      // get frequency data
      analyser.getByteFrequencyData(freqData);

      const barWidth = width / freqData.length;
      for (let i = 0; i < freqData.length; i++) {
        const v = freqData[i] / 255;
        const barHeight = v * height;
        // gradient per bar
        const hue = (i / freqData.length) * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(
          i * barWidth,
          height - barHeight,
          barWidth * 0.8,
          barHeight
        );
      }
    }
  }
}
