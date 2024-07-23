/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Obstacle_Booster_02: THREE.Mesh
  }
  materials: {
    ['Obstacles_Booster_01.png']: THREE.MeshStandardMaterial
  }
}

export function BoosterRamp(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/Booster Ramp.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Obstacle_Booster_02.geometry}
        material={materials['Obstacles_Booster_01.png']}
      />
    </group>
  )
}

useGLTF.preload('/Booster Ramp.glb')
