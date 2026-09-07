import { WORLD } from './game.mjs';

const iso = (x, y, canvas) => ({
  x: canvas.width / 2 + (x - y) * 38,
  y: 80 + (x + y) * 19
});

function diamond(ctx, x, y, w, h, fill, stroke = null) {
  ctx.beginPath();
  ctx.moveTo(x, y - h / 2); ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x, y + h / 2); ctx.lineTo(x - w / 2, y); ctx.closePath();
  ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
}

function actor(ctx, point, color, label, size = 18) {
  diamond(ctx, point.x, point.y - size * 0.5, size * 1.3, size, color, '#f4e6c1');
  ctx.fillStyle = '#fff8e7'; ctx.font = 'bold 12px system-ui';
  ctx.textAlign = 'center'; ctx.fillText(label, point.x, point.y - size - 8);
}

export function render(ctx, state) {
  const { canvas } = ctx;
  const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
  g.addColorStop(0, '#091a26'); g.addColorStop(1, '#193d38');
  ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y <= WORLD.height; y += 1) {
    for (let x = 0; x <= WORLD.width; x += 1) {
      const p = iso(x, y, canvas);
      diamond(ctx, p.x, p.y, 76, 38, (x + y) % 2 ? '#315c4c' : '#386a54', '#4d8163');
    }
  }
  const exit = iso(WORLD.exit.x, WORLD.exit.y, canvas);
  diamond(ctx, exit.x, exit.y, 62, 30, '#b78232', '#f7d27b');
  ctx.fillStyle = '#fff1bd'; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'center'; ctx.fillText('出口', exit.x, exit.y - 20);
  for (const enemy of state.enemies) actor(ctx, iso(enemy.x, enemy.y, canvas), '#8d3038', '敌', 16);
  actor(ctx, iso(state.dou.x, state.dou.y, canvas), '#4b82c4', '阿斗', 15);
  actor(ctx, iso(state.zhao.x, state.zhao.y, canvas), '#d1a33b', '赵云', 23);
  ctx.fillStyle = '#f6e8c8'; ctx.font = '14px system-ui'; ctx.textAlign = 'left';
  ctx.fillText(`阿斗 ${state.dou.hp}/${state.dou.maxHp}`, 18, 28);
  ctx.fillText(`赵云 ${state.zhao.hp}/3`, 18, 49);
  if (state.status !== 'playing') {
    ctx.fillStyle = 'rgba(3,9,14,.76)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = state.status === 'won' ? '#f8d477' : '#ef8d83';
    ctx.font = 'bold 32px system-ui'; ctx.textAlign = 'center';
    ctx.fillText(state.status === 'won' ? '护送成功' : '阿斗失守', canvas.width / 2, canvas.height / 2);
    ctx.font = '16px system-ui'; ctx.fillStyle = '#fff'; ctx.fillText('按 R 重新开始', canvas.width / 2, canvas.height / 2 + 34);
  }
}
