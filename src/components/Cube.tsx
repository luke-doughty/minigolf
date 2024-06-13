import { Box } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { forwardRef } from 'react'
import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

type CubeType = Mesh<BoxGeometry, MeshBasicMaterial>

const Cube = forwardRef<CubeType>((_, ref) => (
  <RigidBody type='kinematicPosition'>
    <Box position={[1, 0, 0]} args={[1, 1, 1]}>
      <meshStandardMaterial color={'darkorange'} />
    </Box>
  </RigidBody>
))

export { Cube }


