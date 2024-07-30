import { Plane } from '@react-three/drei'
import { Object3DNode, useFrame, useLoader } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { FC, Ref, useRef } from 'react'
import { Group, Object3DEventMap, TextureLoader, Vector3 } from 'three'
import { GolfBall } from './components/permThreeComponents/golfBall'
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { CourseOneWalls } from './components/holeOne/CourseOneWalls'
import { SignPostPointRight } from './components/models/SignPostPointRight'
import { FloatingIsland } from './components/models/Island'
import { LargeClouds } from './components/models/LargeClouds'
import { SmallClouds } from './components/models/SmallClouds'
import * as THREE from 'three'
import { FlagPost } from './components/permThreeComponents/FlagPost'
import { SquareTree } from './components/models/SquareTree'
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
  const trainRef = useRef<Group<Object3DEventMap>>(null!)

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

  return (
    <>
      {startGame && (
        <GolfBall
          onHit={onHit}
          holeNumber={holeTracker}
          onPotBallChangeInfo={progressNextHole}
        />
      )}

      {layoutNonTouchableEnvironement(largeCloudsRef, smallCloudsRef, skyCloudsRef)}

      {layoutCourseOneMap(progressNextHole)}

      {layoutCourseTwoMap(progressNextHole, holeTracker >= 2)}

      {layoutCourseThreeMap(progressNextHole, holeTracker >= 3)}
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
  skyCloudsRef: Ref<Group<Object3DEventMap>>
): JSX.Element => {
  const colorMap = useLoader(TextureLoader, 'sky2.jpg')

  const grassCount = Math.floor(Math.random() * 20) + 5 // Random number between 10 and 30

  const grassArrayLeft = Array.from({ length: grassCount })
  const grassArrayRight = Array.from({ length: grassCount })
  const grassArrayBehind = Array.from({ length: grassCount })

  return (
    <>
      <mesh position={[0, -80, 0]}>
        <sphereGeometry args={[500, 32, 32]} />
        <meshStandardMaterial map={colorMap} side={THREE.BackSide} />
      </mesh>
      <directionalLight
        position={[20, 25, -12]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024 * 6, 1024 * 6]}
        shadow-camera-near={0.5}
        shadow-camera-far={20000}
        shadow-camera-left={-66}
        shadow-camera-right={66}
        shadow-camera-top={66}
        shadow-camera-bottom={-66}
      />
      <ambientLight
        shadow={'blue'}
        position={[10, 10, 10]}
        scale={[20, 20, 20]}
        intensity={1.8}
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
          position={[50, -14.7, -24]}
          scale={[0.0000133, 0.000018, 0.000018]}
          rotation={[Math.PI / -2, 0, (Math.PI / 64) * 8]}
        />
        <Ramp
          position={[-25, 3.8, -18]}
          scale={[3, 2.4, 2.7]}
          rotation={[(Math.PI / 64) * 36, (Math.PI / 64) * -5, (Math.PI / 64) * 14.4]}
        />
      </RigidBody>

      {/* square tree doesnt really fit vibe */}
      <SquareTree
        scale={[6.5, 6.5, 6.5]}
        position={[18, 0, 6]}
        rotation={[0, (Math.PI / 64) * 72, 0]}
      />

      {/* TODO: scale back grass  */}
      {/* left grass */}
      {grassArrayLeft.map((_, index) => (
        <Grass
          key={'grass_left_' + index}
          scale={[0.01, 0.01, 0.01]}
          rotation={[0, (Math.PI / 64) * (Math.random() * 24), 0]}
          position={[
            Math.floor(Math.random() * 16) + 6,
            0.4,
            Math.floor(Math.random() * 12),
          ]}
        />
      ))}

      {grassArrayRight.map((_, index) => (
        <Grass
          key={'grass_right_' + index}
          scale={[0.01, 0.01, 0.01]}
          rotation={[0, (Math.PI / 64) * (Math.random() * 24), 0]}
          position={[
            Math.floor(Math.random() * -15) - 8,
            0.4,
            Math.floor(Math.random() * 16),
          ]}
        />
      ))}

      {/* behind grass */}
      {grassArrayBehind.map((_, index) => (
        <Grass
          key={'grass_behind_' + index}
          scale={[0.01, 0.01, 0.01]}
          rotation={[0, (Math.PI / 64) * (Math.random() * 24), 0]}
          position={[
            Math.floor(Math.random() * 10.5) - 5,
            0.4,
            Math.floor(Math.random() * 11) - 15,
          ]}
        />
      ))}

      <Train initialPos={new Vector3(119, 1.5, -51.8)} />
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
        scale={[7, 9, 7]}
        position={[8, -1, 2]}
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
const layoutCourseTwoMap = (onPotBall: () => void, visible: boolean) => {
  return (
    <>
      <FlagPost
        initialPos={new Vector3(-58.2, 3, -44.6)}
        rotation={[0, (Math.PI / 64) * 54, 0]}
        scale={[1.15, 1.15, 1.15]}
        onPotBall={onPotBall}
        holeNumber={2}
      />

      <CourseTwoWalls visible={visible} />
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
const layoutCourseThreeMap = (onPotBall: () => void, visible: boolean) => {
  return (
    <>
      <FlagPost
        initialPos={new Vector3(122, -0.5, -51.8)}
        scale={[1.25, 1.25, 1.25]}
        rotation={[0, (Math.PI / 64) * 54, 0]}
        onPotBall={onPotBall}
        holeNumber={3}
      />

      <CourseThreeWalls visible={visible} />
    </>
  )
}
