import { Box, RoundedBox, Sphere } from '@react-three/drei'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef } from 'react'
import { Mesh } from 'three'

export const CourseOneWalls: FC<RigidBodyProps> = () => {
  return (
    <RigidBody
      type='kinematicPosition'
      // friction={20}
      colliders='trimesh'
      name={'course-one-walls'}

      // restitution={0.2}
    >
      <group>
        <Box castShadow position={[0, 1, -1]} scale={[7.8, 2, 0.75]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[-3.5, 1, 8]} scale={[0.75, 2, 18]}>
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box castShadow position={[3.5, 1, 7.5]} scale={[0.75, 2, 16.5]}>
          <meshStandardMaterial color={'black'} />
        </Box>
      </group>
      <group>
        <Box
          castShadow
          position={[3, -16, 69.5]}
          scale={[26, 2, 0.75]}
          rotation={[0, 0.15, 0.04]}
        >
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box
          castShadow
          position={[14.5, -14.55, 59]}
          scale={[0.75, 2, 18]}
          rotation={[0.11, 0.1, 0]}
        >
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box
          castShadow
          position={[-11.4, -15.1, 58.8]}
          scale={[0.75, 2, 26.2]}
          rotation={[0.1, 0.15, 0]}
        >
          <meshStandardMaterial color={'black'} />
        </Box>
        <Box
          castShadow
          position={[-4.8, -13.5, 44.8]}
          scale={[18, 2, 0.75]}
          rotation={[0.1, 0.15, 0.025]}
        >
          <meshStandardMaterial color={'black'} />
        </Box>
      </group>
    </RigidBody>
  )
}
