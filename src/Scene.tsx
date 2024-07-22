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
}

/**
 * Scene component.
 *
 * This returns all Models in their given positions and a camera to move around.
 *
 * @param {GolfBallProps} Props - The properties for the Scene component.
 * @returns {JSX.Element} The rendered Scene component.
 */
export const Scene: FC<SceneProps> = ({ startGame, onHit }) => {
  const largeCloudsRef = useRef<Group<Object3DEventMap>>(null!)
  const smallCloudsRef = useRef<Group<Object3DEventMap>>(null!)
  const skyCloudsRef = useRef<Group<Object3DEventMap>>(null!)

  useFrame(({ clock }) => {
    if (largeCloudsRef.current) {
      largeCloudsRef.current.position.set(
        Math.sin(clock.getElapsedTime()),
        -Math.cos(clock.getElapsedTime()),
        -Math.sin(clock.getElapsedTime()) ^ -5
      )
    }
    if (smallCloudsRef.current) {
      smallCloudsRef.current.position.set(
        -2 * Math.cos(clock.getElapsedTime()),
        0.8 * Math.sin(clock.getElapsedTime()),
        -Math.cos(clock.getElapsedTime()) ^ 5
      )
    }
    if (skyCloudsRef.current) {
      skyCloudsRef.current.position.set(
        -0.8 * Math.sin(clock.getElapsedTime()),
        -0.002 * Math.sin(clock.getElapsedTime()),
        1.5 * Math.cos(clock.getElapsedTime())
      )
    }
  })

  return (
    <>
      {startGame && <GolfBall onHit={onHit} />}

      {layoutNonTouchableEnvironement(largeCloudsRef, smallCloudsRef, skyCloudsRef)}

      {layoutCourseOneMap()}
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

  return (
    <>
      <mesh position={[0, -60, 0]}>
        <sphereGeometry args={[300, 32, 32]} />
        <meshStandardMaterial map={colorMap} side={THREE.BackSide} />
      </mesh>
      <directionalLight
        position={[20, 15, -10]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        shadow-camera-near={0.5}
        shadow-camera-far={66}
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
          position={[-15, 12, 60]}
          rotation={[Math.PI / 64, (Math.PI / 64) * 22, 0]}
        />
      </group>
      <group ref={smallCloudsRef}>
        <SmallClouds scale={[28, 20, 20]} position={[20, -28, 70]} />
      </group>
      <group ref={skyCloudsRef}>
        <SmallClouds scale={[28, 20, 20]} position={[20, 18, 70]} />
      </group>
      <RigidBody colliders={'cuboid'} type='fixed' name='level-bottom'>
        <Plane
          scale={[500, 500, 20]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -70, 0]}
        >
          <meshStandardMaterial transparent={true} opacity={0} />
        </Plane>
      </RigidBody>
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
const layoutCourseOneMap = () => {
  const grassCount = Math.floor(Math.random() * 30) + 20 // Random number between 20 and 50

  const grassArrayLeft = Array.from({ length: grassCount })
  const grassArrayRight = Array.from({ length: grassCount })

  return (
    <>
      <RigidBody colliders={'trimesh'} type='fixed' name='floor' friction={30}>
        <FloatingIsland scale={[30, 30, 30]} position={[-2, -30, 20]} />
      </RigidBody>
      <FlagPost
        initialPos={new Vector3(7, -15, 50)}
        rotation={[0, (Math.PI / 64) * 24, 0]}
      />

      <CourseOneWalls />

      <SignPostPointRight
        scale={[6, 8, 6]}
        position={[8, -1, 2]}
        rotation={[0.4, (Math.PI / 32) * 22, 0]}
      />
      <SquareTree
        scale={[6.5, 8.5, 6.5]}
        position={[18, 0, 6]}
        rotation={[0, (Math.PI / 64) * 72, 0]}
      />

      
      {/* left grass */}
      {grassArrayLeft.map((_, index) => (
        <Grass
          scale={[0.01, 0.01, 0.01]}
          rotation={[0, (Math.PI / 64) * (Math.random() * 24), 0]}
          position={[
            Math.floor(Math.random() * 16) + 6,
            0.4,
            Math.floor(Math.random() * 20) - 10,
          ]}
        />
      ))}

      {/* right grass */}

      {grassArrayRight.map((_, index) => (
        <Grass
          scale={[0.01, 0.01, 0.01]}
          rotation={[0, (Math.PI / 64) * (Math.random() * 24), 0]}
          position={[
            Math.floor(Math.random() * -14) - 8,
            0.4,
            Math.floor(Math.random() * 28) - 10,
          ]}
        />
      ))}
    </>
  )
}
