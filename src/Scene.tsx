import { Plane } from '@react-three/drei'
import { Object3DNode, useFrame, useLoader } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { FC, Ref, useRef, useState } from 'react'
import { Group, Object3DEventMap, TextureLoader, Vector3 } from 'three'
import { GolfBall } from './components/permThreeComponents/GolfBall'
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { CourseOneWalls } from './components/holeOne/CourseOneWalls'
import { SignPostPointRight } from './components/models/SignPostPointRight'
import { FloatingIsland } from './components/models/Island'
import { LargeClouds } from './components/models/LargeClouds'
import { SmallClouds } from './components/models/SmallClouds'
import * as THREE from 'three'
import { FlagPost } from './components/permThreeComponents/FlagPost'
import { Grass } from './components/models/Grass'
import { CourseTwoWalls } from './components/holeTwo/CourseTwoWalls'
import { Windmill } from './components/models/Windmill'
import { FloatingIslandRoundSecond } from './components/models/FloatingIslandRoundSecond'
import { Ramp } from './components/models/Ramp'
import { Train } from './components/models/TrainLoader'
import { CourseThreeWalls } from './components/holeThree/CourseThreeWalls'
import { RopeBridge } from './components/models/RopeBridge'
import { FloatingIslandRoundThird } from './components/models/FloatingIslandRoundThird'
import { WindmillBlades } from './components/models/WindmillBlades'
import { RoundTreeOne } from './components/models/RoundTreeOne'
import { RoundTreeTwo } from './components/models/RoundTreeTwo'
import { RoundTreeThree } from './components/models/RoundTreeThree'
import { PineTreeOne } from './components/models/PineTreeOne'
import { PineTreeTwo } from './components/models/PineTreeTwo'
import { PineTreeThree } from './components/models/PineTreeThree'
import { FenceShort } from './components/models/FenceShort'
import { RampInvis } from './components/models/RampInvis'
import { TrainTrack } from './components/models/TrainTrack'

extend({ TextGeometry })
declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>
  }
}

/**
 * Props for the Scene component.
 *
 * @typedef {Object} SceneProps
 * @extends RigidBodyProps
 * @property {(() => void)} onHit - Function passed into Scene that is passed onto the GolfBall.
 */
interface SceneProps {
  startGame: boolean
  onHit: () => void
  holeTracker: number
  progressNextHole: () => void
}

/**
 * Scene component.
 *
 * This returns all Models in their given positions and a camera to move around.
 *
 * @param {GolfBallProps} Props - The properties for the Scene component.
 * @returns {JSX.Element} The rendered Scene component.
 */
export const Scene: FC<SceneProps> = ({
  startGame,
  onHit,
  holeTracker,
  progressNextHole,
}) => {
  const largeCloudsRef = useRef<Group<Object3DEventMap>>(null!)
  const smallCloudsRef = useRef<Group<Object3DEventMap>>(null!)
  const skyCloudsRef = useRef<Group<Object3DEventMap>>(null!)

  useFrame(({ clock }) => {
    if (largeCloudsRef.current) {
      largeCloudsRef.current.position.set(
        5 * Math.sin(clock.getElapsedTime() / 20),
        -Math.cos(clock.getElapsedTime() / 20),
        -10 * Math.sin(clock.getElapsedTime() / 25)
      )
    }
    if (smallCloudsRef.current) {
      smallCloudsRef.current.position.set(
        -10 * Math.cos(clock.getElapsedTime() / 20),
        -2.2 * Math.cos(clock.getElapsedTime() / 28),
        10 + Math.sin(clock.getElapsedTime()) / 30
      )
      smallCloudsRef.current.rotation.set(
        -0.08 * Math.sin(clock.getElapsedTime() / 5),
        -0.28 * Math.sin(clock.getElapsedTime() / 55),
        -0.18 * Math.cos(clock.getElapsedTime() / 20)
      )
    }
    if (skyCloudsRef.current) {
      skyCloudsRef.current.position.set(
        -0.8 * Math.sin(clock.getElapsedTime()),
        -0.002 * Math.sin(clock.getElapsedTime()),
        1.5 * Math.cos(clock.getElapsedTime())
      )
      skyCloudsRef.current.rotation.set(
        -0.08 * Math.sin(clock.getElapsedTime() / 10),
        0,
        -0.08 * Math.sin(clock.getElapsedTime() / 20)
      )
    }
  })

  const [grassCount, _] = useState<number>(Math.floor(Math.random() * 20) + 5)

  return (
    <>
      {startGame && (
        <GolfBall
          onHit={onHit}
          holeNumber={holeTracker}
          onPotBallChangeInfo={progressNextHole}
        />
      )}

      {layoutNonTouchableEnvironement(
        largeCloudsRef,
        smallCloudsRef,
        skyCloudsRef,
        grassCount
      )}

      {layoutCourseOneMap(progressNextHole)}

      {layoutCourseTwoMap(progressNextHole)}

      {layoutCourseThreeMap(progressNextHole)}
    </>
  )
}

