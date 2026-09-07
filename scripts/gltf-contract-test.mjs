import assert from 'node:assert/strict';
import { ROLE_CLIPS, ROLE_MODEL_PATHS, validateRoleAnimations } from '../src/gltf-assets.mjs';
for (const role of Object.keys(ROLE_MODEL_PATHS)) {
  const expected = ROLE_CLIPS[role];
  assert.ok(expected.length >= 3);
  const good = validateRoleAnimations(role, expected);
  assert.equal(good.ok, true);
  const bad = validateRoleAnimations(role, expected.slice(1));
  assert.equal(bad.ok, false);
  assert.ok(bad.missing.length >= 1);
}
assert.equal(validateRoleAnimations('unknown', []).reason, 'unknown-role');
console.log('GLTF CONTRACT OK 3 roles, required clips and negative controls');
