import { Box, RoundedBox, Sphere } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef } from 'react'
import { Mesh, TextureLoader } from 'three'
import { Fence } from '../models/Fence'
import { FenceShort } from '../models/FenceShort'

export const CourseOneWalls: FC<RigidBodyProps> = () => {
  // const texture = useLoader(TextureLoader, img)
  return (
    <>
      <group>
        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence castShadow position={[0, 0.5, 1.2]} />
        </RigidBody>

        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence castShadow position={[-3.8, 0.5, 5.2]} rotation={[0, Math.PI / 2, 0]} />
          <Fence castShadow position={[-3.8, 0.5, 12.2]} rotation={[0, Math.PI / 2, 0]} />
        </RigidBody>

        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence castShadow position={[3.8, 0.5, 5.2]} rotation={[0, -Math.PI / 2, 0]} />
          <Fence castShadow position={[3.8, 0.5, 12.2]} rotation={[0, -Math.PI / 2, 0]} />
        </RigidBody>
      </group>
      <group>
        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence
            castShadow
            position={[-6.2, -15.1, 76]}
            rotation={[0, (-Math.PI / 64) * 61.2, 0]}
          />
          <Fence
            castShadow
            position={[0.7, -15.1, 75]}
            rotation={[0, (-Math.PI / 64) * 61.2, 0]}
          />
          <Fence
            castShadow
            position={[7.6, -15.1, 74]}
            rotation={[0, (-Math.PI / 64) * 61.2, 0]}
          />
          <FenceShort
            castShadow
            position={[14.45, -15.1, 73]}
            rotation={[0, (-Math.PI / 64) * 61.2, 0]}
          />
        </RigidBody>

        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence
            castShadow
            position={[15.2, -15.1, 69.2]}
            rotation={[0, (Math.PI / 64) * -30, 0]}
          />
          <Fence
            castShadow
            position={[14.5, -15.1, 62.4]}
            rotation={[0, (Math.PI / 64) * -30, 0]}
          />
          <Fence
            castShadow
            position={[13.8, -15.1, 55.6]}
            rotation={[0, (Math.PI / 64) * -30, 0]}
          />
        </RigidBody>

        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence
            castShadow
            position={[-10.55, -15.1, 72.6]}
            rotation={[0, (Math.PI / 64) * 35.2, 0]}
          />
          <Fence
            castShadow
            position={[-11.6, -15.1, 65.9]}
            rotation={[0, (Math.PI / 64) * 35.2, 0]}
          />
          <Fence
            castShadow
            position={[-12.7, -15.1, 59]}
            rotation={[0, (Math.PI / 64) * 35.2, 0]}
          />
          <FenceShort
            castShadow
            position={[-13.3, -15.1, 55]}
            rotation={[0, (Math.PI / 64) * 35.2, 0]}
          />
        </RigidBody>

        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence castShadow position={[-10, -15.1, 50.2]} rotation={[0, 0.15, 0.025]} />
          <Fence castShadow position={[-3.12, -15.1, 49.1]} rotation={[0, 0.15, 0.025]} />
          <Fence castShadow position={[3.8, -15.1, 48.1]} rotation={[0, 0.15, 0.025]} />
        </RigidBody>
      </group>
    </>
  )
}
