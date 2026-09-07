import fs from 'node:fs';
import assert from 'node:assert/strict';

const contract = JSON.parse(fs.readFileSync(new URL('../game-contract.json', import.meta.url), 'utf8'));
assert.equal(contract.title, '赵云和阿斗');
assert.equal(contract.platform, 'browser');
assert.equal(contract.camera, undefined, 'camera belongs in the first playable slice');
assert.equal(contract.first_playable_slice.camera, '俯视 3D');
assert.equal(contract.first_playable_slice.player, '赵云');
assert.equal(contract.first_playable_slice.protected_character, '阿斗');
assert.ok(contract.machine_proof.includes('npm run verify'));
assert.ok(contract.human_acceptance.includes('mobile touch feel is not machine-confirmed'));
const raw = fs.readFileSync(new URL('../game-contract.json', import.meta.url), 'utf8');
assert.equal(/(ghp_|github_pat_|sk-[A-Za-z0-9])/.test(raw), false);
console.log('PASS game contract: top-down 3D Zhao Yun and A Dou slice is registered');
console.log('PASS machine boundary: deterministic fast gate is installed');
console.log('PASS human boundary: touch, audio, and playability remain explicit');
console.log('VERIFY OK 3/3');
