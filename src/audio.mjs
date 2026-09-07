let audioContext;
let muted = false;
let musicTimer = null;
let musicStep = 0;
const melody = [261.63, 329.63, 392.0, 329.63, 293.66, 349.23, 440.0, 349.23];

function ensureAudio() {
  if (!audioContext) audioContext = new AudioContext();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function tone(frequency, duration, type = 'sine', gainValue = 0.035, when = null) {
  if (muted) return;
  const ctx = ensureAudio(); const now = when ?? ctx.currentTime;
  const osc = ctx.createOscillator(); const gain = ctx.createGain();
  osc.type = type; osc.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(gainValue, now); gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain).connect(ctx.destination); osc.start(now); osc.stop(now + duration);
}

export function setMuted(value) { muted = value; if (muted) stopMusic(); return muted; }
export function isMuted() { return muted; }
export function startMusic() {
  if (muted || musicTimer) return;
  const ctx = ensureAudio();
  tone(130.81, 0.32, 'sine', 0.045, ctx.currentTime);
  tone(melody[musicStep % melody.length], 0.3, 'triangle', 0.045, ctx.currentTime + 0.02);
  musicStep += 1;
  musicTimer = setInterval(() => { if (!muted) { tone(130.81, 0.32, 'sine', 0.025); tone(melody[musicStep % melody.length], 0.3, 'triangle', 0.045); musicStep += 1; } }, 360);
}
export function stopMusic() { if (musicTimer) { clearInterval(musicTimer); musicTimer = null; } }
export function playSlash() { tone(180, 0.09, 'sawtooth', 0.025); tone(420, 0.06, 'triangle', 0.018); }
export function playHit() { tone(110, 0.12, 'square', 0.02); }
export function playWin() { tone(523, 0.16, 'triangle', 0.03); setTimeout(() => tone(659, 0.2, 'triangle', 0.03), 100); }
export function playLose() { tone(220, 0.18, 'sine', 0.025); setTimeout(() => tone(147, 0.28, 'sine', 0.025), 130); }
