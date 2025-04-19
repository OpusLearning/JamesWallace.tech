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
    this.mode = "waveform"; // or 'spectrum'
  }

  init(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext("2d");
  }

  start(stream, mode = "waveform") {
    if (!this.canvas || !this.ctx) {
      throw new Error("Must call init(canvas) before start()");
    }
    this.mode = mode;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.source.connect(this.analyser);

    this.timeData = new Uint8Array(this.analyser.fftSize);
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this._draw();
  }

  stop() {
    cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

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
    this.rafId = requestAnimationFrame(() => this._draw());

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, width, height);

    if (mode === "waveform") {
      analyser.getByteTimeDomainData(timeData);
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "#0ff");
      grad.addColorStop(0.5, "#f0f");
      grad.addColorStop(1, "#0ff");

      ctx.lineWidth = 2;
      ctx.strokeStyle = grad;
      ctx.beginPath();
      let x = 0;
      const sliceW = width / timeData.length;
      timeData.forEach((v, i) => {
        const y = (v / 128) * (height / 2);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceW;
      });
      ctx.stroke();
    } else {
      analyser.getByteFrequencyData(freqData);
      const barW = width / freqData.length;
      freqData.forEach((v, i) => {
        const barH = (v / 255) * height;
        const hue = (i / freqData.length) * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(i * barW, height - barH, barW * 0.8, barH);
      });
    }
  }
}
