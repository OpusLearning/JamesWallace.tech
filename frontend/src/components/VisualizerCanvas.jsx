// frontend/src/components/VisualizerCanvas.jsx
export default class VisualizerCanvas {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.freqData = null;
    this.rafId = null;
    this.mode = "radial"; // only radial mode shown here
  }

  /** Bind a <canvas> element */
  init(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext("2d");
  }

  /** Tear down everything */
  async destroy() {
    this.stop();
    this.source?.disconnect();
    this.analyser?.disconnect();
    if (this.audioCtx) {
      await this.audioCtx.close();
      this.audioCtx = null;
    }
  }

  /** Stop draw loop */
  stop() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /** (Re)create AudioContext + analyser + data array */
  _setupAudioContext() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
  }

  /** Disconnect & close existing context */
  async _teardownAudio() {
    this.stop();
    this.source?.disconnect();
    this.analyser?.disconnect();
    if (this.audioCtx) {
      await this.audioCtx.close();
      this.audioCtx = null;
    }
  }

  /**
   * Visualize a live MediaStream (mic)
   * @param {MediaStream} stream
   */
  async startStream(stream) {
    this.mode = "radial";
    await this._teardownAudio();
    this._setupAudioContext();
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.source.connect(this.analyser);
    this._draw();
  }

  /**
   * Visualize an HTMLMediaElement (e.g. TTS playback)
   * @param {HTMLMediaElement} mediaEl
   */
  async startMediaElement(mediaEl) {
    this.mode = "radial";
    await this._teardownAudio();
    this._setupAudioContext();
    this.source = this.audioCtx.createMediaElementSource(mediaEl);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this._draw();
  }

  /** Internal draw loop */
  _draw() {
    if (!this.ctx || !this.analyser) return;

    const ctx = this.ctx;
    const { width: w, height: h } = this.canvas;
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(cx, cy) * 0.9; // leave some padding

    // clear canvas each frame
    ctx.clearRect(0, 0, w, h);

    // only radial mode
    this.analyser.getByteFrequencyData(this.freqData);
    const slice = (Math.PI * 2) / this.freqData.length;

    for (let i = 0; i < this.freqData.length; i++) {
      const v = this.freqData[i] / 255; // 0→1
      const len = maxR * (0.2 + 0.8 * v); // from 20%→100% radius
      const ang = i * slice - Math.PI / 2; // start at top (–90°)

      const x1 = cx + Math.cos(ang) * (maxR * 0.2);
      const y1 = cy + Math.sin(ang) * (maxR * 0.2);
      const x2 = cx + Math.cos(ang) * len;
      const y2 = cy + Math.sin(ang) * len;

      ctx.strokeStyle = `rgba(0,200,255,${0.3 + v * 0.7})`;
      ctx.lineWidth = 2 + v * 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // schedule next frame
    this.rafId = requestAnimationFrame(() => this._draw());
  }
}
