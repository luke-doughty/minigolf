/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    RailwayTrack_Curve001_1: THREE.Mesh
    RailwayTrack_Curve001_2: THREE.Mesh
    RailwayTrack_Curve004_1: THREE.Mesh
    RailwayTrack_Curve004_2: THREE.Mesh
    RailwayTrack_Curve005_1: THREE.Mesh
    RailwayTrack_Curve005_2: THREE.Mesh
    RailwayTrack_Curve006_1: THREE.Mesh
    RailwayTrack_Curve006_2: THREE.Mesh
    RailwayTrack_Curve007_1: THREE.Mesh
    RailwayTrack_Curve007_2: THREE.Mesh
    RailwayTrack_Curve008_1: THREE.Mesh
    RailwayTrack_Curve008_2: THREE.Mesh
    RailwayTrack_Curve009_1: THREE.Mesh
    RailwayTrack_Curve009_2: THREE.Mesh
    RailwayTrack_Curve010_1: THREE.Mesh
    RailwayTrack_Curve010_2: THREE.Mesh
    RailwayTrack_Curve011_1: THREE.Mesh
    RailwayTrack_Curve011_2: THREE.Mesh
    RailwayTrack_Curve012_1: THREE.Mesh
    RailwayTrack_Curve012_2: THREE.Mesh
    RailwayTrack_Curve013_1: THREE.Mesh
    RailwayTrack_Curve013_2: THREE.Mesh
    RailwayTrack_Curve014_1: THREE.Mesh
    RailwayTrack_Curve014_2: THREE.Mesh
  }
  materials: {
    ['Wood.001']: THREE.MeshStandardMaterial
    ['Steel.001']: THREE.MeshStandardMaterial
    ['Wood.004']: THREE.MeshStandardMaterial
    ['Steel.004']: THREE.MeshStandardMaterial
    ['Wood.005']: THREE.MeshStandardMaterial
    ['Steel.005']: THREE.MeshStandardMaterial
    ['Wood.006']: THREE.MeshStandardMaterial
    ['Steel.006']: THREE.MeshStandardMaterial
    ['Wood.007']: THREE.MeshStandardMaterial
    ['Steel.007']: THREE.MeshStandardMaterial
    ['Wood.008']: THREE.MeshStandardMaterial
    ['Steel.008']: THREE.MeshStandardMaterial
    ['Wood.009']: THREE.MeshStandardMaterial
    ['Steel.009']: THREE.MeshStandardMaterial
    ['Wood.010']: THREE.MeshStandardMaterial
    ['Steel.010']: THREE.MeshStandardMaterial
    ['Wood.011']: THREE.MeshStandardMaterial
    ['Steel.011']: THREE.MeshStandardMaterial
    ['Wood.012']: THREE.MeshStandardMaterial
    ['Steel.012']: THREE.MeshStandardMaterial
    ['Wood.013']: THREE.MeshStandardMaterial
    ['Steel.013']: THREE.MeshStandardMaterial
    ['Wood.014']: THREE.MeshStandardMaterial
    ['Steel.014']: THREE.MeshStandardMaterial
  }
}

export function TrainTrack(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/RailwayTrackCurve.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[-17.507, 0, -18.127]} rotation={[Math.PI, -1.536, Math.PI]}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve001_1.geometry}
            material={materials['Wood.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve001_2.geometry}
            material={materials['Steel.001']}
          />
        </group>
      </group>
      <group position={[-5.366, 0, -24.601]} rotation={[Math.PI, -0.975, Math.PI]}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve004_1.geometry}
            material={materials['Wood.004']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve004_2.geometry}
            material={materials['Steel.004']}
          />
        </group>
      </group>
      <group position={[8.102, 0, -23.747]} rotation={[Math.PI, -0.437, Math.PI]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve005_1.geometry}
            material={materials['Wood.005']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve005_2.geometry}
            material={materials['Steel.005']}
          />
        </group>
      </group>
      <group position={[19.223, 0, -16.159]} rotation={[-Math.PI, 0.095, -Math.PI]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve006_1.geometry}
            material={materials['Wood.006']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve006_2.geometry}
            material={materials['Steel.006']}
          />
        </group>
      </group>
      <group position={[24.914, 0, -3.734]} rotation={[-Math.PI, 0.66, -Math.PI]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve007_1.geometry}
            material={materials['Wood.007']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve007_2.geometry}
            material={materials['Steel.007']}
          />
        </group>
      </group>
      <group position={[23.156, 0, 9.735]} rotation={[-Math.PI, 1.204, -Math.PI]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve008_1.geometry}
            material={materials['Wood.008']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve008_2.geometry}
            material={materials['Steel.008']}
          />
        </group>
      </group>
      <group position={[14.804, 0, 20.212]} rotation={[0, 1.404, 0]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve009_1.geometry}
            material={materials['Wood.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve009_2.geometry}
            material={materials['Steel.009']}
          />
        </group>
      </group>
      <group position={[2.08, 0, 25.01]} rotation={[0, 0.855, 0]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve010_1.geometry}
            material={materials['Wood.010']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve010_2.geometry}
            material={materials['Steel.010']}
          />
        </group>
      </group>
      <group position={[-11.221, 0, 22.459]} rotation={[0, 0.304, 0]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve011_1.geometry}
            material={materials['Wood.011']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve011_2.geometry}
            material={materials['Steel.011']}
          />
        </group>
      </group>
      <group position={[-21.151, 0, 13.409]} rotation={[0, -0.24, 0]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve012_1.geometry}
            material={materials['Wood.012']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve012_2.geometry}
            material={materials['Steel.012']}
          />
        </group>
      </group>
      <group position={[-25.069, 0, 0.412]} rotation={[0, -0.786, 0]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve013_1.geometry}
            material={materials['Wood.013']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve013_2.geometry}
            material={materials['Steel.013']}
          />
        </group>
      </group>
      <group position={[-24.185, 0, -6.617]} rotation={[0, -1.062, 0]}>
        <group position={[-0.085, 0, 0.013]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve014_1.geometry}
            material={materials['Wood.014']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RailwayTrack_Curve014_2.geometry}
            material={materials['Steel.014']}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/RailwayTrackCurve.glb')