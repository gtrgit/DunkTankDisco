import { Schemas, engine } from '@dcl/sdk/ecs'

export const Ball = engine.defineComponent('Ball', {
  isActive: Schemas.Boolean,
  isThrown: Schemas.Boolean,
  glowEntity: Schemas.Entity
})



export const Target = engine.defineComponent('TargetComp', {
  x: Schemas.Number,
  y: Schemas.Number,
  z: Schemas.Number
})



export const Plane = engine.defineComponent('plane-id', {})


export const Media = engine.defineComponent('mediaId', {
  winnerFlag: Schemas.Boolean,
  danceFloorFlag: Schemas.Boolean,
  sx: Schemas.Number,
  sy: Schemas.Number,
  sz: Schemas.Number
})
