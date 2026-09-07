export const CARD_DECK = Object.freeze([
  Object.freeze({ id: 'zhaoyun', name: '赵云', cost: 4, role: 'hero', color: 0xd1a33b }),
  Object.freeze({ id: 'archer', name: '弓兵', cost: 3, role: 'ranged', color: 0x4b82c4 }),
  Object.freeze({ id: 'shield', name: '盾兵', cost: 2, role: 'tank', color: 0x7f8b92 }),
  Object.freeze({ id: 'healer', name: '军医', cost: 3, role: 'support', color: 0x8fbf76 })
]);

export const MAX_ENERGY = 10;

export function createCardState(seed = 1) {
  return { seed, energy: 5, maxEnergy: MAX_ENERGY, time: 0, hand: CARD_DECK.map(card => card.id), deployed: [] };
}

export function stepCards(state, dt = 1 / 60) {
  const next = structuredClone(state); next.time += dt; next.energy = Math.min(next.maxEnergy, next.energy + dt * 0.7); return next;
}

export function deployCard(state, cardId) {
  const card = CARD_DECK.find(item => item.id === cardId); if (!card || state.energy < card.cost) return { state, deployed: false, reason: 'insufficient-energy-or-card' };
  const next = structuredClone(state); next.energy -= card.cost; next.deployed.push({ cardId, at: next.time }); return { state: next, deployed: true, reason: null };
}
