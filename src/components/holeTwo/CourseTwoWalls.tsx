import { Box } from '@react-three/drei'
import * as THREE from 'three'

import { GroupProps } from '@react-three/fiber'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useMemo } from 'react'
import { Fence } from '../models/Fence'
import { FenceShort } from '../models/FenceShort'

type NewType = GroupProps

interface CourseWallsProps extends GroupProps {}

export const CourseTwoWalls: FC<CourseWallsProps> = () => {
  const holeSideGeometry = useMemo(() => {
    const extrudeSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 1,
      curveSegments: 8,
    }

    const arcShape = new THREE.Shape()
    arcShape.absarc(0, 0, 19.5, 0, Math.PI * 2, false)

    const holePath = new THREE.Path()
    holePath.absarc(0, 0, 19.1, 0, Math.PI * 2, true)

    arcShape.holes.push(holePath)

    return new THREE.ExtrudeGeometry(arcShape, extrudeSettings)
  }, [])

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
          position={[-49.2, 3.5, -64.2]}
          rotation={[0, (Math.PI / 64) * -7, 0]}
        />
        <Fence
          castShadow
          position={[-55.6, 3.5, -66.6]}
          rotation={[0, (Math.PI / 64) * -7, 0]}
        />
        <Fence
          castShadow
          position={[-44.5, 3.5, -59.8]}
          rotation={[0, (Math.PI / 64) * -23, 0]}
        />
        <Fence
          castShadow
          position={[-41.5, 3.5, -53.5]}
          rotation={[0, (Math.PI / 64) * -23, 0]}
        />
        <FenceShort
          castShadow
          position={[-40.1, 3.5, -49.2]}
          rotation={[0, (Math.PI / 64) * -34, 0]}
        />
        <Fence
          castShadow
          position={[-44, 3.5, -35.9]}
          rotation={[0, (Math.PI / 64) * -39, 0]}
        />
        <Fence
          castShadow
          position={[-41.6, 3.5, -42.4]}
          rotation={[0, (Math.PI / 64) * -39, 0]}
        />
        <Fence
          castShadow
          position={[-48.5, 3.5, -31]}
          rotation={[0, (Math.PI / 64) * -55, 0]}
        />
        <Fence
          castShadow
          position={[-54.8, 3.5, -28]}
          rotation={[0, (Math.PI / 64) * -55, 0]}
        />
        <FenceShort
          castShadow
          position={[-58.8, 3.5, -26.4]}
          rotation={[0, (Math.PI / 64) * -62, 0]}
        />
        <Fence
          castShadow
          position={[-65.5, 3.5, -27.2]}
          rotation={[0, (Math.PI / 64) * 57, 0]}
        />
        <Fence
          castShadow
          position={[-72.1, 3.5, -29.5]}
          rotation={[0, (Math.PI / 64) * 57, 0]}
        />
        <Fence
          castShadow
          position={[-77.5, 3.5, -34.2]}
          rotation={[0, (Math.PI / 64) * 42, 0]}
        />
        <Fence
          castShadow
          position={[-80.9, 3.5, -40.5]}
          rotation={[0, (Math.PI / 64) * 42, 0]}
        />
        <Fence
          castShadow
          position={[-80, 3.5, -46.6]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
        <Fence
          castShadow
          position={[-75, 3.5, -51.9]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
        <Fence
          castShadow
          position={[-70, 3.5, -57.1]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
        <Fence
          castShadow
          position={[-65, 3.5, -62.3]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
        <FenceShort
          castShadow
          position={[-62, 3.5, -65.3]}
          rotation={[0, (Math.PI / 64) * 16.5, 0]}
        />
      </RigidBody>
    </>
  )
}
