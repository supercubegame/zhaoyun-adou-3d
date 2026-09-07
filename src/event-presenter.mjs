import { ANIMATION_STATES, transitionAnimation } from './animation.mjs';
import { resolveVisualSource } from './model-status.mjs';

const animationFor = { 'attack-start': 'attack', hit: 'hit', defeat: 'defeat', protect: 'protect', victory: 'victory', 'defeat-result': 'defeat' };

export function createVisualActor(role) { return { role, visual: resolveVisualSource(role), animation: { id: role, state: 'idle', elapsed: 0, facing: 1 }, flash: 0 }; }

export function applyPresentationEvent(actor, event, dt = 0) {
  const next = structuredClone(actor); const state = animationFor[event.type];
  if (state && ANIMATION_STATES.includes(state)) next.animation = transitionAnimation(next.animation, state, dt);
  if (event.type === 'hit') next.flash = .18;
  return next;
}

export function tickVisualActor(actor, dt = 1 / 60) { const next = structuredClone(actor); next.flash = Math.max(0, next.flash - dt); return next; }
