export const WORLD = Object.freeze({ width: 12, height: 8, exit: { x: 10.5, y: 6.5 }, obstacles: [{ x: 4.5, y: 2.5, w: 1.5, h: 2.2 }, { x: 7.1, y: 6.0, w: 1.8, h: 1.1 }] });
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const blocked = (x, y) => WORLD.obstacles.some(o => x > o.x - .45 && x < o.x + o.w + .45 && y > o.y - .45 && y < o.y + o.h + .45);
const move = (actor, dx, dy, speed, dt) => { const nx = clamp(actor.x + dx * speed * dt, .6, WORLD.width - .6); const ny = clamp(actor.y + dy * speed * dt, .6, WORLD.height - .6); if (!blocked(nx, actor.y)) actor.x = nx; if (!blocked(actor.x, ny)) actor.y = ny; };
export function createGame(seed = 1) { return { seed, status: 'playing', time: 0, slash: 0, zhao: { x: 1.5, y: 1.5, hp: 3, speed: 3.2 }, dou: { x: 1.0, y: 1.5, hp: 5, maxHp: 5, follow: 2.2 }, enemies: [{ id: 'guard-1', x: 7.2, y: 2.2, hp: 2, speed: .8, cooldown: 0 }, { id: 'guard-2', x: 8.2, y: 5.4, hp: 2, speed: .7, cooldown: .4 }] }; }
export function step(state, input = {}, dt = 1 / 60) {
  if (state.status !== 'playing') return state;
  const next = structuredClone(state); next.time += dt; next.slash = Math.max(0, next.slash - dt);
  const dx = Number(Boolean(input.right)) - Number(Boolean(input.left)); const dy = Number(Boolean(input.down)) - Number(Boolean(input.up)); const len = Math.hypot(dx, dy) || 1;
  move(next.zhao, dx / len, dy / len, next.zhao.speed, dt);
  if (input.attack && next.slash <= 0) { next.slash = .32; for (const enemy of next.enemies) if (distance(enemy, next.zhao) < 1.25) enemy.hp -= 1; next.enemies = next.enemies.filter(e => e.hp > 0); }
  const followDist = distance(next.dou, next.zhao); if (followDist > next.dou.follow) { const ratio = (followDist - next.dou.follow) / followDist; move(next.dou, (next.zhao.x - next.dou.x) / followDist * ratio * 3, (next.zhao.y - next.dou.y) / followDist * ratio * 3, 1, dt); }
  for (const enemy of next.enemies) { const target = distance(enemy, next.zhao) < distance(enemy, next.dou) ? next.zhao : next.dou; const d = distance(enemy, target); if (d > .8) move(enemy, (target.x - enemy.x) / d, (target.y - enemy.y) / d, enemy.speed, dt); else { enemy.cooldown -= dt; if (enemy.cooldown <= 0) { enemy.cooldown = 1; if (target === next.dou) next.dou.hp = Math.max(0, next.dou.hp - 1); else next.zhao.hp = Math.max(0, next.zhao.hp - 1); } } }
  if (next.dou.hp <= 0 || next.zhao.hp <= 0) next.status = 'lost'; if (distance(next.dou, WORLD.exit) < .8 && next.dou.hp > 0) next.status = 'won'; return next;
}
