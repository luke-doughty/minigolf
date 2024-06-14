import { OrbitControls, Text, Text3D } from '@react-three/drei'
import { Object3DNode, useFrame, useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D, Raycaster } from 'three'
import { GolfBall } from './components/golfBall'
import { Plane } from './components/Plane'
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { CourseOneWalls } from './components/CourseOneWalls'
import { PowerMeter } from './components/PowerMeter'

extend({ TextGeometry })
declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>
  }
}

function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })
  const [o] = useState(() => new Object3D())

  useFrame((_, delta) => {})

  const cubeRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null)

  const ray = new Raycaster()

  return (
    <>
      {/* <OrbitControls /> */}
      {performance && <Perf position='top-left' />}

      <directionalLight
        position={[-5, 5, 8]}
        intensity={3.5}
        castShadow
        target={o}
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      >
        <orthographicCamera attach='shadow-camera' args={[-20, 20, 20, -20]} />
      </directionalLight>

      <CourseOneWalls />

      <GolfBall />

      <Text3D
        font={'/Lobster_Regular.json'}
        scale={[5.5, 5.5, 5.5]}
        position={[-5, 1, -15]}
        castShadow
        rotation-y={-(Math.PI / 64) * 16}
        curveSegments={24}
        bevelSegments={1}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.03}
        receiveShadow
      >
        Hello
        <meshBasicMaterial color='blue' />
      </Text3D>
      <Plane />
    </>
  )
}

export { Scene }
