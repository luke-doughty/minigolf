/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Tree_01: THREE.Mesh
    Tree_02: THREE.Mesh
    Tree_03: THREE.Mesh
    Pine_Tree_03: THREE.Mesh
    Pine_Tree_02: THREE.Mesh
    Pine_Tree_01: THREE.Mesh
  }
  materials: {
    _trees_normal: THREE.MeshStandardMaterial
    ['17___Default']: THREE.MeshStandardMaterial
  }
}

export function PineTreeOne(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/SmallTrees.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pine_Tree_03.geometry}
        material={materials['17___Default']}
      />
    </group>
  )
}

useGLTF.preload('/models/SmallTrees.glb')
