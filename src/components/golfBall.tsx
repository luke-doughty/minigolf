import { Box, Sphere } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps, vec3 } from '@react-three/rapier'
import { FC, useEffect, useRef, useState } from 'react'
import { Mesh, MOUSE, Vector2, Vector3 } from 'three'
import { PowerMeter } from './PowerMeter'

export const GolfBall: FC<RigidBodyProps> = () => {
  // use refs for updating vector for impulse
  const startPositionRef = useRef<Vector3 | null>(null)
  const endPositionRef = useRef<Vector3 | null>(null)
  // use state for updating visual
  const [dragPositions, setDragPositions] = useState<{
    start: Vector3 | null
    end: Vector3 | null
  }>({
    start: null,
    end: null,
  })

  const [isDragging, setIsDragging] = useState(false)

  const golfBallRigidRef = useRef<RapierRigidBody>(null!)

  const startPosition = () => {
    const startPos = vec3(golfBallRigidRef.current.translation())
    startPositionRef.current = startPos
    setDragPositions({ start: startPos, end: dragPositions.end })
  }

  useFrame(({ pointer, raycaster, events, camera, scene }) => {
    if (isDragging) {
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(scene.children)
      if (intersects.length > 0) {
        const intersectPoint = intersects[0].point
        endPositionRef.current = intersectPoint
        setDragPositions({ start: dragPositions.start, end: intersectPoint })
      }
    }
  })

  useEffect(() => {
    const handlePointerUp = (event: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false)
        if (startPositionRef.current && endPositionRef.current) {
          const impulseVector = new Vector3()
          impulseVector.subVectors(startPositionRef.current, endPositionRef.current)
          impulseVector.multiplyScalar(2.8)
          golfBallRigidRef.current.applyImpulse(impulseVector, false)
        }
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

      {isDragging && (
        <PowerMeter
          isVisible={isDragging}
          startPoint={dragPositions.start}
          endPoint={dragPositions.end}
        />
      )}
    </>
  )
}
