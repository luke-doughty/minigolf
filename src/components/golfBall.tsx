import { Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps, vec3 } from '@react-three/rapier'
import { FC, useEffect, useRef, useState } from 'react'
import { Group, Object3DEventMap, Vector3 } from 'three'
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
  const container = useRef<Group<Object3DEventMap>>(null!)
  const targetCameraPosition = useRef<Group<Object3DEventMap>>(null!)
  const cameraPositionBallRelative = useRef<Group<Object3DEventMap>>(null!)
  const cameraOffset = new Vector3(0, 4, -10)

  const startPosition = () => {
    const startPos = vec3(golfBallRigidRef.current.translation())
    startPositionRef.current = startPos
    setDragPositions({ start: startPos, end: dragPositions.end })
  }

  useFrame(({ pointer, raycaster, events, camera, scene }) => {
    const ballPosition = vec3(golfBallRigidRef.current.translation())
    const newCameraPosition = ballPosition.clone().add(cameraOffset)

    camera.position.lerp(newCameraPosition, 0.05)

    camera.lookAt(ballPosition)

    if (isDragging) {
      raycaster.setFromCamera(pointer, camera)
      const floorPointer = scene.getObjectByName('floor')
      if (floorPointer) {
        const intersect = raycaster.intersectObject(floorPointer)
        endPositionRef.current = intersect[0].point
        setDragPositions({ start: dragPositions.start, end: intersect[0].point })
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
          golfBallRigidRef.current.applyImpulse(impulseVector, true)
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
        name='golf-ball'
        position={[0, 2, 0]}
        colliders='ball'
        restitution={1.2}
        ref={golfBallRigidRef}
        mass={20}
        linearDamping={0.6}
        angularDamping={0.6}
      >
        <group ref={container}>
          <group ref={targetCameraPosition} position-z={2} />
          <group ref={cameraPositionBallRelative} position-y={4} position-z={-10} />
          <Sphere
            castShadow
            onPointerDown={handlePointerDown}
            // onClick={pushBall}
          >
            <meshStandardMaterial color={'white'} />
          </Sphere>
        </group>
      </RigidBody>

      {isDragging && (
        <PowerMeter
          isVisible={isDragging}
          maximumLineLength={8}
          startPoint={dragPositions.start}
          endPoint={dragPositions.end}
        />
      )}
    </>
  )
}
