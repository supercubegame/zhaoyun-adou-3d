import fs from 'node:fs';
import assert from 'node:assert/strict';
import { MODEL_STATUS } from '../src/model-status.mjs';

const manifest = JSON.parse(fs.readFileSync('assets/manifest.json', 'utf8'));
for (const role of ['zhaoyun', 'adou', 'enemy']) {
  assert.equal(MODEL_STATUS[role].status, 'not-shipped');
  assert.equal(manifest.model_contracts[role].status, 'not-shipped');
  assert.equal(MODEL_STATUS[role].fallback, 'procedural-placeholder');
}
assert.equal(manifest.shipped_assets.length, 0);
assert.match(fs.readFileSync('docs/MODEL-GAP.md', 'utf8'), /not shipped/i);
console.log('RELEASE INTEGRITY OK: final GLB gap is explicit, fallback is named, no fake shipped assets');
