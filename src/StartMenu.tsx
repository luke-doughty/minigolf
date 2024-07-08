import {
  Button,
  Menu,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
} from '@chakra-ui/react'
import { RigidBodyProps } from '@react-three/rapier'
import { FC } from 'react'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const StartMenu: FC<StartMenuProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
      motionPreset='slideInBottom'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Intro Text</ModalHeader>
        <ModalBody>other text</ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Get Started!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    // <Modal isOpen={true} onClose={() => console.log('terst')}>
    //   {' '}
    //   hello
    // </Modal>
  )
}
