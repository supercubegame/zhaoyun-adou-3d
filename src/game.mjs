export const WORLD = Object.freeze({ width: 12, height: 8, exit: { x: 10.5, y: 6.5 } });

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export function createGame(seed = 1) {
  return {
    seed,
    status: 'playing',
    time: 0,
    zhao: { x: 1.5, y: 1.5, hp: 3, speed: 3.2 },
    dou: { x: 1.0, y: 1.5, hp: 5, maxHp: 5, follow: 2.2 },
    enemies: [
      { id: 'guard-1', x: 7.2, y: 2.2, speed: 0.8, cooldown: 0 },
      { id: 'guard-2', x: 8.2, y: 5.4, speed: 0.7, cooldown: 0.4 }
    ]
  };
}

export function step(state, input = {}, dt = 1 / 60) {
  if (state.status !== 'playing') return state;
  const next = structuredClone(state);
  next.time += dt;
  const dx = Number(Boolean(input.right)) - Number(Boolean(input.left));
  const dy = Number(Boolean(input.down)) - Number(Boolean(input.up));
  const length = Math.hypot(dx, dy) || 1;
  next.zhao.x = clamp(next.zhao.x + (dx / length) * next.zhao.speed * dt, 0.6, WORLD.width - 0.6);
  next.zhao.y = clamp(next.zhao.y + (dy / length) * next.zhao.speed * dt, 0.6, WORLD.height - 0.6);

  const followDist = distance(next.dou, next.zhao);
  if (followDist > next.dou.follow) {
    const ratio = (followDist - next.dou.follow) / followDist;
    next.dou.x += (next.zhao.x - next.dou.x) * ratio * Math.min(1, dt * 3);
    next.dou.y += (next.zhao.y - next.dou.y) * ratio * Math.min(1, dt * 3);
  }

  for (const enemy of next.enemies) {
    const target = distance(enemy, next.zhao) < distance(enemy, next.dou) ? next.zhao : next.dou;
    const d = distance(enemy, target);
    if (d > 0.8) {
      enemy.x += ((target.x - enemy.x) / d) * enemy.speed * dt;
      enemy.y += ((target.y - enemy.y) / d) * enemy.speed * dt;
    } else {
      enemy.cooldown -= dt;
      if (enemy.cooldown <= 0) {
        enemy.cooldown = 1.0;
        if (target === next.dou) next.dou.hp = Math.max(0, next.dou.hp - 1);
        else next.zhao.hp = Math.max(0, next.zhao.hp - 1);
      }
    }
  }

  if (next.dou.hp <= 0 || next.zhao.hp <= 0) next.status = 'lost';
  if (distance(next.dou, WORLD.exit) < 0.8 && next.dou.hp > 0) next.status = 'won';
  return next;
}
