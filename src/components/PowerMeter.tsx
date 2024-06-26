import { Box, Cylinder, Line, Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef, useState } from 'react'
import { Euler, Mesh, SphereGeometry, Vector2, Vector3 } from 'three'

interface PowerMeterProps {
  isVisible: boolean
  startPoint: Vector3
  endPoint: Vector3
  maximumLineLength: number
}

export const PowerMeter: FC<PowerMeterProps> = ({
  isVisible,
  startPoint,
  endPoint,
  maximumLineLength,
}) => {
  const [endPointCalculated, setEndPointCalculated] = useState<Vector3>(null!)

  useFrame(({ pointer, raycaster, camera, scene }) => {
    // MOVE THIS UP TO THE BALL AS IMPULSE IS MEASURED OFF THIS
    if (startPoint && endPoint) {
      const distance = startPoint.distanceTo(endPoint)
      if (distance > maximumLineLength) {
        setEndPointCalculated(
          new Vector3()
            .subVectors(endPoint, startPoint)
            .setY(1.5)
            .clampLength(0, maximumLineLength)
        )
      } else {
        setEndPointCalculated(endPoint.setY(1.5))
      }
    }

    raycaster.setFromCamera(pointer, camera)
    const cylinderPointer = scene.getObjectByName('power-meter-max-limit')
    const linePointer = scene.getObjectByName('power-meter')
    if (cylinderPointer && linePointer) {
      const intersect = raycaster.intersectObjects([cylinderPointer, linePointer])
      if ((intersect.length = 1)) {
        const direction = endPoint.sub(startPoint).normalize()
        const newEndVec = startPoint.add(direction.multiplyScalar(maximumLineLength))
        setEndPointCalculated(newEndVec)
      }
    }
  })

  const getColorValueForGivenLength = (): string => {
    if (startPoint && endPoint) {
      const distance = startPoint.distanceTo(endPoint)

      const colorGreenGradientVal = Math.max(
        0,
        255 - Math.round((255 / maximumLineLength) * distance)
      )
      const colorRedGradientVal = Math.min(
        255,
        Math.round((255 / maximumLineLength) * distance)
      )
      const greenHex = colorGreenGradientVal.toString(16)
      const redHex = colorRedGradientVal.toString(16)
      return (
        '#' +
        (redHex.length == 1 ? '0' + redHex : redHex) +
        (greenHex.length == 1 ? '0' + greenHex : greenHex) +
        '00'
      )
    } else {
      return '#FFFFFF'
    }
  }

  if (!isVisible || endPoint === null || startPoint === undefined) {
    return <mesh></mesh>
  }

  return (
    <>
      <Line
        name='power-meter'
        points={[startPoint.setY(1.5), endPointCalculated ?? endPoint.setY(1.5)]}
        color={getColorValueForGivenLength()}
        lineWidth={25}
      />
    </>
  )
}
