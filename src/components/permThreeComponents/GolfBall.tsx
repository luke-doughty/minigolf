import { Cylinder, OrbitControls, Trail } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps, vec3 } from '@react-three/rapier'
import React from 'react'
import { FC, useEffect, useRef, useState } from 'react'
import {
  BufferGeometry,
  Material,
  Mesh,
  MOUSE,
  NormalBufferAttributes,
  Object3DEventMap,
  Vector3,
  Vector3Like,
} from 'three'
import { GolfBallModel } from './GolfBallModel'
import { PowerMeter } from './PowerMeter'

/**
 * Props for the GolfBall component.
 *
 * @typedef {Object} GolfBallProps
 * @extends RigidBodyProps
 * @property {(() => void)} onHit - Function passed into component for what should happen when the ball is hit.
 */
interface GolfBallProps extends RigidBodyProps {
  onHit: () => void
  holeNumber: number
  onPotBallChangeInfo: () => void
}

/**
 * GolfBall component.
 *
 * This returns a GolfBall Model that is interactable with mouse controls.
 *
 * @param {GolfBallProps} Props - The properties for the GolfBall component.
 * @returns {JSX.Element} The rendered GolfBall component.
 */
export const GolfBall: FC<GolfBallProps> = ({
  onHit,
  holeNumber,
  onPotBallChangeInfo,
}) => {
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
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const potBallSoundRef = React.useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const golfBallPot = new Audio('/audio/PotBall.mp3')
    potBallSoundRef.current = golfBallPot

    const handleEndedPot = () => {
      golfBallPot.pause()
      golfBallPot.src = ''
    }

    golfBallPot.addEventListener('ended', handleEndedPot)

    return () => {
      golfBallPot.removeEventListener('ended', handleEndedPot)
      golfBallPot.pause()
      golfBallPot.src = ''
    }
  }, [])

  const holeStartPositions = new Map<number, [x: number, y: number, z: number]>([
    [1, [0, 2, 4]],
    [2, [-10, 1, -6]],
    [3, [10, 1, -7]],
  ])

  const golfBallRigidRef = useRef<RapierRigidBody>(null!)
  const boundaryRef = useRef<
    Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>
  >(null!)

  const [cameraOffset, setCameraOffset] = useState<Vector3>(new Vector3(0, 12, -18))

  useFrame(({ pointer, raycaster, camera, scene }) => {
    if (golfBallRigidRef.current.translation) {
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

      const flagBase = scene.getObjectByName('hole-position-base-' + holeNumber)

      if (flagBase) {
        const golfBallPos = golfBallRigidRef.current.translation()

        const dx = flagBase.position.x - golfBallPos.x
        const dy = flagBase.position.y - golfBallPos.y
        const dz = flagBase.position.z - golfBallPos.z

        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < 5 && distance > 1 && flagBase) {
          // TODO: adjust this, not too easy but not insanely hard
          const forceMagnitude = 8 / (distance * distance * distance)
          const totalForceVector = new Vector3()
          totalForceVector.x += dx * forceMagnitude
          totalForceVector.y += dy * forceMagnitude
          totalForceVector.z += dz * forceMagnitude
          golfBallRigidRef.current.applyImpulse(totalForceVector, true)
        }
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
          impulseVector.multiplyScalar(Math.exp(2.5))
          golfBallRigidRef.current.applyImpulse(impulseVector, true)
          onHit()
        }
      }
    }

    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
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
    if (
      golfBallRigidRef.current &&
      startPositionRef.current &&
      startPositionRef.current.y
    ) {
      golfBallRigidRef.current.resetForces(true)
      golfBallRigidRef.current.resetTorques(true)
      golfBallRigidRef.current.sleep()
      golfBallRigidRef.current.setTranslation(startPositionRef.current!, true)
    }
    onHit()
  }

  const onPotBall = () => {
    if (golfBallRigidRef.current) {
      golfBallRigidRef.current.resetForces(true)
      golfBallRigidRef.current.resetTorques(true)
      golfBallRigidRef.current.sleep()
      onPotBallChangeInfo()
      const coords = holeStartPositions.get(holeNumber + 1)
      if (coords) {
        golfBallRigidRef.current.setTranslation(
          new Vector3(coords[0], coords[1], coords[2]),
          true
        )
      }
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
            enableZoom={true}
            onStart={(e) => setIsRotating(true)}
            onEnd={(e) => setIsRotating(false)}
          />
        )}
      <RigidBody
        name='golf-ball'
        position={holeStartPositions.get(1)}
        colliders='ball'
        ref={golfBallRigidRef}
        linearDamping={0.35}
        angularDamping={0.3}
        restitution={0.9}
        onCollisionEnter={({ manifold, other }) => {
          if (
            other.rigidBodyObject?.name === 'level-bottom' &&
            parseInt(manifold.solverContactPoint(0).y.toFixed(0), 10) === -70
          ) {
            handleResetBall()
          }
        }}
        onContactForce={({ other }) => {
          if (other.rigidBodyObject?.name === 'hole-base-' + holeNumber) {
            onPotBall()
            if (potBallSoundRef.current && holeNumber != 4) {
              const potBall = potBallSoundRef.current
              potBall.currentTime = 0
              potBall.play()
            }
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
