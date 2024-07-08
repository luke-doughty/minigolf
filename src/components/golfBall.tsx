import { Cylinder, MeshLineGeometry, Sphere, Torus, Trail } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps, vec3 } from '@react-three/rapier'
import { FC, useEffect, useRef, useState } from 'react'
import {
  BufferGeometry,
  Camera,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3D,
  Object3DEventMap,
  Vector3,
} from 'three'
import { ToneMapping, EffectComposer } from '@react-three/postprocessing'
import { GolfBallModel } from './GolfBallModel'
import { PowerMeter } from './PowerMeter'
import { useControls } from 'leva'
import * as THREE from 'three'

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
  const boundaryRef = useRef<
    Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>
  >(null!)
  const cameraOffset = new Vector3(0, 12, -18)

  useFrame(({ pointer, raycaster, camera, scene }) => {
    const ballPosition = vec3(golfBallRigidRef.current.translation())
    boundaryRef.current.position.copy(ballPosition)

    const newCameraPosition = ballPosition.clone().add(cameraOffset)
    camera.position.lerp(newCameraPosition, isDragging ? 0.2 : 0.015)
    camera.lookAt(ballPosition)

    if (isDragging) {
      camera.lookAt(ballPosition)
      raycaster.setFromCamera(pointer, camera)

      const discBoundary = scene.getObjectByName('boundary')
      if (discBoundary) {
        const intersects = raycaster.intersectObject(boundaryRef.current)
        if (intersects.length > 0) {
          const intersectPoint = intersects[0].point
          endPositionRef.current = intersectPoint
          setDragPositions((prev) => ({
            ...prev,
            end: intersectPoint.clone().setY(1.5),
          }))
        }
      }
    } else {
      setDragPositions((prev) => ({
        ...prev,
        start: ballPosition.clone(),
        end: ballPosition.clone(),
      }))
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
        // console.log('Pointer up, dragging stopped')
      }
    }

    const handlePointerMove = (event: MouseEvent) => {
      // // console.log('Pointer move:', event)
    }

    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [isDragging])

  const startPosition = () => {
    const startPos = vec3(golfBallRigidRef.current.translation())
    startPositionRef.current = startPos.clone().setY(1.5)
    endPositionRef.current = startPos.clone().setY(1.5)
    setDragPositions({
      start: startPos.clone().setY(startPos.y + 1.5),
      end: startPos.clone().setY(startPos.y + 1.5),
    })
  }

  const handlePointerDown = () => {
    if (!golfBallRigidRef.current.isMoving()) {
      startPosition()
      setIsDragging(true)
    }
  }

  return (
    <>
      <RigidBody
        name='golf-ball'
        position={[0, 1, 5]}
        colliders='ball'
        restitution={1.2}
        ref={golfBallRigidRef}
        mass={20}
        friction={2}
        linearDamping={0.6}
        angularDamping={0.6}
      >
        <Trail width={15} length={3.5} color={'white'} attenuation={(t) => t * t * t}>
          <GolfBallModel castShadow onPointerDown={handlePointerDown} />
        </Trail>
      </RigidBody>

      <Cylinder
        name={'boundary'}
        ref={boundaryRef}
        scale={[14, 0.00001, 14]}
        visible={false}
        position={[0, 2, 0]}
        args={[, , , 64]}
      />

      {isDragging && (
        <PowerMeter
          isVisible={isDragging}
          maximumLineLength={10}
          startPoint={dragPositions.start}
          endPoint={endPositionRef.current}
        />
      )}
    </>
  )
}
