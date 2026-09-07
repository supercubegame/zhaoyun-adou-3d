# 赵云和阿斗

俯视 3D 风格的浏览器护送游戏：赵云保护阿斗穿过长坂坡路线，击退敌军并抵达出口。

## Run

Serve this directory with any static HTTP server, then open `index.html`. Keyboard: WASD or arrow keys to move, Space to attack, R to restart. On narrow screens, use the touch pad.

## Verification

`npm run verify` runs the deterministic rules gate. GitHub Actions also runs a browser smoke gate that checks the real page, canvas screenshot output, sound toggle, attack control, mobile touch pad, and JavaScript page errors. It uploads screenshots as evidence.

GitHub Pages deployment is configured in `.github/workflows/pages.yml`; the repository owner still needs to enable Pages from Actions if GitHub asks for it.

Machine checks do not prove physical speaker audibility, real-device touch feel, or whether the game is fun. Those remain human acceptance.
