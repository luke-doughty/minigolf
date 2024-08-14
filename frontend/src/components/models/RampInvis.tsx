import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
  }
  materials: {}
}

export function RampInvis(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/RampInvis.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        position={[0.18, 1.269, 0]}
        scale={[3.097, 1.254, 1.386]}
      >
        <meshStandardMaterial transparent={true} opacity={0} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/RampInvis.glb')
