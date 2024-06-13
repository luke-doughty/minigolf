import { Box, OrbitControls, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody, quat } from '@react-three/rapier'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'

import * as THREE from 'three'
import { MegoCube } from './components/golfBall'

export const Experience = () => {
  const [hover, setHover] = useState(false)
  const cube = useRef()
  const [start, setStart] = useState(false)
  const kicker = useRef()
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  return (
    <>
      {performance && <Perf position='top-left' />}

      <OrbitControls makeDefault />

      <directionalLight
        position={[-2, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />

      {/* <RigidBody position={[-2.5, 2, 0]}>
        <Box
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => setStart(true)}
        >
          <meshStandardMaterial color={hover ? 'hotpink' : 'royalblue'} />
        </Box>
      </RigidBody> */}
      <MegoCube />

      <RigidBody type='kinematicPosition' position={[0, 0.75, 0]}>
        <group position={[2.5, 0, 0]}>
          <Box args={[5, 0.5, 0.5]}>
            <meshStandardMaterial color='peachpuff' />
          </Box>
        </group>
      </RigidBody>

      <RigidBody type='fixed' name='floor'>
        <Box position={[0, 0, 0]} args={[10, 1, 10]}>
          <meshStandardMaterial color='springgreen' />
        </Box>
      </RigidBody>
    </>
  )
}
