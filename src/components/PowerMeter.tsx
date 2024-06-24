import { Box, Line, Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef } from 'react'
import { Euler, Mesh, Vector2, Vector3 } from 'three'

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
  const getColorValueForGivenLength = (): string => {
    if (startPoint && endPoint) {
      // rounding too early, going to make it not smooth gradient
      const distance = startPoint.distanceTo(endPoint)

      const colorGreenGradientVal = Math.max(
        0,
        255 - Math.round((255 / maximumLineLength) * distance)
      )
      const colorRedGradientVal = Math.min(
        255,
        Math.round((255 / maximumLineLength) * distance)
      )
      console.log(colorGreenGradientVal)
      const greenHex = colorGreenGradientVal.toString(16)
      const redHex = colorRedGradientVal.toString(16)
      console.log(
        '#' +
          (redHex.length == 1 ? '0' + redHex : redHex) +
          (greenHex.length == 1 ? '0' + greenHex : greenHex) +
          '00'
      )
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

  if (!isVisible || endPoint === undefined) {
    return <mesh></mesh>
  }

  return (
    <Line
      name='power-meter'
      points={[startPoint, endPoint]}
      color={getColorValueForGivenLength()}
      lineWidth={25}
    />
  )
}
