# Current model gap

Final GLB files are not shipped because the current build environment has no Blender or GLB exporter. This is intentional, not a failed load.

Until original GLB assets exist:

- Three.js uses procedural placeholder geometry.
- `model-status.mjs` exposes the fallback explicitly.
- `gltf-assets.mjs` remains the future loader contract.
- No external model is silently presented as a finished Zhao Yun, A Dou, or enemy asset.

Human/tooling action required later: generate original GLB files, verify required clips, compute hashes, add provenance to `assets/manifest.json`, then rerun browser smoke.