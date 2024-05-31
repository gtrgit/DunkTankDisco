import {
    Entity,
    engine,
    Transform,
    MeshRenderer,
    MeshCollider,
    Material,
    MaterialTransparencyMode,
    TextureFilterMode,
    TextureWrapMode,
    VideoPlayer
  } from '@dcl/sdk/ecs'
  import { Plane } from './modules/components'
  import { Color4, Quaternion,Vector3 } from '@dcl/sdk/math'
  
  

/////////////////////////////////////////////////////////////////////////////////////////
//createPlane
export function createPlane(position:Vector3,scale:Vector3,rotation:Vector3,collider:Boolean = false): Entity {
    const entity = engine.addEntity()
  
    // Used to track the cubes
    Plane.create(entity)
  
    Transform.create(entity, { position: { x: position.x, y: position.y, z: position.z },
                               scale: {x:scale.x,y:scale.y,z:scale.z},
                               rotation:  Quaternion.fromEulerDegrees(rotation.x,rotation.y,rotation.z)})
  
    // set how the cube looks and collides
    MeshRenderer.setPlane(entity)

    if (collider==true){
        MeshCollider.setPlane(entity)
    }
  
    return entity
  }


//createPlane
export function createImagePlane(position:Vector3,scale:Vector3,rotation:Vector3,collider:Boolean = false,
                                 mediaPath:string,emission:number = 0,mediaType:string,playing:boolean = true): Entity {
    
            const entity = engine.addEntity()
        
            // Used to track the cubes
            Plane.create(entity)
        
            if (playing) {
            Transform.create(entity, { position: { x: position.x, y: position.y, z: position.z },
                                       scale:    { x:scale.x, y:scale.y, z:scale.z},
                                       rotation:  Quaternion.fromEulerDegrees(rotation.x,rotation.y,rotation.z)})
        
           
            } else {
                Transform.create(entity, { position: { x: position.x, y: position.y, z: position.z },
                    scale:    { x:0, y:0, z:0},
                    rotation:  Quaternion.fromEulerDegrees(rotation.x,rotation.y,rotation.z)})

                 
            }

               // set how the cube looks and collides
               MeshRenderer.setPlane(entity)

               if (collider) {
                MeshCollider.setPlane(entity)
               }


            if (mediaType === "image") {
                    const media = Material.Texture.Common({
                    src: 'images/'+mediaPath,
                filterMode: TextureFilterMode.TFM_BILINEAR,
                wrapMode: TextureWrapMode.TWM_CLAMP,
                })
                Material.setPbrMaterial(entity, { 
                    texture: media,
                    emissiveTexture: media,
                    roughness: 20.0,
                    specularIntensity: 0,
                    metallic: 0,
                    alphaTest: .1,
                    emissiveColor: { r: 1, g: 1, b: 1},
                    emissiveIntensity: emission,
                    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
                    
                })   
           }

            if (mediaType === "video") {

                VideoPlayer.create(entity, {
                    src: 'video/'+mediaPath,
                    playing: true,
                    loop: true,
                    playbackRate: 1
                  })
                const media = Material.Texture.Video({ videoPlayerEntity: entity })

                Material.setPbrMaterial(entity, { 
                    texture: media,
                    emissiveTexture: media,
                    alphaTexture: media,
                    roughness: 20.0,
                    specularIntensity: 0,
                    metallic: 0,
                    alphaTest: .1,
                    emissiveColor: { r: 1, g: 1, b: 1},
                    emissiveIntensity: emission,
                    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
                    
                    })
        }


           
           
            
    return entity
  }
  

  export function updateMaterial(texture: string, entity: Entity, roughness:number,
    metallic:number, alphaTest:number, albedoColor: string,
    emissiveColor:string, emissiveIntensity:number){

    let imageTexture =  Material.Texture.Common({src: texture })
    Material.setPbrMaterial(entity, { 
    texture: imageTexture ,
    roughness: roughness,
    specularIntensity: 0,
    metallic: metallic,
    alphaTest: alphaTest,
    albedoColor: Color4.fromHexString(albedoColor),
    alphaTexture: imageTexture,
    emissiveTexture: imageTexture,
    emissiveColor: Color4.fromHexString(emissiveColor),
    emissiveIntensity: emissiveIntensity,
    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
})
}
