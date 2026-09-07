export const ROLE_MODEL_PATHS = Object.freeze({
  zhaoyun: 'assets/models/zhaoyun.glb',
  adou: 'assets/models/adou.glb',
  enemy: 'assets/models/enemy.glb'
});

export const ROLE_CLIPS = Object.freeze({
  zhaoyun: ['idle','walk','attack','hit','protect','victory','defeat'],
  adou: ['idle','follow','scared','rescued','defeat'],
  enemy: ['idle','walk','attack','hit','defeat']
});

export function validateRoleAnimations(role, clipNames) {
  const required = ROLE_CLIPS[role];
  if (!required) return { ok: false, missing: [], reason: 'unknown-role' };
  const available = new Set(clipNames);
  const missing = required.filter(name => !available.has(name));
  return { ok: missing.length === 0, missing, reason: null };
}

export async function loadRoleModel(loader, role) {
  const url = ROLE_MODEL_PATHS[role];
  if (!url) throw new Error(`unknown-role:${role}`);
  const gltf = await loader.loadAsync(url);
  const check = validateRoleAnimations(role, gltf.animations.map(animation => animation.name));
  if (!check.ok) throw new Error(`missing-animation-clips:${role}:${check.missing.join(',')}`);
  return { role, url, scene: gltf.scene, animations: gltf.animations, check };
}
