import { RoundedBox } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC } from 'react'

type NewType = GroupProps

interface CourseWallsProps extends GroupProps {}

export const CourseTwoWalls: FC<CourseWallsProps> = () => {
  return (
    <RigidBody type='fixed' name={'course-two-walls'}>
      <group>
        <RoundedBox radius={0.02} castShadow position={[-15, 1, 5.5]} scale={[19, 2, 1]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox radius={0.02} castShadow position={[-5.5, 1, 2]} scale={[1, 2, 8]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
        <RoundedBox radius={0.02} castShadow position={[-15, 1, -1.5]} scale={[19, 2, 1]}>
          <meshStandardMaterial color={'black'} />
        </RoundedBox>
      </group>
    </RigidBody>
  )
}
