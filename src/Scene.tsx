import { OrbitControls, Text, Text3D } from '@react-three/drei'
import { Object3DNode, useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Cube } from './components/Cube'
import { GolfBall } from './components/golfBall'
import { Plane } from './components/Plane'
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

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

  const cubeRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null)

  useFrame((_, delta) => {})

  return (
    <>
      {performance && <Perf position='top-left' />}

      <OrbitControls />
      <ambientLight />
      <directionalLight
        position={[-15, 22, 8]}
        scale={[5, 5, 5]}
        intensity={3.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />

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
      >
        Hello
        <meshBasicMaterial color='blue' />
      </Text3D>
      <Plane />
    </>
  )
}

export { Scene }
