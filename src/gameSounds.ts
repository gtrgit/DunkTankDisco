import {
    AudioSource,
    engine,
    Transform
  } from '@dcl/sdk/ecs'


export function playAudio(play:boolean){
// Create entity
const sourceEntity = engine.addEntity()

AudioSource.create(sourceEntity, {
    audioClipUrl: 'sounds/disco-food.mp3',
    loop: true,
    playing: false,
    volume: 1
})

Transform.create(sourceEntity, { position: { x: 32, y: 1, z: 6 }})
if (!play){
    console.log('stop play')

    const audioSource =  AudioSource.getMutable(sourceEntity)
    audioSource.playing = false

} else {
    
    AudioSource.getMutable(sourceEntity).playing = true
}

}



export function winningSound(play:boolean){
    // Create entity
    const sourceEntity = engine.addEntity()
    
    AudioSource.create(sourceEntity, {
        audioClipUrl: 'sounds/keep-on-moving.wav',
        loop: false,
        playing: false,
        volume: .6
    })
    
    Transform.create(sourceEntity, { position: { x: 26, y: 1, z: 6 }})

        if (play){
            console.log('play')
            AudioSource.getMutable(sourceEntity).playing = true
        }
    }
    