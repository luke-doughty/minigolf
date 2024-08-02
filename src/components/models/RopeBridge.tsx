/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object1: THREE.Mesh
    Object2: THREE.Mesh
    Object3: THREE.Mesh
    Object4: THREE.Mesh
  }
  materials: {
    woodTop: THREE.MeshStandardMaterial
    wood1: THREE.MeshStandardMaterial
    visse: THREE.MeshStandardMaterial
    rope: THREE.MeshStandardMaterial
  }
}

export function RopeBridge(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/RopeBridge.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object1.geometry}
        material={materials.woodTop}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object2.geometry}
        material={materials.wood1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object3.geometry}
        material={materials.visse}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object4.geometry}
        material={materials.rope}
      />
    </group>
  )
}

useGLTF.preload('/rope bridge.glb')
