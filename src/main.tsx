import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import React, { Suspense, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Physics } from '@react-three/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { Scene } from './Scene'
import './styles/main.css'
import { Experience } from './sceneTwo'
import { Loader } from '@react-three/drei'
import { ChakraProvider, Stat } from '@chakra-ui/react'
import { StartMenu } from './StartMenu'

function Main() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(true)
  return (
    <div className='main'>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
        shadows={'soft'}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [45, 4, 140] }}
      >
        <Physics gravity={[0, -15.81, 0]}>
          <Scene startGame={!isStartMenuOpen} />
        </Physics>
      </Canvas>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <StartMenu /> */}
      <Main />
    </ChakraProvider>
  </React.StrictMode>
)
