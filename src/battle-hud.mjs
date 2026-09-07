export function createBattleHud(root, cards, onCard) {
  root.innerHTML = `<div class="battlebar"><div class="energy"><span>军令</span><strong data-energy>0</strong><div class="meter"><i data-meter></i></div></div><div class="wave">第 <b data-wave>1</b> 波 · 敌军 <b data-remaining>0</b></div></div><div class="cards" data-cards></div>`;
  const cardRoot = root.querySelector('[data-cards]');
  for (const card of cards) { const button = document.createElement('button'); button.className = 'card'; button.dataset.cardId = card.id; button.innerHTML = `<b>${card.name}</b><small>${card.cost} 军令</small>`; button.onclick = () => onCard(card.id); cardRoot.append(button); }
  return { update(state) { root.querySelector('[data-energy]').textContent = state.cards.energy.toFixed(1); root.querySelector('[data-meter]').style.width = `${state.cards.energy / state.cards.maxEnergy * 100}%`; root.querySelector('[data-wave]').textContent = state.wave; root.querySelector('[data-remaining]').textContent = state.remaining; for (const button of root.querySelectorAll('[data-card-id]')) button.disabled = state.cards.energy < cards.find(card => card.id === button.dataset.cardId).cost; } };
}
