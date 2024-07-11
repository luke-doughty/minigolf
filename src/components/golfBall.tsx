import { Cylinder, OrbitControls, Trail } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps, vec3 } from '@react-three/rapier'
import { FC, useEffect, useRef, useState } from 'react'
import {
  BufferGeometry,
  Material,
  Mesh,
  MOUSE,
  NormalBufferAttributes,
  Object3DEventMap,
  Vector3,
} from 'three'
import { GolfBallModel } from './GolfBallModel'
import { PowerMeter } from './PowerMeter'

interface GolfBallProps extends RigidBodyProps {}

export const GolfBall: FC<GolfBallProps> = () => {
  const startPositionRef = useRef<Vector3 | null>(null)
  const endPositionRef = useRef<Vector3 | null>(null)
  const [dragPositions, setDragPositions] = useState<{
    start: Vector3 | null
    end: Vector3 | null
  }>({
    start: null,
    end: null,
  })
  const [isRotating, setIsRotating] = useState<boolean>(false)

  const [isDragging, setIsDragging] = useState(false)

  const golfBallRigidRef = useRef<RapierRigidBody>(null!)
  const boundaryRef = useRef<
    Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>
  >(null!)

  const [cameraOffset, setCameraOffset] = useState<Vector3>(new Vector3(0, 12, -18))
  // const cameraOffset = new Vector3(0, 12, -18)

  useFrame(({ pointer, raycaster, camera, scene }) => {
    const ballPosition = vec3(golfBallRigidRef.current.translation())
    boundaryRef.current.position.copy(ballPosition)

    if (!isRotating) {
      const newCameraPosition = ballPosition.clone().add(cameraOffset)
      camera.position.lerp(newCameraPosition, isDragging ? 0.2 : 0.015)
    } else {
      const newCameraOffset = camera.position.clone().sub(ballPosition)
      setCameraOffset(newCameraOffset)
    }
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
            end: intersectPoint.clone().setY(intersectPoint.y),
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
    startPositionRef.current = startPos.clone().setY(startPos.y)
    endPositionRef.current = startPos.clone().setY(startPos.y)
    setDragPositions({
      start: startPos.clone().setY(startPos.y),
      end: startPos.clone().setY(startPos.y),
    })
  }

  const handlePointerDown = () => {
    if (!golfBallRigidRef.current.isMoving()) {
      startPosition()
      setIsDragging(true)
    }
  }

  const handleResetBall = () => {
    if (golfBallRigidRef.current) {
      golfBallRigidRef.current.resetForces(true)
      golfBallRigidRef.current.resetTorques(true)
      golfBallRigidRef.current.setTranslation({ x: 0, y: 1, z: 5 }, true)
    }
  }

  return (
    <>
      {golfBallRigidRef.current &&
        golfBallRigidRef.current.translation() &&
        dragPositions.start && (
          <OrbitControls
            mouseButtons={{ LEFT: MOUSE.PAN, RIGHT: MOUSE.ROTATE }}
            target={dragPositions.start}
            enablePan={false}
            enableRotate={!isDragging}
            maxPolarAngle={(Math.PI / 64) * 28}
            maxDistance={20}
            dampingFactor={0.6}
            enableZoom={false}
            onStart={(e) => setIsRotating(true)}
            onEnd={(e) => setIsRotating(false)}
          />
        )}
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
        // onIntersectionEnter={()}
        onCollisionEnter={({ manifold, other }) => {
          if (
            other.rigidBodyObject?.name === 'level-bottom' &&
            parseInt(manifold.solverContactPoint(0).y.toFixed(0), 10) === -70
          ) {
            handleResetBall()
          }
        }}
      >
        <Trail width={5} length={3.5} color={'white'} attenuation={(t) => t * t * t}>
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

      {isDragging && dragPositions.start && dragPositions.end && (
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
