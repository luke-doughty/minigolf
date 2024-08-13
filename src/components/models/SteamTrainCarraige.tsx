/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    BackWheels: THREE.Mesh
    FrontWheels: THREE.Mesh
    Locomotive_PassengerWagon001_1: THREE.Mesh
    Locomotive_PassengerWagon001_2: THREE.Mesh
    Locomotive_PassengerWagon001_3: THREE.Mesh
    Locomotive_PassengerWagon001_4: THREE.Mesh
    Locomotive_PassengerWagon001_5: THREE.Mesh
    Locomotive_PassengerWagon001_6: THREE.Mesh
  }
  materials: {
    ['Black.001']: THREE.MeshStandardMaterial
    ['Windows.001']: THREE.MeshStandardMaterial
    ['LightWood.001']: THREE.MeshStandardMaterial
    ['Red.001']: THREE.MeshStandardMaterial
    ['Green.001']: THREE.MeshStandardMaterial
    ['DarkGreen.001']: THREE.MeshStandardMaterial
    ['Grey.002']: THREE.MeshStandardMaterial
  }
}

export function SteamTrainCarriage(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/SteamTrainCarriage.glb') as GLTFResult
  return (
    <group {...props} dispose={null} scale={[40, 40, 40]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BackWheels.geometry}
        material={materials['Black.001']}
        position={[2.61, 0.298, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontWheels.geometry}
        material={materials['Black.001']}
        position={[-2.588, 0.298, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Locomotive_PassengerWagon001_1.geometry}
          material={materials['Windows.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Locomotive_PassengerWagon001_2.geometry}
          material={materials['LightWood.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Locomotive_PassengerWagon001_3.geometry}
          material={materials['Red.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Locomotive_PassengerWagon001_4.geometry}
          material={materials['Green.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Locomotive_PassengerWagon001_5.geometry}
          material={materials['DarkGreen.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Locomotive_PassengerWagon001_6.geometry}
          material={materials['Grey.002']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/SteamTrainCarriage.glb')