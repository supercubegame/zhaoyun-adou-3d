import fs from 'node:fs';
import path from 'node:path';

const roles = [
  { id: 'zhaoyun', name: '赵云', palette: ['#263f59', '#d1a33b'], clips: ['idle','walk','attack','hit','protect','victory','defeat'] },
  { id: 'adou', name: '阿斗', palette: ['#3566a1', '#d1a33b'], clips: ['idle','follow','scared','rescued','defeat'] },
  { id: 'enemy', name: '敌军', palette: ['#6b2f3d', '#4b4b4b'], clips: ['idle','walk','attack','hit','defeat'] }
];
const out = process.argv[2] || 'assets/generated';
fs.mkdirSync(out, { recursive: true });
for (const role of roles) {
  fs.writeFileSync(path.join(out, `${role.id}.asset.json`), JSON.stringify({ ...role, format: 'procedural-placeholder', source: 'tools/procedural-assets.mjs', license: 'project-original-placeholder' }, null, 2) + '\n');
}
console.log(`GENERATED ${roles.length} procedural asset contracts in ${out}`);
