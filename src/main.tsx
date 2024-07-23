import { Canvas } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Physics } from '@react-three/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { Scene } from './Scene'
import './styles/main.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StartMenu } from './components/permComponents/StartMenu'
import { Loader, useProgress } from '@react-three/drei'
import { SpeedDial } from './components/permComponents/SpeedDial/SpeedDialInfo'
import { ScoreCard } from './components/permComponents/scoreCard/ScoreCard'
import { ControlsModal } from './components/permComponents/SpeedDial/ControlsModal'

function Main() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(true)
  const [showControlsButton, setShowControlsButton] = useState<boolean>(false)
  const [showControlsModal, setShowControlsModal] = useState<boolean>(false)
  const [scoreTotal, setScoreTotal] = useState<number>(0)
  const [holeTotal, setHoleTotal] = useState<number>(0)
  const [holePar, setHolePar] = useState<number>(0)

  const { loaded } = useProgress()

  return (
    <div className='main' style={{ position: 'relative' }}>
      {loaded && (
        <StartMenu
          isOpen={isStartMenuOpen}
          onClose={() => {
            setIsStartMenuOpen(false)
            setShowControlsButton(true)
          }}
        />
      )}
      <ControlsModal
        isOpen={showControlsModal}
        onClose={() => setShowControlsModal(false)}
      />

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
          <Physics gravity={[0, -15.81, 0]} debug>
            <Scene
              startGame={!isStartMenuOpen}
              onHit={() => {
                setScoreTotal((total) => total + 1)
                setHoleTotal((total) => total + 1)
              }}
            />
          </Physics>
        </Suspense>
      </Canvas>
      <SpeedDial
        showControlsButton={showControlsButton}
        onClickControls={() => setShowControlsModal(true)}
        showGithubLinkButton={false}
        showLinkedInButton={false}
        showCVButton={false}
        onClickGitHub={() => console.log('waiting for implementation')}
        onClickLinkedIn={() => console.log('waiting for implementation')}
        onClickCV={() => console.log('waiting for implementation')}
      />
      <ScoreCard shotTotal={scoreTotal} holeTotal={holeTotal} holePar={holePar} />

      <Loader />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  </React.StrictMode>
)
