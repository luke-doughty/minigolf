import { Box, Sphere } from '@react-three/drei'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef } from 'react'
import { Mesh } from 'three'

export const CourseOneWalls: FC<RigidBodyProps> = () => {
  // const golfBallRef = useRef<RapierRigidBody>(null!)

  return (
    <RigidBody type='fixed'>
      <group>
        <Box castShadow position={[25, 1, 3]} scale={[55, 1, 1]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[-2, 1, 0]} scale={[1, 1, 5]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[25, 1, -3]} scale={[55, 1, 1]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[52, 1, 0]} scale={[1, 1, 5]}>
          <meshStandardMaterial color={'black'} />
        </Box>
      </group>
    </RigidBody>
  )
}
