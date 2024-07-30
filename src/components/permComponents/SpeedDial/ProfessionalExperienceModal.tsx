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
import { IconCV, IconGithub, IconLinkedinCircled } from '../SvgIcons'
import { AnimatedHoverButton } from './MotionButton'
import { ButtonTypes } from './SpeedDialInfo'

interface ProfessionalExperienceModalProps {
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

export const ProfessionalExperienceModal: FC<ProfessionalExperienceModalProps> = ({
  isOpen,
  onClose,
}) => {
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
            <Heading lineHeight={'tall'}> Hole 2 Complete! </Heading>
          </ModalHeader>

          <ModalBody>
            {' '}
            Seems like you're getting the hang of it! <br />
            If you're interested in working together, checkout my CV below
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AnimatedHoverButton
                buttonType={'test'}
                icon={<IconCV />}
                onMouseEnter={() => setIsHovered(ButtonTypes.GitHub)}
                onMouseLeave={() => setIsHovered(ButtonTypes.None)}
                onClick={() => {
                  window.open('/Luke_Doughty_CV.pdf', '_blank')
                }}
              />
            </div>
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