/**
 * Non Interactive models
 *
 * This returns all Models that are constant in the game
 *
 * @param {Ref<Group<Object3DEventMap>>} largeCloudsRef - The properties for the Scene component.
 * @param {Ref<Group<Object3DEventMap>>} smallCloudsRef - The properties for the Scene component.
 * @param {Ref<Group<Object3DEventMap>>} skyCloudsRef - The properties for the Scene component.
 * @returns {JSX.Element} The Non Interactive models.
 */
const layoutNonTouchableEnvironement = (
  largeCloudsRef: Ref<Group<Object3DEventMap>>,
  smallCloudsRef: Ref<Group<Object3DEventMap>>,
  skyCloudsRef: Ref<Group<Object3DEventMap>>,
  grassCount: number
): JSX.Element => {
  const colorMap = useLoader(TextureLoader, '/img/Sky2.jpg')

  return (
    <>
      <mesh position={[0, -80, 0]}>
        <sphereGeometry args={[500, 32, 32]} />
        <meshStandardMaterial map={colorMap} side={THREE.BackSide} />
      </mesh>
      <directionalLight
        position={[260, 285, -102]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024 * 6, 1024 * 6]}
        shadow-camera-near={0.5}
        shadow-camera-far={20000}
        shadow-camera-left={-366}
        shadow-camera-right={366}
        shadow-camera-top={366}
        shadow-camera-bottom={-366}
      />
      <ambientLight
        shadow={'white'}
        position={[0, 40, 0]}
        scale={[20, 20, 20]}
        intensity={1.5}
      />
      <group ref={largeCloudsRef}>
        <LargeClouds
          scale={[20, 20, 20]}
          position={[-28, 18, 48]}
          rotation={[Math.PI / 64, (Math.PI / 64) * 22, 0]}
        />
      </group>
      <group ref={smallCloudsRef}>
        <SmallClouds
          scale={[28, 20, 20]}
          position={[18, -18, 68]}
          rotation={[0, (Math.PI / 64) * 24, 0]}
        />
      </group>
      <group ref={skyCloudsRef}>
        <SmallClouds scale={[28, 20, 20]} position={[24, 16, 40]} />
      </group>
      <RigidBody colliders={'cuboid'} type='fixed' name='level-bottom'>
        <Plane
          scale={[1000, 1000, 20]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -70, 0]}
        >
          <meshStandardMaterial transparent={true} opacity={0} />
        </Plane>
      </RigidBody>

      <RigidBody colliders={'trimesh'} type='fixed' name='floor'>
        <FloatingIsland
          scale={[30, 30, 30]}
          position={[-2, -30, 20]}
          rotation={[0, 0, Math.PI / 256]}
        />
        <FloatingIslandRoundSecond
          scale={[23, 30, 23]}
          position={[-62, -26.5, -48]}
          rotation={[0, (Math.PI / 64) * 17, 0]}
        />
        <FloatingIslandRoundThird scale={[45, 30, 45]} position={[122, -30, -52]} />
        <Windmill
          position={[-52, -3, -39.5]}
          scale={[4.5, 4.5, 4.5]}
          rotation={[0, (Math.PI / 64) * -46, 0]}
        />
        <RopeBridge
          position={[54, -14.7, -25.6]}
          scale={[0.0000138, 0.000018, 0.000018]}
          rotation={[Math.PI / -2, 0, (Math.PI / 64) * 8]}
        />
        <mesh
          scale={[75, 2, 6.5]}
          position={[50, -0.95, -24]}
          rotation={[0, (Math.PI / 64) * 7.8, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial opacity={0} transparent={true} />
        </mesh>
        <Ramp
          position={[-25.5, 4.6, -18]}
          scale={[3, 2.9, 2.7]}
          rotation={[(Math.PI / 64) * 33, (Math.PI / 64) * -1.5, (Math.PI / 64) * 14]}
        />
        <RampInvis
          position={[-25.8, -0.05, -18.5]}
          scale={[3, 2.9, 2.7]}
          rotation={[0, (Math.PI / 64) * 50, 0]}
        />
      </RigidBody>

      {/* LHS */}
      <RoundTreeOne scale={[3.3, 3.3, 3.3]} position={[18, 0, 8]} />
      <RoundTreeTwo scale={[4.2, 4.2, 4.2]} position={[14, 0, 5]} />
      <RoundTreeThree
        scale={[3.7, 3.7, 3.7]}
        position={[17, 0, 15]}
        rotation={[0, (Math.PI / 64) * 23, 0]}
      />
      <Grass
        scale={[0.012, 0.012, 0.012]}
        rotation={[0, (Math.PI / 64) * 54, 0]}
        position={[20, 0.4, 5]}
      />
      <Grass
        scale={[0.011, 0.011, 0.011]}
        rotation={[0, (Math.PI / 64) * 12, 0]}
        position={[18, 0.4, 7]}
      />
      <Grass
        scale={[0.01, 0.01, 0.01]}
        rotation={[0, (Math.PI / 64) * 32, 0]}
        position={[24, 0.4, 2]}
      />
      <Grass
        scale={[0.0115, 0.0115, 0.0115]}
        rotation={[0, (Math.PI / 64) * 41, 0]}
        position={[19, 0.4, 0]}
      />
      <Grass
        scale={[0.01, 0.01, 0.01]}
        rotation={[0, (Math.PI / 64) * 4, 0]}
        position={[17, 0.4, 3]}
      />

      {/* Behind */}
      <PineTreeOne scale={[2.7, 2.7, 2.7]} position={[-9.2, 0.4, -9]} />
      <PineTreeTwo scale={[2.7, 2.7, 2.7]} position={[-7.2, -3.2, -6]} />
      <PineTreeThree scale={[3.2, 3.2, 3.2]} position={[-3.5, 0, -8]} />
      <Grass
        scale={[0.01, 0.01, 0.01]}
        position={[-4, 0.4, -10]}
        rotation={[0, (Math.PI / 64) * 12, 0]}
      />
      <Grass
        scale={[0.015, 0.015, 0.015]}
        position={[1, 0.4, -13]}
        rotation={[0, (Math.PI / 64) * 41, 0]}
      />
      <Grass
        scale={[0.01, 0.01, 0.01]}
        position={[-4.6, 0.4, -12.4]}
        rotation={[0, (Math.PI / 64) * 31, 0]}
      />
      <Grass
        scale={[0.012, 0.012, 0.012]}
        position={[4, 0.4, -16]}
        rotation={[0, (Math.PI / 64) * 24, 0]}
      />
      <Grass
        scale={[0.01, 0.01, 0.01]}
        position={[3, 0.4, -10]}
        rotation={[0, (Math.PI / 64) * 19, 0]}
      />
      <Grass
        scale={[0.012, 0.012, 0.012]}
        position={[-1, 0.4, -9.7]}
        rotation={[0, (Math.PI / 64) * 48, 0]}
      />

      {/* RHS */}
      <PineTreeOne scale={[2.7, 2.7, 2.7]} position={[-32, 0.4, 16]} />
      <PineTreeOne scale={[2.7, 2.7, 2.7]} position={[-26, 0.4, 22]} />
      <PineTreeTwo scale={[2.7, 2.7, 2.7]} position={[-28, 0.4, 22]} />
      <RoundTreeOne scale={[3.3, 3.3, 3.3]} position={[-18, 0.4, 14]} />
      <RoundTreeTwo scale={[4.2, 4.2, 4.2]} position={[-35, 0.4, 16]} />
      <Grass
        scale={[0.01, 0.01, 0.01]}
        position={[-13, 0.4, 16]}
        rotation={[0, (Math.PI / 64) * 39, 0]}
      />
      <Grass
        scale={[0.015, 0.015, 0.015]}
        position={[-16, 0.4, 12]}
        rotation={[0, (Math.PI / 64) * 16, 0]}
      />
      <Grass
        scale={[0.015, 0.015, 0.015]}
        position={[-18, 0.4, 10]}
        rotation={[0, (Math.PI / 64) * 63, 0]}
      />
      <Grass
        scale={[0.012, 0.012, 0.012]}
        position={[-25, 0.4, 8]}
        rotation={[0, (Math.PI / 64) * 49, 0]}
      />
      <Grass
        scale={[0.01, 0.01, 0.01]}
        position={[-22, 0.4, 10]}
        rotation={[0, (Math.PI / 64) * 50, 0]}
      />
      <Grass
        scale={[0.01, 0.01, 0.01]}
        position={[-20, 0.4, 16]}
        rotation={[0, (Math.PI / 64) * 94, 0]}
      />

      <Train initialPos={new Vector3(121.8, 1.5, -51.8)} />

      <TrainTrack position={[121.8, 0.1, -51.8]} scale={[1.75, 1, 1.75]} />

      <WindmillBlades />
    </>
  )
}

