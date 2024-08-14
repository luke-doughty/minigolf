import { Box, Cylinder, Line, Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef, useState } from 'react'
import { Euler, Mesh, SphereGeometry, Vector2, Vector3 } from 'three'
/**
 * PowerMeter Props
 *
 * @typedef {Object} PowerMeterProps
 * @extends RigidBodyProps
 * @property {Vector3} isVisible - Whether to render the Power Meter Line.
 * @property {Vector3} startPoint - Start Point of the line (Should be ball position).
 * @property {Vector3} endPoint - End Point of the line (Should be mouse position).
 * @property {Vector3} maximumLineLength - The maximum length of the power meter.
 */
interface PowerMeterProps {
  isVisible: boolean
  startPoint: Vector3
  endPoint: Vector3
  maximumLineLength: number
}

/**
 * PowerMeter component.
 *
 * This returns a PowerMeter Model that is rendered from the ball too a mouse position.
 *
 * @param {PowerMeterProps} Props - The properties for the PowerMeter component.
 * @returns {JSX.Element} The rendered PowerMeter component.
 */

export const PowerMeter: FC<PowerMeterProps> = ({
  isVisible,
  startPoint,
  endPoint,
  maximumLineLength,
}) => {
  const [endPointCalculated, setEndPointCalculated] = useState<Vector3>(null!)

  useFrame(({ pointer, raycaster, camera, scene }) => {
    if (startPoint && endPoint) {
      const direction = new Vector3().subVectors(endPoint, startPoint)
      const distance = direction.length()
      if (distance > maximumLineLength) {
        direction.normalize()
        direction.multiplyScalar(maximumLineLength)

        const newEndPoint = new Vector3().addVectors(startPoint, direction)

        setEndPointCalculated(newEndPoint)
      } else {
        setEndPointCalculated(endPoint)
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
        points={[startPoint, endPointCalculated ?? endPoint]}
        color={getColorValueForGivenLength()}
        lineWidth={14}
      />
    </>
  )
}
