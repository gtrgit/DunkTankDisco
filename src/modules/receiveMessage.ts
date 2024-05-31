import {
    MeshRenderer,
    MeshCollider,
    Transform,
    engine,
    inputSystem,
    VideoPlayer,
  } from '@dcl/sdk/ecs'
import { MessageBus } from '@dcl/sdk/message-bus'
import {Media} from './components'
import { winningSound } from '../gameSounds'
export function receiveMessages(){


const sceneMessageBus = new MessageBus()
console.log('message loaded!!!')
        type NewBoxPosition = {
        position: { x: number; y: number; z: number }
        }

        sceneMessageBus.on('targetHit', (info: NewBoxPosition) => {

            for (const [entity] of engine.getEntitiesWith(Media)) {

                const winnerSize = Transform.getMutable(entity)
                const mediaData = Media.get(entity)

                winningSound(true) 

                if (mediaData.winnerFlag == true) {

                    winnerSize.scale.x = mediaData.sx
                    winnerSize.scale.y = mediaData.sy
                    winnerSize.scale.z = mediaData.sz
    
                }
                if (mediaData.danceFloorFlag == true) {

                    winnerSize.scale.x = 0 //mediaData.sx
                    winnerSize.scale.y = 0 //mediaData.sy
                    winnerSize.scale.z = 0 //mediaData.sz
    
                }
                if (mediaData.danceFloorDisappearFlag == true) {

                    winnerSize.scale.x = 16
                    winnerSize.scale.y = 16
                    winnerSize.scale.z = 16
    
                }
                
            }


            console.log('message received!!!')
        const myEntity = engine.addEntity()
        Transform.create(myEntity, {
            position: { x: info.position.x, y: info.position.y, z: info.position.z },
        })
        MeshRenderer.setBox(myEntity)
        MeshCollider.setBox(myEntity)
        })
}