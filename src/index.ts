import {
  GltfContainer,
  InputAction,
  PointerEventType,
  Transform,
  engine,
  inputSystem,
  Material
} from '@dcl/sdk/ecs'
import { createBall, playerThrow } from './modules/ball'
import { createTarget } from './modules/target'
import { loadColliders } from './modules/colliderSetup'
import { Color4, Vector3, Quaternion } from '@dcl/sdk/math'
import CANNON from 'cannon'
import { Ball, Target, Media } from './modules/components'
import { createRaycast } from './modules/highlighter'
import { uiBar } from './ui-entities/UiBar'
import { setupUi } from './ui'
import {createModels } from './modules/sceneModels'
import {receiveMessages } from './modules/receiveMessage'
import {playAudio, winningSound} from './gameSounds'
// UI
setupUi()

// RAYCAST
createRaycast(engine.CameraEntity)
//load scene models and video
createModels()

//load messageBus 
receiveMessages()
//load music
playAudio(true)
// winningSound()

// Setup our world
const world = new CANNON.World()
world.quatNormalizeSkip = 0
world.quatNormalizeFast = false
world.gravity.set(0, -16, 0) // m/s²

loadColliders(world)

// Setup ground material
const physicsMaterial = new CANNON.Material('groundMaterial')
const ballContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, {
  friction: 1,
  restitution: 0.5
})
world.addContactMaterial(ballContactMaterial)

// Create balls
const ball1 = createBall(Vector3.create(26, 1.43, 6), physicsMaterial, world)


const balls: any[] = [ball1]

//create Target

const target = createTarget(Vector3.create(26, 2.42, 26), physicsMaterial, world)

const targets: any[] = [target]


// Create a ground plane and apply physics material
const groundShape: CANNON.Plane = new CANNON.Plane()
const groundBody: CANNON.Body = new CANNON.Body({ mass: 0 })
groundBody.addShape(groundShape)
groundBody.material = physicsMaterial
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis
groundBody.position.set(0, 0.05, 0)
world.addBody(groundBody) // Add ground body to world

// Controls and UI
let throwPower = 0
let isPowerUp = true
const POWER_UP_SPEED = 150


export function powerMeterSystem(dt: number) {
  if (throwPower < 1) {
    isPowerUp = true
  } else if (throwPower > 99) {
    isPowerUp = false
  }

  if (throwPower > 0 || throwPower < 99) {
    isPowerUp ? (throwPower += dt * POWER_UP_SPEED * 1.1) : (throwPower -= dt * POWER_UP_SPEED) // Powering up is 10% faster
    uiBar.set(throwPower / 100)
    throwPower > 80 ? (uiBar.color = Color4.Red()) : (uiBar.color = Color4.Yellow())
  }
}

// Controls
/////// GLOBAL EVENT LISTENERS
engine.addSystem(() => {
  // Pointer down
  if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
    for (let ball of balls) {
      const ballComponent = Ball.getMutable(ball.ball)
      if (ballComponent.isActive && !ballComponent.isThrown) {
        throwPower = 1
        engine.addSystem(powerMeterSystem)
      }
    }
  }
  // Pointer up
  if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_UP)) {
    for (let ball of balls) {
      const ballComponent = Ball.getMutable(ball.ball)
      if (ballComponent.isActive && !ballComponent.isThrown) {
        // Strength system
        engine.removeSystem(powerMeterSystem)
        uiBar.set(0)
        let throwDirection = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation) // Camera's forward vector
        playerThrow(ball.ball, ball.body, throwDirection, throwPower)
      }
    }
  }
})




function danceFloor(active:boolean = true) {
  for (const [entity] of engine.getEntitiesWith(Media)) {
  
    const flag = Media.get(entity)

    if (flag.danceFloorFlag == true){
      if (active == true) {


        const danceFloorTransform = Transform.getMutable(entity)
        danceFloorTransform.scale.x = 16
        danceFloorTransform.scale.y = 16
        danceFloorTransform.scale.z = 16


      } else {
        

      }
     

    } 
  }
}


