import {
    Entity
  } from '@dcl/sdk/ecs'
import { Vector3 } from "@dcl/sdk/math"
import {Media} from './components'
import {createPlane, updateMaterial,createImagePlane} from "../factory"


    const position:Vector3 = {x: 16, y: 5, z: 31.7}
    const rotation:Vector3 = {x: 0, y: 0, z:0}
    const scale:Vector3 = {x:32,y:10,z:32}


    export function createModels(){
    console.log('createPlane')
    const backgroundImage:string = "70_background.png"

  createImagePlane(position,scale,rotation,false,backgroundImage,3,"image",true)


  const bg2position:Vector3 = {x: 48, y: 5, z: 31.7}
    const bg2rotation:Vector3 = {x: 0, y: 180, z:0}
    const bg2scale:Vector3 = {x:32,y:10,z:32}

    createImagePlane(bg2position,bg2scale,bg2rotation,false,backgroundImage,3,"image",true)
    
    const vposition:Vector3 = {x: 30, y: 8, z: 30}
    const vrotation:Vector3 = {x: 0, y: 0, z:0}
    const vscale:Vector3 = {x:24,y:8,z:24}

    const titleVideo:string = "DTD.webm"
  createImagePlane(vposition,vscale,vrotation,true,titleVideo,3,"video",true)


  const position2:Vector3 = {x: 26, y: .1, z: 16}
  const rotation2:Vector3 = {x: 90, y: 0, z:0}
  const scale2:Vector3 = {x:2,y:24,z:2}

  const throw_lane:string = "throw_lane.png"
createImagePlane(position2,scale2,rotation2,true,throw_lane,3,"image",true)



const v5position:Vector3 = {x: 34.8, y: 2.5, z: 18}
const v5rotation:Vector3 = {x: 60, y: 90, z:0}
const v5scale:Vector3 = {x:2,y:8,z:2}

const ramp:string = "throw_lane.png"
createImagePlane(v5position,v5scale,v5rotation,true,ramp,3,"image",true)



const v2position:Vector3 = {x: 28, y: 1.25, z: 8}
const v2rotation:Vector3 = {x: 0, y: 0, z:0}
const v2scale:Vector3 = {x:1.5,y:1,z:1.5}

const titleVideo2:string = "power.png"
createImagePlane(v2position,v2scale,v2rotation,true,titleVideo2,3,"image",true)



const v3position:Vector3 = {x: 26, y: 2.6, z: 30.5}
const v3rotation:Vector3 = {x: 0, y: 0, z:0}
const v3scale:Vector3 = {x:8,y:8,z:8}

const titleVideo3:string = "winner.webm"
const winnerEntity:Entity = createImagePlane(v3position,v3scale,v3rotation,true,titleVideo3,3,"video",false)

Media.create(winnerEntity, {winnerFlag: true,winnerActive:false,danceFloorFlag:false,sx:8,sy:8,sz:8})


const v4position:Vector3 = {x: 46, y: 4.4, z: 24}
const v4rotation:Vector3 = {x: 90, y: 0, z:0}
const v4scale:Vector3 = {x:16,y:16,z:16}

const danceFloor:string = "danceFloor.webm"
const danceFloorEntity:Entity = createImagePlane(v4position,v4scale,v4rotation,true,danceFloor,3,"video",true)
// createImagePlane(v4position,v4scale,v4rotation,true,danceFloor,3,"video",true)


Media.create(danceFloorEntity, {winnerFlag: false,winnerActive:false,danceFloorFlag:true,sx:16,sy:16,sz:16})

//

const v7position:Vector3 = {x: 46, y: 4.4, z: 24}
const v7rotation:Vector3 = {x: 90, y: 0, z:0}
const v7scale:Vector3 = {x:0,y:0,z:0}

const danceFloorDisappear:string = "FloorDisappear.png"
const danceFloorDisappearEntity:Entity = createImagePlane(v7position,v7scale,v7rotation,false,danceFloorDisappear,3,"image",true)
// createImagePlane(v4position,v4scale,v4rotation,true,danceFloor,3,"video",true)


Media.create(danceFloorDisappearEntity, {winnerFlag: false,winnerActive:false,danceFloorDisappearFlag:true,sx:16,sy:16,sz:16})




// const v6position:Vector3 = {x: 26, y: .2, z: 16}
// const v6rotation:Vector3 = {x: 90, y: 0, z:0}
// const v6scale:Vector3 = {x:1,y:20,z:1}

// const arrowVideo:string = "arrow.webm"
// createImagePlane(v6position,v6scale,v6rotation,true,arrowVideo,3,"video",true)


}
