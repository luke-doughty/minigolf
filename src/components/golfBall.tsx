import { Box, Sphere } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps, vec3 } from '@react-three/rapier'
import { FC, useEffect, useRef, useState } from 'react'
import { Mesh, MOUSE, Vector2, Vector3 } from 'three'
import { PowerMeter } from './PowerMeter'

export const GolfBall: FC<RigidBodyProps> = () => {
  const { viewport } = useThree()

  const [startPositionDragClick, setStartPositionDragClick] = useState<Vector3>()
  const [endPositionDragClick, setEndPositionDragClick] = useState<Vector3>()
  const [isDragging, setIsDragging] = useState(false)

  const golfBallRigidRef = useRef<RapierRigidBody>(null!)

  // const pushBall = () => {
  //   golfBallRigidRef.current.applyImpulse({ x: 0, y: 2, z: 0 }, true)
  // }

  const startPosition = () => {
    setStartPositionDragClick(vec3(golfBallRigidRef.current.translation()))
    console.log('start: ', golfBallRigidRef.current.translation())
  }

  const endPosition = () => {
    console.log(endPositionDragClick)
  }

  useFrame(({ pointer, raycaster, events, camera, scene }) => {
    if (isDragging) {
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(scene.children)
      const intersectPoint = intersects[0].point
      setEndPositionDragClick(intersectPoint)
    }
  })

  useEffect(() => {
    const handlePointerUp = (event: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false)
      }
      console.log('here?')
      if (startPositionDragClick && endPositionDragClick) {
        const impulseVector = new Vector3()
        impulseVector.subVectors(startPositionDragClick, endPositionDragClick)
        impulseVector.multiplyScalar(0.8)
        console.log('doing this impulse: ', impulseVector)
        golfBallRigidRef.current.applyImpulse(impulseVector, false)
      }
    }

    const handlePointerMove = (event: MouseEvent) => {
      if (isDragging) {
        // You can use this to track the movement, if needed
      }
    }

    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [isDragging])

  const handlePointerDown = () => {
    startPosition()
    setIsDragging(true)
  }

  return (
    <>
      <RigidBody
        position={[0, 2, 0]}
        colliders='ball'
        restitution={1.2}
        ref={golfBallRigidRef}
      >
        <Sphere
          castShadow
          onPointerDown={handlePointerDown}
          // onClick={pushBall}
        >
          <meshStandardMaterial color={'white'} />
        </Sphere>
      </RigidBody>

      <PowerMeter
        isVisible={isDragging}
        startPoint={startPositionDragClick}
        endPoint={endPositionDragClick}
      />
    </>
  )
}
