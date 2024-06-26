import { OrbitControls, RandomizedLight, Sphere, Text, Text3D } from '@react-three/drei'
import { Object3DNode, useFrame, useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'
import {
  BoxGeometry,
  Fog,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MOUSE,
  Object3D,
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

extend({ TextGeometry })
declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>
  }
}

function Scene() {
  return (
    <>
      <fog attach='fog' color={'#abe8ed'} near={20} far={120} />
      <directionalLight
        position={[10, 10, 10]}
        scale={[20, 20, 20]}
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
        intensity={1.2}
      />

      {performance && <Perf position='top-left' />}

      <CourseOneWalls />

      <GolfBall />
      <SignPostMultiDirection
        scale={[5, 5, 5]}
        position={[1, 2, 50]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <SignPostPointLeft
        scale={[5, 5, 5]}
        position={[1, 2, 50]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <SignPostPointRight
        scale={[5, 5, 5]}
        position={[1, 2, 50]}
        rotation={[0, Math.PI / 2, 0]}
      />

      <Text3D
        font={'/Lobster_Regular.json'}
        scale={[5.5, 5.5, 5.5]}
        position={[-20, 1, -5]}
        castShadow
        rotation-y={(Math.PI / 64) * 4}
        curveSegments={24}
        bevelSegments={1}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.03}
        receiveShadow
      >
        Test
        <meshStandardMaterial color={'#87530F'} clipShadows={true} />
      </Text3D>
      <Plane />
    </>
  )
}

export { Scene }
