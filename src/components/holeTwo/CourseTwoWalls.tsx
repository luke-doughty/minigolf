import { Box } from '@react-three/drei'
import * as THREE from 'three'

import { GroupProps } from '@react-three/fiber'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useMemo } from 'react'
import { Fence } from '../models/Fence'

type NewType = GroupProps

interface CourseWallsProps extends GroupProps {}

export const CourseTwoWalls: FC<CourseWallsProps> = () => {
  const holeSideGeometry = useMemo(() => {
    const extrudeSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 1,
      curveSegments: 8,
    }

    const arcShape = new THREE.Shape()
    arcShape.absarc(0, 0, 19.5, 0, Math.PI * 2, false)

    const holePath = new THREE.Path()
    holePath.absarc(0, 0, 19.1, 0, Math.PI * 2, true)

    arcShape.holes.push(holePath)

    return new THREE.ExtrudeGeometry(arcShape, extrudeSettings)
  }, [])

  return (
    <>
      <RigidBody
        type='fixed'
        colliders='cuboid'
        name={'course-two-walls'}
        rotation={[0, (Math.PI / 64) * -14, 0]}
      >
        <group>
          <Fence castShadow position={[-12, 0.5, 6]} rotation={[0, Math.PI, 0]} />
          <Fence castShadow position={[-18.9, 0.5, 6]} rotation={[0, Math.PI, 0]} />
          <Fence castShadow position={[-25.9, 0.5, 6]} rotation={[0, Math.PI, 0]} />

          <Fence castShadow position={[-8.5, 0.5, 2]} rotation={[0, Math.PI / -2, 0]} />

          <Fence castShadow position={[-12, 0.5, -2]} />
          <Fence castShadow position={[-18.9, 0.5, -2]} />
          <Fence castShadow position={[-25.9, 0.5, -2]} />
        </group>
      </RigidBody>
      <RigidBody
        type='fixed'
        colliders='trimesh'
        name={'course-two-walls'}
        rotation={[0, (Math.PI / 64) * -14, 0]}
      >
        <mesh
          geometry={holeSideGeometry}
          position={[-77, 4.5, 2]}
          rotation={[Math.PI / 2, (Math.PI / 64) * 0, 0]}
        >
          <meshStandardMaterial color={'black'} />
        </mesh>
      </RigidBody>
    </>
  )
}
