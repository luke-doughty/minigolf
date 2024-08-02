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

export function SignPostPointLeft(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/SignPost.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pfosten3.geometry}
        material={materials.Holz4}
        position={[0.008, 0.445, -1.818]}
        rotation={[0, 0.118, -Math.PI]}
        scale={-1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Schild.geometry}
        material={materials.Wegweiser1}
        position={[0.083, 0.955, -1.878]}
        rotation={[-0.105, 0.022, -3.113]}
        scale={-1}
      />
    </group>
  )
}

useGLTF.preload('/signpost.glb')
