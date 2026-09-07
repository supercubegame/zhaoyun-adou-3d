# GLB asset pipeline

1. Generate or model original geometry for Zhao Yun, A Dou, and the generic enemy.
2. Export one `.glb` per role with animation clip names matching `src/gltf-assets.mjs`.
3. Load through Three.js `GLTFLoader` and `loadRoleModel()`.
4. Run a browser smoke check that verifies each model loads, each expected clip exists, and no texture request fails.
5. Record source, license, date, file hash, and preview screenshot in `assets/manifest.json`.

Current status: **loader contract installed; final GLB files not shipped yet**. The game must report this as an explicit asset gap, not silently substitute a finished character claim.
