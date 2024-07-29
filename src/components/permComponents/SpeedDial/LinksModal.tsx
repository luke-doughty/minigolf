import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'
import { IconGithub, IconLinkedinCircled } from '../SvgIcons'
import { AnimatedHoverButton } from './MotionButton'
import { ButtonTypes } from './SpeedDialInfo'

interface LinksModalProps {
  isOpen: boolean
  onClose: () => void
}

interface TextByTicker {
  0: JSX.Element
  1: JSX.Element
  2: JSX.Element
}

// @ts-ignore
const MotionModalContent = motion(ModalContent)

export const LinksModal: FC<LinksModalProps> = ({ isOpen, onClose }) => {
  const [isHovered, setIsHovered] = useState<ButtonTypes>(ButtonTypes.None)

  return (
    <AnimatePresence>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
        isCentered
        motionPreset='slideInBottom'
        size={'md'}
      >
        <ModalOverlay />
        <MotionModalContent
          initial={{ scale: 1, x: '48vw', y: '48vh' }}
          exit={{ scale: 0.1, x: '48vw', y: '48vh', opacity: 0 }}
          animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ModalHeader>
            <Heading lineHeight={'tall'}> Hole 1 Complete! </Heading>
          </ModalHeader>

          <ModalBody>
            {' '}
            Congrats on finishing the first hole! <br />
            If you're interested, checkout my LinkedIn and GitHub
            <AnimatedHoverButton
              buttonType={'test'}
              icon={<IconGithub />}
              onMouseEnter={() => setIsHovered(ButtonTypes.GitHub)}
              onMouseLeave={() => setIsHovered(ButtonTypes.None)}
              onClick={() => {
                window.open('https://github.com/luke-doughty', 'myWindow')
              }}
            />
            <AnimatedHoverButton
              buttonType={'test'}
              icon={<IconLinkedinCircled />}
              onMouseEnter={() => setIsHovered(ButtonTypes.LinkedIn)}
              onMouseLeave={() => setIsHovered(ButtonTypes.None)}
              onClick={() =>
                window.open('https://www.linkedin.com/in/luke-doughty/', 'myWindow')
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => {
                onClose()
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </MotionModalContent>
      </Modal>
    </AnimatePresence>
  )
}
