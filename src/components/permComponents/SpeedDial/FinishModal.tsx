import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'
import { IconCV, IconGithub, IconLinkedinCircled } from '../SvgIcons'
import { AnimatedHoverButton } from './MotionButton'
import { ButtonTypes } from './SpeedDialInfo'

interface FinishModalProps {
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

export const FinishModal: FC<FinishModalProps> = ({ isOpen, onClose }) => {
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
            <Heading lineHeight={'tall'}> Finished! </Heading>
          </ModalHeader>

          <ModalBody>
            {' '}
            You Finished! <br />
            <Box bg='white' borderRadius='lg'>
              <Box m={8} color='#0B0E3F'>
                <VStack spacing={5}>
                  <FormControl id='name'>
                    <FormLabel>Your Name</FormLabel>
                    <InputGroup borderColor='#E0E1E7'>
                      <InputLeftElement pointerEvents='none'></InputLeftElement>
                      <Input type='text' size='md' />
                    </InputGroup>
                  </FormControl>
                  <FormControl id='name'>
                    <FormLabel>Mail</FormLabel>
                    <InputGroup borderColor='#E0E1E7'>
                      <InputLeftElement pointerEvents='none'></InputLeftElement>
                      <Input type='text' size='md' />
                    </InputGroup>
                  </FormControl>
                  <FormControl id='name'>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      borderColor='gray.300'
                      _hover={{
                        borderRadius: 'gray.300',
                      }}
                      placeholder='message'
                    />
                  </FormControl>
                  <FormControl id='name' float='right'>
                    <Button variant='solid' bg='#0D74FF' color='white' _hover={{}}>
                      Send Message
                    </Button>
                  </FormControl>
                </VStack>
              </Box>
            </Box>
          </ModalBody>
        </MotionModalContent>
      </Modal>
    </AnimatePresence>
  )
}
