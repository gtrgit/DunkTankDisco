import { ColliderLayer, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3,Quaternion } from '@dcl/sdk/math'
import { playRandomHitSound } from './sound'
// import CANNON, { Quaternion } from 'cannon'
import CANNON from 'cannon'
import { MessageBus } from '@dcl/sdk/message-bus'

const sceneMessageBus = new MessageBus()



import {  Target } from './components'

export function createTarget(position: Vector3, cannonMaterial: CANNON.Material, cannonWorld: CANNON.World) {
  const target = engine.addEntity()
  let body: CANNON.Body
  let world = cannonWorld
  
    //add target postion component
    Target.create(target, {
        x: position.x,
        y: position.y,
        z: position.z
    })  
 // rotation: Quaternion.fromEulerDegrees(180, 0, 0),
 // rotation: {x:-1,y:0,z:0,w:1},
  Transform.create(target, {
    position: position,
    scale: Vector3.create(0.3,0.3,0.3),
    rotation: Quaternion.fromEulerDegrees(90, 0, 180)
  })

  console.log(Transform.get(target).rotation)


  // // // Transform.getMutable(target)
  
  GltfContainer.create(target, {
    src: 'models/target.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })

  // Create physics body for target
  body = new CANNON.Body({
    mass: 1, // kg
    position: new CANNON.Vec3(position.x, position.y, position.z), // m
    shape: new CANNON.Sphere(0.15) // Create sphere shaped body with a diameter of 0.3m
  })

  // Add material and dampening to stop the target rotating and moving continuously
  body.sleep()
  body.material = cannonMaterial
  body.linearDamping = 0.4
  body.angularDamping = 0.4
  world.addBody(body) // Add target body to the world


  let targetRollCount:number = 0
  // target collision
  body.addEventListener('collide', (e: any) => {
    // Only play sound when impact is high enough
    let relativeVelocity = e.contact.getImpactVelocityAlongNormal()
    if (Math.abs(relativeVelocity) > 0.75) {
      playRandomHitSound()
      targetRollCount++
      console.log('I am HIT!!!! DO the hustle!!')

      sceneMessageBus.emit('targetHit', { position: { x: 10, y: 2, z: 10 } })

    }
    if (targetRollCount>2){
        console.log('I am HIT more than twice!!!')

    }
  })


  return { target, body }
}
