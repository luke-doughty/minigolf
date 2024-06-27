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
        <Box castShadow position={[-4, 1, 7]} scale={[1, 1, 21]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[4, 1, 6.5]} scale={[1, 1, 18.5]}>
          <meshStandardMaterial color={'black'} />
        </Box>
      </group>
      <group>
        <Box
          castShadow
          position={[3, -15.5, 68]}
          scale={[20, 1, 1]}
          rotation={[0, 0.15, 0.04]}
        >
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box
          castShadow
          position={[12, -14.2, 58]}
          scale={[1, 1, 18.2]}
          rotation={[0.1, 0.1, 0]}
        >
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box
          castShadow
          position={[-8, -15, 61]}
          scale={[1, 1, 18.2]}
          rotation={[0.1, 0.1, 0]}
        >
          <meshStandardMaterial color={'black'} />
        </Box>
      </group>
    </RigidBody>
  )
}
