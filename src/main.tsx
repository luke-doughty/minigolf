import { Canvas } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Physics } from '@react-three/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { Scene } from './Scene'
import './styles/main.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StartMenu } from './StartMenu'
import { Loader, useProgress } from '@react-three/drei'

function Main() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(true)
  const { loaded } = useProgress()

  return (
    <div className='main'>
      {loaded && (
        <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      )}

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
        <Suspense fallback={null}>
          <Physics gravity={[0, -15.81, 0]}>
            <Scene startGame={!isStartMenuOpen} />
          </Physics>
        </Suspense>
      </Canvas>
      <Loader />
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
