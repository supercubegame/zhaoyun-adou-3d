# Three.js unit deployment integration

The `battle-3d.html` preview now connects the deterministic card/energy/wave state to visible lane entities.

- Clicking a card spends energy through `playCard`.
- Successful deployments spawn a colored unit capsule on alternating north/south lanes.
- Units advance along their lane using a deterministic progress value.
- The HUD remains a view of state, not a second rules engine.
- Final characters will replace capsules through the glTF asset hook after original models are delivered.

This preview is intentionally separate from the production entry page until the 3D scene has enough feature parity to replace the procedural canvas.
