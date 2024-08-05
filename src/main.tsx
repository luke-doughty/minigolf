import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Physics } from '@react-three/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { Scene } from './Scene'
import './styles/main.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StartMenu } from './components/permComponents/startMenu/StartMenu'
import { Loader, useProgress } from '@react-three/drei'
import { SpeedDial } from './components/permComponents/speedDial/SpeedDialInfo'
import { ScoreCard } from './components/permComponents/scoreCard/ScoreCard'
import { ControlsModal } from './components/permComponents/controlsModal/ControlsModal'
import { LinksModal } from './components/permComponents/linksModal/LinksModal'
import { ProfessionalExperienceModal } from './components/permComponents/cvModal/ProfessionalExperienceModal'
import { FinishModal } from './components/permComponents/finishMenu/FinishModal'
import { Analytics } from '@vercel/analytics/react'

function Main() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(true)
  const [showControlsButton, setShowControlsButton] = useState<boolean>(false)
  const [showControlsModal, setShowControlsModal] = useState<boolean>(false)

  const [showLinksModal, setShowLinksModal] = useState<boolean>(false)
  const [showLinksButtons, setShowLinksButtons] = useState<boolean>(false)

  const [showProfessionalExperienceModal, setShowProfessionalExperienceModal] =
    useState<boolean>(false)
  const [showCVButton, setshowCVButton] = useState<boolean>(false)

  const [showFinishModal, setShowFinishModal] = useState<boolean>(false)

  const [scoreTotal, setScoreTotal] = useState<number>(0)
  const [holeTotal, setHoleTotal] = useState<number>(0)
  const [currenthole, setCurrentHole] = useState<number>(1)
  const holeToHolePar = new Map<number, number>([
    [1, 2],
    [2, 6],
    [3, 8],
  ])
  const [holePar, setHolePar] = useState<number>(holeToHolePar.get(1)!)
  const [backingTrack, setBackingTrak] = useState<HTMLAudioElement>(
    new Audio('/audio/AmbientRollingBackingTrack.mp3')
  )
  const [volume, setVolume] = useState<number>(0) // TODO: currently this re-renders the grass lol

  const { loaded } = useProgress()

  useEffect(() => {
    backingTrack.volume = volume / 100
    console.log(volume / 100)
  }, [volume, backingTrack])

  const handleStartGame = () => {
    setIsStartMenuOpen(false)
    setShowControlsButton(true)
    backingTrack.loop = true
    backingTrack.playbackRate = 1.05
    backingTrack.volume = volume / 100
    backingTrack.play()
  }

  return (
    <div className='main' style={{ position: 'relative' }}>
      {loaded && (
        <StartMenu
          isOpen={isStartMenuOpen}
          onClose={() => {
            handleStartGame()
          }}
        />
      )}
      <ControlsModal
        isOpen={showControlsModal}
        onClose={() => setShowControlsModal(false)}
      />
      <LinksModal
        isOpen={showLinksModal}
        onClose={() => {
          setShowLinksModal(false)
          setShowLinksButtons(true)
        }}
      />
      <ProfessionalExperienceModal
        isOpen={showProfessionalExperienceModal}
        onClose={() => {
          setShowProfessionalExperienceModal(false)
          setshowCVButton(true)
        }}
      />
      <FinishModal isOpen={showFinishModal} onClose={() => setShowFinishModal(false)} />

      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
        shadows={'soft'}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [75, 20, -45] }}
      >
        <Suspense fallback={null}>
          <Physics gravity={[0, -18.81, 0]}>
            <Scene
              startGame={!isStartMenuOpen}
              onHit={() => {
                setScoreTotal((total) => total + 1)
                setHoleTotal((total) => total + 1)
              }}
              holeTracker={currenthole}
              progressNextHole={() => {
                const nextHole = currenthole + 1
                if (nextHole < 4) {
                  setCurrentHole((curr) => curr + 1)
                  setHolePar(holeToHolePar.get(nextHole)!)
                  if (nextHole === 2) {
                    setShowLinksModal(true)
                  }
                  if (nextHole === 3) {
                    setShowProfessionalExperienceModal(true)
                  }
                  setHoleTotal(0)
                } else {
                  setShowFinishModal(true)
                }
              }}
            />
          </Physics>
        </Suspense>
      </Canvas>
      <SpeedDial
        showControlsButton={showControlsButton}
        onClickControls={() => setShowControlsModal(true)}
        showGithubLinkButton={showLinksButtons}
        showLinkedInButton={showLinksButtons}
        showCVButton={showCVButton}
        onClickGitHub={() => {
          window.open('https://github.com/luke-doughty', 'myWindow')
        }}
        onClickLinkedIn={() => {
          window.open('https://www.linkedin.com/in/luke-doughty/', 'myWindow')
        }}
        onClickCV={() => {
          window.open('/LukeDoughtyCV.pdf', '_blank')
        }}
      />
      <ScoreCard
        shotTotal={scoreTotal}
        holeTotal={holeTotal}
        holePar={holePar}
        holeNumber={currenthole}
        initialVolumne={volume}
        updateVolume={(volume) => setVolume(volume)}
      />

      <Loader />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Analytics />
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  </React.StrictMode>
)
