export const BATTLEFIELD_SPEC = Object.freeze({
  lanes: Object.freeze([
    Object.freeze({ id: 'north', start: { x: 1.2, y: 1.2 }, bridge: { x: 5.5, y: 2.0 }, exit: { x: 10.8, y: 1.8 } }),
    Object.freeze({ id: 'south', start: { x: 1.2, y: 6.8 }, bridge: { x: 5.5, y: 6.0 }, exit: { x: 10.8, y: 6.2 } })
  ]),
  towers: Object.freeze([
    Object.freeze({ id: 'adou-camp', owner: 'player', x: 1.1, y: 4.0, role: 'protected-base' }),
    Object.freeze({ id: 'enemy-gate', owner: 'enemy', x: 10.9, y: 4.0, role: 'wave-source' })
  ]),
  obstacles: Object.freeze([
    Object.freeze({ id: 'central-ruins', x: 5.7, y: 4.0, width: 1.8, height: 2.4, cover: true }),
    Object.freeze({ id: 'north-rocks', x: 4.2, y: 2.3, width: 1.2, height: 1.0, cover: false }),
    Object.freeze({ id: 'south-rocks', x: 7.8, y: 5.7, width: 1.2, height: 1.0, cover: false })
  ]),
  camera: Object.freeze({ mode: 'orthographic-top-down', zoomMin: 0.72, zoomMax: 1.35, pan: true }),
  unitSlots: Object.freeze(['zhaoyun', 'adou', 'archer', 'shield', 'enemy'])
});

export function enumerateBattlefield(spec = BATTLEFIELD_SPEC) {
  return {
    laneIds: spec.lanes.map(lane => lane.id),
    towerIds: spec.towers.map(tower => tower.id),
    obstacleIds: spec.obstacles.map(obstacle => obstacle.id),
    cameraMode: spec.camera.mode,
    unitSlots: [...spec.unitSlots]
  };
}
