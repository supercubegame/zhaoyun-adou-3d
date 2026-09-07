export const ANIMATION_STATES = Object.freeze(['idle', 'walk', 'attack', 'hit', 'protect', 'victory', 'defeat']);

export function createAnimationState(id) { return { id, state: 'idle', elapsed: 0, facing: 1 }; }

export function transitionAnimation(actor, nextState, dt = 0) {
  if (!ANIMATION_STATES.includes(nextState)) throw new Error(`unknown animation state: ${nextState}`);
  return { ...actor, state: nextState, elapsed: nextState === actor.state ? actor.elapsed + dt : 0 };
}

export function animationFrame(actor, fps = 8, frameCount = 4) {
  return Math.floor(actor.elapsed * fps) % frameCount;
}
