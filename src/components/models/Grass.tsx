/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['grass_01_Plane001-Mesh']: THREE.Mesh
    ['grass_01_Plane001-Mesh_1']: THREE.Mesh
  }
  materials: {
    ['4CAF50']: THREE.MeshStandardMaterial
    ['8BC34A']: THREE.MeshStandardMaterial
  }
}

export function Grass(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Grass.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['grass_01_Plane001-Mesh'].geometry}
        material={materials['4CAF50']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['grass_01_Plane001-Mesh_1'].geometry}
        material={materials['8BC34A']}
      />
    </group>
  )
}

useGLTF.preload('/Grass.glb')
