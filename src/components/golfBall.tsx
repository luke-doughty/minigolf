import { Box, Sphere } from '@react-three/drei'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef } from 'react'
import { Mesh } from 'three'

export const GolfBall: FC<RigidBodyProps> = () => {
  const golfBallRef = useRef<RapierRigidBody>(null!)

  const pushBall = () => {
    golfBallRef.current.applyImpulse({ x: 1, y: 0, z: 0 }, true)
  }

  return (
    <RigidBody position={[0, 2, 0]} colliders='ball' restitution={1.2} ref={golfBallRef}>
      <Sphere castShadow onClick={pushBall}>
        <meshStandardMaterial color={'white'} />
      </Sphere>
    </RigidBody>
  )
}
