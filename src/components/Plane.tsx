import { Box, Sphere } from '@react-three/drei'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC } from 'react'

export const Plane: FC<RigidBodyProps> = () => {
  return (
    <RigidBody type='fixed' rotation-x={Math.PI * -0.5} restitution={0.2} friction={4}>
      <mesh receiveShadow>
        <boxGeometry args={[2000, 80, 1]} />
        <meshStandardMaterial clipShadows={false} color={'green'} />
      </mesh>
    </RigidBody>
  )
}
