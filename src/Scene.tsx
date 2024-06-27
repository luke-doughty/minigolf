import {
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  Sphere,
  Text,
  Text3D,
} from '@react-three/drei'
import { Object3DNode, useFrame, useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'
import {
  BoxGeometry,
  Fog,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MOUSE,
  Object3D,
  Object3DEventMap,
  Raycaster,
} from 'three'
import { GolfBall } from './components/golfBall'
import { Plane } from './components/Plane'
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { CourseOneWalls } from './components/CourseOneWalls'
import { PowerMeter } from './components/PowerMeter'
import { SignPostMultiDirection } from './components/SignPostMultiDirection'
import { SignPostPointLeft } from './components/SignPostPointLeft'
import { SignPostPointRight } from './components/SignPostPointRight'
import { FloatingIsland } from './components/Island'
import { LargeClouds } from './components/LargeClouds'
import { SmallClouds } from './components/SmallClouds'

extend({ TextGeometry })
declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>
  }
}

function Scene() {
  const largeCloudsRef = useRef<Group<Object3DEventMap>>(null!)
  const smallCloudsRef = useRef<Group<Object3DEventMap>>(null!)
  const skyCloudsRef = useRef<Group<Object3DEventMap>>(null!)

  useFrame(({ raycaster, clock }) => {
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
      <directionalLight
        position={[70, 100, 400]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        shadow-camera-near={0.5} // Set the near plane of the shadow camera
        shadow-camera-far={50} // Set the far plane of the shadow camera
        shadow-camera-left={-50} // Extend the left boundary of the shadow camera frustum
        shadow-camera-right={50} // Extend the right boundary of the shadow camera frustum
        shadow-camera-top={50} // Extend the top boundary of the shadow camera frustum
        shadow-camera-bottom={-50} // Extend the bottom boundary of the shadow camera frustum
      />
      <directionalLight
        position={[5, 15, -5]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        shadow-camera-near={0.5} // Set the near plane of the shadow camera
        shadow-camera-far={50} // Set the far plane of the shadow camera
        shadow-camera-left={-50} // Extend the left boundary of the shadow camera frustum
        shadow-camera-right={50} // Extend the right boundary of the shadow camera frustum
        shadow-camera-top={50} // Extend the top boundary of the shadow camera frustum
        shadow-camera-bottom={-50} // Extend the bottom boundary of the shadow camera frustum
      />
      <ambientLight
        shadow={'blue'}
        position={[10, 10, 10]}
        scale={[20, 20, 20]}
        intensity={2.2}
      />
      <OrbitControls />
      <RigidBody colliders={'trimesh'} type='fixed' name='floor'>
        <FloatingIsland scale={[30, 30, 30]} position={[-2, -30, 20]} />
      </RigidBody>

      <group ref={largeCloudsRef}>
        <LargeClouds
          scale={[20, 20, 20]}
          position={[5, -38, 10]}
          rotation={[0, Math.PI / 8, 0]}
        />
      </group>
      <group ref={smallCloudsRef}>
        <SmallClouds scale={[28, 20, 20]} position={[20, -28, 70]} />
      </group>

      <group ref={skyCloudsRef}>
        <SmallClouds scale={[28, 20, 20]} position={[20, 18, 70]} />
      </group>
      {performance && <Perf position='top-left' />}

      <CourseOneWalls />

      <GolfBall />

      <SignPostPointRight
        scale={[6, 8, 6]}
        position={[8, -1, 2]}
        rotation={[0.4, (Math.PI / 32) * 22, 0]}
      />
    </>
  )
}

export { Scene }
