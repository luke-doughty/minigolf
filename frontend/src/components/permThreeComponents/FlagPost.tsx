/*
Import Functionality auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { Cylinder, Sphere, Tube, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyOptions,
  RigidBodyProps,
} from '@react-three/rapier'
import { FC, useMemo, useState } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    Cylinder: THREE.Mesh
    Circle: THREE.Mesh
  }
  materials: {
    ['Material.002']: THREE.MeshPhysicalMaterial
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

/**
 * Props for the FlagPost component.
 *
 * @typedef {Object} FlagPostProps
 * @extends RigidBodyProps
 * @property {Vector3} initialPos - The initial position of the flag post.
 */
interface FlagPostProps extends RigidBodyProps {
  initialPos: Vector3
  onPotBall: () => void
  holeNumber: number
}

/**
 * FlagPost component.
 *
 * This returns a FlagPost Model that can move when an object "golf-ball" is nearby.
 *
 * @param {FlagPostProps} Props - The properties for the FlagPost component.
 * @returns {JSX.Element} The rendered FlagPost component.
 */
export const FlagPost: FC<FlagPostProps> = ({
  initialPos,
  onPotBall,
  holeNumber,
  ...props
}) => {
  useFrame(({ scene }) => {
    const golfBall = scene.getObjectByName('golf-ball')
    const flagPostBoundary = scene.getObjectByName(
      'flag-post-raise-boundary-' + holeNumber
    )
    const wholeFlag = scene.getObjectByName('total-flag-' + holeNumber)

    if (golfBall?.position.x && flagPostBoundary && wholeFlag) {
      const golfBallPos = golfBall.position

      const flagPostBoundaryPos = wholeFlag.position

      const flagPostBoundaryIntersect = new Vector3(0, 0, 0)
      flagPostBoundaryIntersect.subVectors(flagPostBoundaryPos, golfBallPos)
      const distance = Math.sqrt(
        flagPostBoundaryIntersect.x * flagPostBoundaryIntersect.x +
          flagPostBoundaryIntersect.y * flagPostBoundaryIntersect.y +
          flagPostBoundaryIntersect.z * flagPostBoundaryIntersect.z
      )

      if (distance < 10 && wholeFlag) {
        const newRaisedPosition = new Vector3()
        const vectorToAdd = new Vector3(0, 3, 0)
        newRaisedPosition.addVectors(flagPostBoundaryPos, vectorToAdd)
        wholeFlag.position.lerp(newRaisedPosition, 0.05)
      }
      if (distance > 3 && wholeFlag) {
        const newRaisedPosition = new Vector3()
        const vectorToAdd = new Vector3(0, -1.5, 0)
        newRaisedPosition.addVectors(flagPostBoundaryPos, vectorToAdd)
        wholeFlag.position.lerp(initialPos, 0.02)
      }
    }
  })

  const holeSideGeometry = useMemo(() => {
    const extrudeSettings = {
      amount: 4,
      steps: 1,
      depth: 2.2,
      bevelEnabled: true,
      bevelSegments: 1,
      curveSegments: 4,
    }

    const arcShape = new THREE.Shape()
    arcShape.absarc(0, 0, 1.33, 0, Math.PI * 2, false)

    const holePath = new THREE.Path()
    holePath.absarc(0, 0, 1.22, 0, Math.PI * 2, true)

    arcShape.holes.push(holePath)

    return new THREE.ExtrudeGeometry(arcShape, extrudeSettings)
  }, [])

  const holeWallOffsetFromPole = new Vector3(-0.09, 0.45, -0.04)
  const holeBaseOffsetFromPole = new Vector3(-0.09, -1.25, -0.04)
  const holeWallPos = new Vector3().addVectors(initialPos, holeWallOffsetFromPole)
  const holeBasePos = new Vector3().addVectors(initialPos, holeBaseOffsetFromPole)

  const { nodes, materials } = useGLTF('/models/HoleFlagPole.glb') as GLTFResult
  return (
    <>
      <group
        {...props}
        dispose={null}
        name={'total-flag-' + holeNumber}
        position={initialPos}
      >
        <Sphere
          scale={[3, 3, 3]}
          name={'flag-post-raise-boundary-' + holeNumber}
          visible={false}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.002']}
          position={[0, 4, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={materials['Material.001']}
          position={[0, 6.741, -1.497]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.581, 1, 1]}
        />
      </group>
      <mesh
        geometry={holeSideGeometry}
        name={'hole-side-' + holeNumber}
        {...props}
        position={holeWallPos}
        rotation={[Math.PI / 2, (Math.PI / 64) * 0, 0]}
      >
        <meshStandardMaterial color='grey' />
      </mesh>

      <RigidBody colliders={'trimesh'} type='fixed' name={'hole-base-' + holeNumber}>
        <Cylinder
          position={holeBasePos}
          args={[1.2, 1.2, 0.2, 8]}
          name={'hole-position-base-' + holeNumber}
          // I dont know why this works but not with rigid body
        >
          <meshStandardMaterial color={'grey'} />
        </Cylinder>
      </RigidBody>
    </>
  )
}
