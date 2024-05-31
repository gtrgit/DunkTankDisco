import { executeTask } from '@dcl/sdk/ecs'
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import * as ui from 'dcl-ui-toolkit'
import { uiBar } from './ui-entities/UiBar'
import { openExternalUrl } from '~system/RestrictedActions'
import { Color4 } from '@dcl/sdk/math'
import {playAudio, winningSound} from './gameSounds'

const projectPath = "coconut-shy"
const description = "A scene that uses physics to handle the throwing of coconuts and falling of piled up items"
const Max_Chars = 45

export function setupUi() {
	ReactEcsRenderer.setUiRenderer(uiComponent)
  }
  
  const uiComponent = () => (
	<UiEntity
	  uiTransform={{
		width: 300,
		height: 300,
		positionType: 'absolute',
		  position: { right: '1%', top: '9%' },
	  }}
	  // uiBackground={{ color: Color4.create(0.9, 0.8, 0.1, 0.6) }}
	>
	  <UiEntity
		uiTransform={{
		  width: '100%',
		  height: '100%',
		  flexDirection: 'column',
		  alignItems: 'center',
		  justifyContent: 'space-between'
		}}
		// uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
	  >
		<UiEntity
		  uiTransform={{
			width: '15%',
			height: '17%',
			margin: '4px 0',
  
		  }}
		  uiBackground={{
			textureMode: 'stretch',
			texture: {
			  src: 'PolyGraph.png',
			},
		  }}
		   onMouseDown={() => {
		   
		
		  }}
		/>
		<UiEntity
		  uiTransform={{
			width: '15%',
			height: '12%',
			margin: '4px 0'
		  }}
		  uiBackground={{
			textureMode: 'stretch',
			texture: {
			  src: 'speaker.png',
			},
		  }}
		  uiText={{ value: '\n\nMusic Off', fontSize: 15, color: Color4.fromHexString("#ffffff")}}
		  onMouseDown={() => {
			playAudio(false)
			
		  }}
		/>
		
	   </UiEntity>
	</UiEntity>
  )
  
//   function getPlayerPosition() {
// 	const playerPosition = Transform.getOrNull(engine.PlayerEntity)
// 	if (!playerPosition) return ' no data yet'
// 	const { x, y, z } = playerPosition.position
// 	return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
//   }
  
  