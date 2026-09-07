# Release checklist

## Machine-green

- `npm run verify`
- Fast gate and browser smoke are green.
- Pages deployment is green.
- `assets/manifest.json` matches the shipped asset state.
- Final GLB models are either verified and listed, or explicitly marked not shipped.

## Human acceptance still required

- Real device touch feel
- Physical speaker audibility
- Final visual readability at mobile and desktop sizes
- Balance and fun

## Current release state

The game is a working browser prototype with a complete deterministic validation loop and an optional 3D battlefield preview. It is not yet a final art-complete release because original GLB character assets are not shipped.
