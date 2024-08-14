import { GroupProps } from '@react-three/fiber'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useMemo } from 'react'
import { Fence } from '../models/Fence'
import { FenceShort } from '../models/FenceShort'

interface CourseWallsProps extends GroupProps {}

export const CourseTwoWalls: FC<CourseWallsProps> = () => {
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
      <RigidBody type='fixed' colliders='cuboid' name={'course-two-walls'}>
        <Fence
          castShadow
          position={[-47.2, 3.5, -62.2]}
          rotation={[0, (Math.PI / 64) * -7, 0]}
        />
        <Fence
          castShadow
          position={[-53.6, 3.5, -64.6]}
          rotation={[0, (Math.PI / 64) * -7, 0]}
        />
        <Fence
          castShadow
          position={[-42.5, 3.5, -57.8]}
          rotation={[0, (Math.PI / 64) * -23, 0]}
        />
        <Fence
          castShadow
          position={[-39.5, 3.5, -51.5]}
          rotation={[0, (Math.PI / 64) * -23, 0]}
        />
        <FenceShort
          castShadow
          position={[-38.1, 3.5, -47.2]}
          rotation={[0, (Math.PI / 64) * -34, 0]}
        />
        <Fence
          castShadow
          position={[-42, 3.5, -33.9]}
          rotation={[0, (Math.PI / 64) * -39, 0]}
        />
        <Fence
          castShadow
          position={[-39.6, 3.5, -40.4]}
          rotation={[0, (Math.PI / 64) * -39, 0]}
        />
        <Fence
          castShadow
          position={[-46.5, 3.5, -29.2]}
          rotation={[0, (Math.PI / 64) * -55, 0]}
        />
        <Fence
          castShadow
          position={[-52.8, 3.5, -26]}
          rotation={[0, (Math.PI / 64) * -55, 0]}
        />
        <FenceShort
          castShadow
          position={[-56.8, 3.5, -24.4]}
          rotation={[0, (Math.PI / 64) * -62, 0]}
        />
        <Fence
          castShadow
          position={[-63.5, 3.5, -25.2]}
          rotation={[0, (Math.PI / 64) * 57, 0]}
        />
        <Fence
          castShadow
          position={[-70.1, 3.5, -27.5]}
          rotation={[0, (Math.PI / 64) * 57, 0]}
        />
        <Fence
          castShadow
          position={[-75.5, 3.5, -32.2]}
          rotation={[0, (Math.PI / 64) * 42, 0]}
        />
        <Fence
          castShadow
          position={[-78.9, 3.5, -38.5]}
          rotation={[0, (Math.PI / 64) * 42, 0]}
        />
        <Fence
          castShadow
          position={[-78, 3.5, -44.6]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
        <Fence
          castShadow
          position={[-73, 3.5, -49.9]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
        <Fence
          castShadow
          position={[-68, 3.5, -55.1]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
        <Fence
          castShadow
          position={[-63, 3.5, -60.3]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
        <FenceShort
          castShadow
          position={[-60, 3.5, -63.3]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
      </RigidBody>
    </>
  )
}
