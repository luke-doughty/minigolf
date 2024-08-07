/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
    Circle: THREE.Mesh
    Pfosten3: THREE.Mesh
    Schild: THREE.Mesh
    Schild1: THREE.Mesh
    Schild3: THREE.Mesh
    Pfoten1: THREE.Mesh
    Schild2: THREE.Mesh
    Pfosten2: THREE.Mesh
    Schild_2: THREE.Mesh
  }
  materials: {
    Clay: THREE.MeshBasicMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    Holz4: THREE.MeshStandardMaterial
    Wegweiser1: THREE.MeshStandardMaterial
    Wegweiser3: THREE.MeshStandardMaterial
    Wegweiser2: THREE.MeshStandardMaterial
  }
}

export function SignPostMultiDirection(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/SignPost.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Schild1.geometry}
        material={materials.Wegweiser1}
        position={[0.096, 1.01, -0.88]}
        rotation={[-0.106, -0.081, -0.009]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Schild3.geometry}
        material={materials.Wegweiser3}
        position={[0.1, 1.518, -0.928]}
        rotation={[-0.106, 0.069, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pfoten1.geometry}
        material={materials.Holz4}
        position={[0.003, 0.587, -0.885]}
        rotation={[0, -0.194, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Schild2.geometry}
        material={materials.Wegweiser2}
        position={[0.093, 1.268, -0.839]}
        rotation={[2.962, 0.235, 0.043]}
      />
    </group>
  )
}

useGLTF.preload('/signpost.glb')
