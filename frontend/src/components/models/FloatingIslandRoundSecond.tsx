/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    IslandSmall_1: THREE.Mesh
    IslandSmall_2: THREE.Mesh
  }
  materials: {
    grass: THREE.MeshStandardMaterial
    dirt: THREE.MeshStandardMaterial
  }
}

export function FloatingIslandRoundSecond(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/FloatingIsland2.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.IslandSmall_1.geometry}
          material={materials.grass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.IslandSmall_2.geometry}
          material={materials.dirt}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Floating_island_2.glb')
