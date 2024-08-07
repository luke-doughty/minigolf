/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Node: THREE.Mesh
  }
  materials: {
    mat21: THREE.MeshStandardMaterial
  }
}

export function SmallClouds(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Clouds.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node.geometry}
        material={materials.mat21}
      />
    </group>
  )
}

useGLTF.preload('/Clouds.glb')
