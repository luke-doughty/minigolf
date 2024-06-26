import { MeshLineGeometry, Sphere, Trail } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps, vec3 } from '@react-three/rapier'
import { FC, useEffect, useRef, useState } from 'react'
import { Group, Object3DEventMap, Vector3 } from 'three'
import { ToneMapping, EffectComposer } from '@react-three/postprocessing'
import { GolfBallModel } from './GolfBallModel'
import { PowerMeter } from './PowerMeter'
import { useControls } from 'leva'

export const GolfBall: FC<RigidBodyProps> = () => {
  const startPositionRef = useRef<Vector3 | null>(null)
  const endPositionRef = useRef<Vector3 | null>(null)
  const [dragPositions, setDragPositions] = useState<{
    start: Vector3 | null
    end: Vector3 | null
  }>({
    start: null,
    end: null,
  })

  const [isDragging, setIsDragging] = useState(false)

  const golfBallRigidRef = useRef<RapierRigidBody>(null!)
  const trailRef = useRef<MeshLineGeometry>(null!)
  const cameraOffset = new Vector3(0, 12, -18)

  useFrame(({ pointer, raycaster, events, camera, scene }) => {
    const ballPosition = vec3(golfBallRigidRef.current.translation())
    const newCameraPosition = ballPosition.clone().add(cameraOffset)
    trailRef.current.position.copy(ballPosition)

    camera.position.lerp(newCameraPosition, 0.015)

    camera.lookAt(ballPosition)

    if (isDragging) {
      raycaster.setFromCamera(pointer, camera)
      const floorPointer = scene.getObjectByName('floor')
      if (floorPointer) {
        const intersect = raycaster.intersectObject(floorPointer)
        endPositionRef.current = intersect[0].point
        setDragPositions({
          start: dragPositions.start,
          end: intersect[0].point.setY(1.5),
        })
      }
    } else {
      setDragPositions({ start: ballPosition, end: ballPosition })
    }
  })

  useEffect(() => {
    const handlePointerUp = (event: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false)
        if (startPositionRef.current && endPositionRef.current) {
          const impulseVector = new Vector3()
          impulseVector.subVectors(startPositionRef.current, endPositionRef.current)
          impulseVector.multiplyScalar(Math.exp(2.5))
          golfBallRigidRef.current.applyImpulse(impulseVector, true)
        }
      }
    }

    const handlePointerMove = (event: MouseEvent) => {}

    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [isDragging])

  const startPosition = () => {
    const startPos = vec3(golfBallRigidRef.current.translation())
    startPositionRef.current = startPos.setY(1.5)
    setDragPositions({ start: startPos, end: dragPositions.end })
  }

  const handlePointerDown = () => {
    startPosition()
    if (!golfBallRigidRef.current.isMoving()) {
      setIsDragging(true)
    }
  }

  return (
    <>
      <RigidBody
        name='golf-ball'
        position={[0, 1, 0]}
        colliders='ball'
        restitution={1.2}
        ref={golfBallRigidRef}
        mass={20}
        friction={2}
        linearDamping={0.6}
        angularDamping={0.6}
      >
        <Trail
          ref={trailRef}
          width={5} // The width of the trail
          length={5.5} // The length of the trail
          color={'white'} // The color of the trail
          attenuation={(t) => t * t} // Attenuation function for the trail
        >
          <GolfBallModel castShadow onPointerDown={handlePointerDown} />
        </Trail>
      </RigidBody>

      {isDragging && (
        <PowerMeter
          isVisible={isDragging}
          maximumLineLength={10}
          startPoint={dragPositions.start}
          endPoint={dragPositions.end}
        />
      )}
    </>
  )
}