// Set high to prevent tunnelling
const FIXED_TIME_STEPS = 1.0 / 60
const MAX_TIME_STEPS = 10

// let firstBounce:number = 0
let ballStopped:boolean = false

let targetPosition: Vector3 = Vector3.create(5, 0, 0)


let timer = 0
export function physicsSystem(dt: number) {
  world.step(FIXED_TIME_STEPS, dt, MAX_TIME_STEPS)


  //if the winner is full size wait x seconds and retun to small size
 
  for (const [entity] of engine.getEntitiesWith(Media)) { 

    const transform = Transform.getMutable(entity)
    const flag = Media.getMutable(entity)

    if (transform.scale.x > 0){

      flag.winnerActive = true
      // if (flag.danceFloorFlag==true){
      //   //reset winner animation to Zero
      //         transform.scale.x = 0
      //         transform.scale.y = 0
      //         transform.scale.z = 0
      // }
      // danceFloor(false)
      timer += dt
      
        if (timer >= 8){
            if (flag.winnerFlag == true){
                console.log('-------winner large '+timer)
              timer = 0
                  //reset winner animation to Zero
                  transform.scale.x = 0
                  transform.scale.y = 0
                  transform.scale.z = 0

                  danceFloor(true)
          }
        }

      
    }
    
  }


  for (const [entity] of engine.getEntitiesWith(Target)) {
    Vector3.copyFrom(Transform.getMutable(entity).position, Transform.getMutable(entity).position)
    Transform.getMutable(entity).rotation = target.body.quaternion
   
    if (
      target.body.velocity.almostEquals(new CANNON.Vec3(0, 0, 0), .5) &&
      target.body.sleepState !== CANNON.Body.SLEEPING
    ) {
      
      const transform = Transform.getMutable(entity)
        
          transform.position.x = 26
          transform.position.y = 2
          transform.position.z = 26

          transform.rotation.x = -1
          transform.rotation.y = 0
          transform.rotation.z = 0
          transform.rotation.w = 1

          const flipRotation = Quaternion.fromEulerDegrees(180, 0, 0 );


          const newRotation = Quaternion.multiply(transform.rotation, flipRotation);

          transform.rotation = newRotation

          target.body.sleepState = CANNON.Body.SLEEPING
    }


  }
 
  for (let i = 0; i < balls.length; i++) {
    const ballComponent = Ball.getMutable(balls[i].ball)
    if (!ballComponent.isActive) {

      Vector3.copyFrom(balls[i].body.position, Transform.getMutable(balls[i].ball).position)
      Transform.getMutable(balls[i].ball).rotation = balls[i].body.quaternion
    }
    if (
      ball1.body.velocity.almostEquals(new CANNON.Vec3(0, 0, 0), .9) &&
      ball1.body.sleepState !== CANNON.Body.SLEEPING
    ) {


      for (const [entity] of engine.getEntitiesWith(Ball)) {

                
              const transform2 = Transform.getMutable(entity)
                
              transform2.position.x = 26
              transform2.position.y = 1.43
              transform2.position.z = 6


              // ball1.body.sleepState = CANNON.Body.SLEEPING
      }
      // if (balls[i].isActive == true) {
      //   console.log('stopped '+i)


      // }
      // firstBounce++
      // ballStopped = ballComponent.isActive
    }

    for (let i = 0; i < targets.length; i++) {
      Transform.getMutable(targets[i].target).position = targets[i].body.position
      Transform.getMutable(targets[i].target).rotation = {x:-1,y:0,z:0,w:1} //targets[i].body.quaternion
    }//targets
  }
}

engine.addSystem(physicsSystem)

// Camera area modifier to match with picked ball visuals
export const areaEntity = engine.addEntity()
Transform.create(areaEntity, {
  position: Vector3.create(8, 0, 8)
})
