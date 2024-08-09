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
            position={[-6.2, -16.5, 71]}
            rotation={[0, (-Math.PI / 64) * 61.2, -0.04]}
          />
          <Fence
            castShadow
            position={[0.7, -16.2, 70]}
            rotation={[0, (-Math.PI / 64) * 61.2, -0.04]}
          />
          <Fence
            castShadow
            position={[7.6, -15.9, 69]}
            rotation={[0, (-Math.PI / 64) * 61.2, -0.04]}
          />
          <FenceShort
            castShadow
            position={[14.45, -15.7, 68]}
            rotation={[0, (-Math.PI / 64) * 61.2, -0.04]}
          />
        </RigidBody>

        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <FenceShort
            castShadow
            position={[14.45, -15.7, 68]}
          />
        </RigidBody>
        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence
            castShadow
            position={[15.2, -15.25, 64.2]}
            rotation={[0.11, (Math.PI / 64) * -30, 0]}
          />
          <Fence
            castShadow
            position={[14.5, -14.45, 57.4]}
            rotation={[0.11, (Math.PI / 64) * -30, 0]}
          />
          <Fence
            castShadow
            position={[13.8, -13.65, 50.6]}
            rotation={[0.11, (Math.PI / 64) * -30, 0]}
          />
        </RigidBody>

        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence
            castShadow
            position={[-10.55, -16.2, 67.6]}
            rotation={[0.1, (Math.PI / 64) * 35.2, 0]}
          />
          <Fence
            castShadow
            position={[-11.6, -15.5, 60.9]}
            rotation={[0.1, (Math.PI / 64) * 35.2, 0]}
          />
          <Fence
            castShadow
            position={[-12.7, -14.8, 54]}
            rotation={[0.1, (Math.PI / 64) * 35.2, 0]}
          />
          {/* something not correct with rigid body? */}
          <FenceShort
            castShadow
            position={[-13.3, -14.4, 50]}
            rotation={[0.1, (Math.PI / 64) * 35.2, 0]}
          />
        </RigidBody>

        <RigidBody type='kinematicPosition' colliders='cuboid' name={'course-one-walls'}>
          <Fence castShadow position={[-10, -13.8, 45.2]} rotation={[0.1, 0.15, 0.025]} />
          <Fence
            castShadow
            position={[-3.12, -13.7, 44.1]}
            rotation={[0.1, 0.15, 0.025]}
          />
          <Fence castShadow position={[3.8, -13.4, 43.1]} rotation={[0.1, 0.15, 0.025]} />
        </RigidBody>
      </group>
    </>
  )
}
