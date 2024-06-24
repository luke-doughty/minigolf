import { Box, Sphere } from '@react-three/drei'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC } from 'react'

export const Plane: FC<RigidBodyProps> = () => {
  return (
    <RigidBody name='floor' type='fixed' rotation-x={Math.PI * -0.5} friction={5}>
      <mesh receiveShadow>
        <boxGeometry args={[80, 2000, 1]} />
        <meshStandardMaterial clipShadows={false} color={'green'} />
      </mesh>
    </RigidBody>
  )
}
