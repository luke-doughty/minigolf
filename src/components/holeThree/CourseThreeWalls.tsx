import { Box, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

import { GroupProps } from '@react-three/fiber'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useMemo } from 'react'
import { Fence } from '../models/Fence'

type NewType = GroupProps

interface CourseWallsProps extends GroupProps {}

export const CourseThreeWalls: FC<CourseWallsProps> = () => {
  return (
    <>
      <RigidBody
        type='fixed'
        colliders='trimesh'
        name={'course-three-walls'}
        rotation={[0, (Math.PI / 64) * -56.5, 0]}
        position={[-4.5, 0, 0]}
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
    </>
  )
}
