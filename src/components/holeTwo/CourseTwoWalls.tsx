import { Box } from '@react-three/drei'
import * as THREE from 'three'

import { GroupProps } from '@react-three/fiber'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useMemo } from 'react'

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
    <RigidBody
      type='fixed'
      colliders='trimesh'
      name={'course-two-walls'}
      rotation={[0, (Math.PI / 64) * -14, 0]}
    >
      <group>
        <Box castShadow position={[-18, 1, 5.5]} scale={[19, 2, 0.75]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[-8.5, 1, 2]} scale={[0.75, 2, 7.8]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[-18, 1, -1.5]} scale={[19, 2, 0.75]}>
          <meshStandardMaterial color={'black'} />
        </Box>
      </group>
      <mesh
        geometry={holeSideGeometry}
        position={[-77, 4.5, 2]}
        rotation={[Math.PI / 2, (Math.PI / 64) * 0, 0]}
      >
        <meshStandardMaterial color={'black'} />
      </mesh>
    </RigidBody>
  )
}
