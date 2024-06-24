import { Box, Sphere } from '@react-three/drei'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef } from 'react'
import { Mesh } from 'three'

export const CourseOneWalls: FC<RigidBodyProps> = () => {
  // const golfBallRef = useRef<RapierRigidBody>(null!)

  return (
    <RigidBody type='fixed'>
      <group>
        <Box castShadow position={[0, 1, -3]} scale={[9, 1, 1]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[-4, 1, 25]} scale={[1, 1, 55]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[0, 1, 55]} scale={[9, 1, 1]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[4, 1, 25]} scale={[1, 1, 55]}>
          <meshStandardMaterial color={'black'} />
        </Box>
      </group>
    </RigidBody>
  )
}