/**
 * Layout for Course One
 *
 * This returns all models relevant to Course One
 *
 * @returns {JSX.Element} The Course One models.
 */
const layoutCourseOneMap = (onPotBall: () => void) => {
  return (
    <>
      <FlagPost
        initialPos={new Vector3(10.1, -14, 46.4)}
        rotation={[0, (Math.PI / 64) * 24, 0]}
        onPotBall={onPotBall}
        holeNumber={1}
      />

      <CourseOneWalls />

      <SignPostPointRight
        scale={[6, 8, 6]}
        position={[6, -1, 8]}
        rotation={[0.4, (Math.PI / 32) * 22, 0]}
      />
    </>
  )
}

/**
 * Layout for Course Two
 *
 * This returns all models relevant to Course Two
 *
 * @returns {JSX.Element} The Course Two models.
 */
const layoutCourseTwoMap = (onPotBall: () => void) => {
  return (
    <>
      <FlagPost
        initialPos={new Vector3(-58.2, 3, -44.6)}
        rotation={[0, (Math.PI / 64) * 54, 0]}
        scale={[1.15, 1.15, 1.15]}
        onPotBall={onPotBall}
        holeNumber={2}
      />

      <CourseTwoWalls />
    </>
  )
}

/**
 * Layout for Course Three
 *
 * This returns all models relevant to Course Three
 *
 * @returns {JSX.Element} The Course Three models.
 */
const layoutCourseThreeMap = (onPotBall: () => void) => {
  return (
    <>
      <FlagPost
        initialPos={new Vector3(122, -0.5, -51.8)}
        scale={[1.25, 1.25, 1.25]}
        rotation={[0, (Math.PI / 64) * 54, 0]}
        onPotBall={onPotBall}
        holeNumber={3}
      />

      <CourseThreeWalls />
    </>
  )
}
