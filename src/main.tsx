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
import { ScoreBoardModal } from './components/permComponents/finishMenu/ScoreBoardModal'

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
  const [showSaveScoreModal, setShowSaveScoreModal] = useState<boolean>(false)

  const [scoreTotal, setScoreTotal] = useState<number>(0)
  const [holeTotal, setHoleTotal] = useState<number>(0)
  const [currenthole, setCurrentHole] = useState<number>(1)
  const holeToHolePar = new Map<number, number>([
    [1, 2],
    [2, 5],
    [3, 2],
  ])
  const [holePar, setHolePar] = useState<number>(holeToHolePar.get(1)!)

  const [volume, setVolume] = useState<number>(0) // TODO: currently this re-renders the grass lol

  const { loaded } = useProgress()

  const backingTrackRef = React.useRef<HTMLAudioElement | null>(null)
  const hitBallSoundRef = React.useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const backingTrack = new Audio('/audio/AmbientRollingBackingTrack.mp3')
    backingTrackRef.current = backingTrack

    const handleEnded = () => {
      backingTrack.pause()
      backingTrack.src = ''
    }

    backingTrack.addEventListener('ended', handleEnded)

    return () => {
      backingTrack.removeEventListener('ended', handleEnded)
      backingTrack.pause()
      backingTrack.src = ''
    }
  }, [])

  useEffect(() => {
    const golfBallHit = new Audio('/audio/GolfBallShot.mp3')
    hitBallSoundRef.current = golfBallHit

    const handleEndedHit = () => {
      golfBallHit.pause()
      golfBallHit.currentTime = 0
    }

    golfBallHit.addEventListener('ended', handleEndedHit)
    return () => {
      golfBallHit.removeEventListener('ended', handleEndedHit)
      golfBallHit.pause()
      golfBallHit.src = ''
    }
  }, [])

  useEffect(() => {
    const interval = 50 // milliseconds
    const volumeChangeRate = 0.08
    let volumeInterval: NodeJS.Timeout | undefined

    if (backingTrackRef.current) {
      const targetVolume = volume / 100

      volumeInterval = setInterval(() => {
        if (backingTrackRef.current) {
          const currentVolume = backingTrackRef.current.volume

          if (Math.abs(currentVolume - targetVolume) <= volumeChangeRate) {
            backingTrackRef.current.volume = targetVolume
            clearInterval(volumeInterval)
          } else if (currentVolume < targetVolume) {
            backingTrackRef.current.volume = Math.min(
              currentVolume + volumeChangeRate,
              targetVolume
            )
          } else {
            backingTrackRef.current.volume = Math.max(
              currentVolume - volumeChangeRate,
              targetVolume
            )
          }
        }
      }, interval)
    }

    return () => {
      if (volumeInterval) {
        clearInterval(volumeInterval)
      }
    }
  }, [volume])

  const handleStartGame = () => {
    setIsStartMenuOpen(false)
    setShowControlsButton(true)
    if (backingTrackRef.current) {
      const backingTrack = backingTrackRef.current
      backingTrack.loop = true
      backingTrack.playbackRate = 1.05
      backingTrack.volume = volume / 100
      backingTrack.play()
    }
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

      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
        shadows={'soft'}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [75, 20, -65] }}
      >
        <Suspense fallback={null}>
          <Physics gravity={[0, -18.81, 0]}>
            <Scene
              startGame={!isStartMenuOpen}
              onHit={() => {
                setScoreTotal((total) => total + 1)
                setHoleTotal((total) => total + 1)
                hitBallSoundRef.current?.play()
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
                  setShowSaveScoreModal(true)
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

      <FinishModal isOpen={showFinishModal} onClose={() => setShowFinishModal(false)} />
      <ScoreBoardModal
        isOpen={showSaveScoreModal}
        onClose={() => {
          setShowSaveScoreModal(false)
          setShowFinishModal(true)
        }}
        totalShots={scoreTotal}
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
