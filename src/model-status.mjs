export const MODEL_STATUS = Object.freeze({
  zhaoyun: Object.freeze({ path: 'assets/models/zhaoyun.glb', status: 'not-shipped', fallback: 'procedural-placeholder' }),
  adou: Object.freeze({ path: 'assets/models/adou.glb', status: 'not-shipped', fallback: 'procedural-placeholder' }),
  enemy: Object.freeze({ path: 'assets/models/enemy.glb', status: 'not-shipped', fallback: 'procedural-placeholder' })
});

export function resolveVisualSource(role, status = MODEL_STATUS[role]) {
  if (!status) throw new Error(`unknown-role:${role}`);
  return status.status === 'shipped' ? { kind: 'gltf', path: status.path } : { kind: status.fallback, path: null };
}
