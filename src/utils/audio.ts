/**
 * Birthday Sound Synthesizer using Web Audio API
 * Generates smooth, pleasant audio feedback without requiring external audio files,
 * and supports custom background music if a file path is provided.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgAudio: HTMLAudioElement | null = null;

  constructor() {
    // AudioContext is initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play a gentle celebratory chime/click
   */
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08); // A5

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {
      // ignore
    }
  }

  /**
   * Sound effect when the roulette wheel ticks during rotation
   */
  public playWheelTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  /**
   * Sound effect when a prize or step is completed
   */
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + index * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.38);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Grand birthday celebration melody
   */
  public playCelebration() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chordProgression = [
        [523.25, 659.25, 783.99], // C Major
        [587.33, 739.99, 880.0], // D Major
        [659.25, 830.61, 987.77], // E Major
        [783.99, 987.77, 1174.66], // G Major
        [1046.5, 1318.51, 1567.98], // High C
      ];

      chordProgression.forEach((chord, stepIdx) => {
        if (!this.ctx) return;
        const stepTime = this.ctx.currentTime + stepIdx * 0.18;

        chord.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, stepTime);

          gain.gain.setValueAtTime(0.08, stepTime);
          gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.6);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(stepTime);
          osc.stop(stepTime + 0.65);
        });
      });
    } catch {
      // ignore
    }
  }

  /**
   * Optional custom background music (e.g. '/music/happy-birthday.mp3')
   */
  public setBackgroundMusic(src: string) {
    try {
      if (this.bgAudio) {
        this.bgAudio.pause();
        this.bgAudio = null;
      }
      this.bgAudio = new Audio(src);
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.4;
      this.bgAudio.muted = this.isMuted;
    } catch {
      // ignore
    }
  }

  public playBackgroundMusic() {
    if (this.bgAudio && !this.isMuted) {
      this.bgAudio.play().catch(() => {
        // Autoplay may be blocked until user gesture
      });
    }
  }
}

export const soundManager = new SoundManager();
