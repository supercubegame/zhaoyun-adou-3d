# GLB asset pipeline

1. Generate or model original geometry for Zhao Yun, A Dou, and the generic enemy.
2. Export one `.glb` per role with animation clip names matching `src/animation.mjs`.
3. Load through Three.js `GLTFLoader`.
4. Run a browser smoke check that verifies each model loads, each expected clip exists, and no texture request fails.
5. Record source, license, date, file hash, and preview screenshot in `assets/manifest.json`.

Until final meshes exist, `tools/procedural-assets.mjs` generates stable JSON contracts so gameplay can proceed without fake claims that the characters are already modeled.
