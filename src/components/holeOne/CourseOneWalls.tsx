import { Box, RoundedBox, Sphere } from '@react-three/drei'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef } from 'react'
import { Mesh } from 'three'

export const CourseOneWalls: FC<RigidBodyProps> = () => {
  // const golfBallRef = useRef<RapierRigidBody>(null!)

  return (
    <RigidBody
      type='fixed'
      // friction={20}
      name={'course-one-walls'}
      // restitution={0.2}
    >
      <group>
        <RoundedBox radius={0.02} castShadow position={[0, 1, -3]} scale={[9, 2, 1]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox radius={0.02} castShadow position={[-4, 1, 7]} scale={[1, 2, 21]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox radius={0.02} castShadow position={[4, 1, 6.5]} scale={[1, 2, 18.5]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
      </group>
      <group>
        <RoundedBox
          radius={0.02}
          castShadow
          position={[3, -16, 69.5]}
          scale={[26, 2, 1]}
          rotation={[0, 0.15, 0.04]}
        >
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox
          radius={0.02}
          castShadow
          position={[14.5, -14.55, 59]}
          scale={[1, 2, 18]}
          rotation={[0.11, 0.1, 0]}
        >
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox
          radius={0.02}
          castShadow
          position={[-11.4, -15.1, 58.8]}
          scale={[1, 2, 26.2]}
          rotation={[0.1, 0.15, 0]}
        >
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox
          radius={0.02}
          castShadow
          position={[-4.8, -13.5, 44.8]}
          scale={[18, 2, 1]}
          rotation={[0.1, 0.15, 0.025]}
        >
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
      </group>
    </RigidBody>
  )
}
