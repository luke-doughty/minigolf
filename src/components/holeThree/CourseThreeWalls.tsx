import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

import { GroupProps } from '@react-three/fiber'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useMemo } from 'react'

type NewType = GroupProps

interface CourseWallsProps extends GroupProps {}

export const CourseThreeWalls: FC<CourseWallsProps> = () => {
  const holeSideGeometry = useMemo(() => {
    const extrudeSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 1,
      curveSegments: 8,
    }

    const arcShape = new THREE.Shape()
    arcShape.absarc(0, 0, 38, 0, Math.PI * 2, false)

    const holePath = new THREE.Path()
    holePath.absarc(0, 0, 37, 0, Math.PI * 2, true)

    arcShape.holes.push(holePath)

    return new THREE.ExtrudeGeometry(arcShape, extrudeSettings)
  }, [])

  return (
    <RigidBody
      type='fixed'
      colliders='trimesh'
      name={'course-three-walls'}
      rotation={[0, (Math.PI / 64) * 7.5, 0]}
    >
      <group>
        <RoundedBox radius={0.02} castShadow position={[16, 1, 0]} scale={[15, 2, 1]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox radius={0.02} castShadow position={[8.5, 1, -3]} scale={[1, 2, 7]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox radius={0.02} castShadow position={[16, 1, -6]} scale={[16, 2, 1]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
      </group>
      <mesh
        geometry={holeSideGeometry}
        position={[129, 1, -6]}
        rotation={[Math.PI / 2, (Math.PI / 64) * 0, 0]}
      >
        <meshStandardMaterial color={'black'} />
      </mesh>
    </RigidBody>
  )
}
