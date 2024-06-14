import { Box, Line, Sphere } from '@react-three/drei'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'
import { FC, useRef } from 'react'
import { Euler, Mesh, Vector2, Vector3 } from 'three'

interface PowerMeterProps {
  isVisible: boolean
  startPoint: Vector3
  endPoint: Vector3
}

export const PowerMeter: FC<PowerMeterProps> = ({ isVisible, startPoint, endPoint }) => {
  if (!isVisible || endPoint === undefined) {
    return <mesh></mesh>
  }
  return (
    <Line
      points={[startPoint, endPoint]}
      color='black' // Default
      lineWidth={10} // In pixels (default)
      // vertexColors={[[0, 0, 0], ...]} // Optional array of RGB values for each point
      // {...lineProps}                  // All THREE.Line2 props are valid
      // {...materialProps}              // All THREE.LineMaterial props are valid
    />
  )
}
