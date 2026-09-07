import { CARD_DECK, createCardState, deployCard, stepCards } from './cards.mjs';

export function createBattleLoop(seed = 1) {
  return { seed, elapsed: 0, wave: 1, waveTime: 0, remaining: 12, cards: createCardState(seed), events: [] };
}

export function stepBattleLoop(state, dt = 1 / 60) {
  const next = structuredClone(state); next.elapsed += dt; next.waveTime += dt; next.cards = stepCards(next.cards, dt);
  if (next.waveTime >= 18 && next.wave < 3) { next.wave += 1; next.waveTime = 0; next.remaining += 8; next.events.push({ type: 'wave-start', wave: next.wave }); }
  return next;
}

export function playCard(state, cardId) {
  const result = deployCard(state.cards, cardId); if (!result.deployed) return { state, event: { type: 'card-rejected', cardId, reason: result.reason } };
  const next = structuredClone(state); next.cards = result.state; next.remaining += CARD_DECK.find(card => card.id === cardId)?.role === 'hero' ? 0 : 1; next.events.push({ type: 'card-deployed', cardId }); return { state: next, event: next.events.at(-1) };
}
