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
   * Bind a <canvas> element and its 2D context
   * @param {HTMLCanvasElement} canvasEl
   */
  init(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext("2d");
  }

  /**
   * Start visualizing a live MediaStream (e.g. microphone)
   * @param {MediaStream} stream
   * @param {'waveform'|'spectrum'} mode
   */
  startStream(stream, mode = "waveform") {
    this._teardownAudio();
    this.mode = mode;
    this._setupAudioContext();
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.source.connect(this.analyser);
    this._draw();
  }

  /**
   * Start visualizing an HTMLMediaElement (e.g. TTS audio)
   * @param {HTMLMediaElement} mediaEl
   * @param {'waveform'|'spectrum'} mode
   */
  startMediaElement(mediaEl, mode = "waveform") {
    this._teardownAudio();
    this.mode = mode;
    this._setupAudioContext();
    this.source = this.audioCtx.createMediaElementSource(mediaEl);
    // Route source both to analyser and to output
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this._draw();
  }

  /** Stop any ongoing draw loop */
  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /** Fully tear down existing AudioContext and nodes */
  async destroy() {
    this.stop();
    this.source?.disconnect();
    this.analyser?.disconnect();
    if (this.audioCtx) {
      await this.audioCtx.close();
      this.audioCtx = null;
    }
  }

  /** Create AudioContext, analyser node, and data buffers */
  _setupAudioContext() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.timeData = new Uint8Array(this.analyser.fftSize);
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
  }

  /** Disconnect and close any existing AudioContext */
  async _teardownAudio() {
    this.stop();
    this.source?.disconnect();
    this.analyser?.disconnect();
    if (this.audioCtx) {
      await this.audioCtx.close();
      this.audioCtx = null;
    }
  }

  /** Internal draw loop for both waveform and spectrum */
  _draw() {
    if (!this.canvas || !this.ctx || !this.analyser) return;

    const { width, height } = this.canvas;
    const ctx = this.ctx;

    this.rafId = requestAnimationFrame(() => this._draw());

    // Clear canvas
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, width, height);

    if (this.mode === "waveform") {
      this.analyser.getByteTimeDomainData(this.timeData);

      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "#0ff");
      grad.addColorStop(0.5, "#f0f");
      grad.addColorStop(1, "#0ff");

      ctx.lineWidth = 2;
      ctx.strokeStyle = grad;
      ctx.beginPath();

      const slice = width / this.timeData.length;
      let x = 0;
      for (let i = 0; i < this.timeData.length; i++) {
        const v = this.timeData[i] / 128.0;
        const y = (v * height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += slice;
      }
      ctx.stroke();
    } else {
      this.analyser.getByteFrequencyData(this.freqData);

      const barWidth = width / this.freqData.length;
      for (let i = 0; i < this.freqData.length; i++) {
        const v = this.freqData[i] / 255.0;
        const barHeight = v * height;
        const hue = (i / this.freqData.length) * 360;
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
