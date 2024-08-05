import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'
import '../ModalStyling.css'

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
  const [formToSend, setFormToSend] = useState<HTMLFormElement>()

  const toast = useToast()
  const applaud = new Audio('/audio/Clap.mp3')
  if (isOpen) {
    applaud.play()
  }

  const handleSubmit = async () => {
    if (formToSend) {
      const formData = new FormData(formToSend)

      try {
        const response = await fetch('https://formspree.io/f/xdkngany', {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        })

        if (response.ok) {
          toast({
            title: 'Message Recieved!',
            status: 'success',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })
          formToSend.reset()
        } else {
          toast({
            title: 'Message Failed!',
            status: 'error',
            position: 'top',
            duration: 4000,
            isClosable: true,
          })
        }
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: 'Message Failed!',
          status: 'error',
          position: 'top',
          duration: 4000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <AnimatePresence>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
        isCentered
        motionPreset='slideInBottom'
        size={'xl'}
      >
        <ModalOverlay />
        <MotionModalContent
          initial={{ scale: 1, x: '48vw', y: '48vh' }}
          exit={{ scale: 0.1, x: '48vw', y: '48vh', opacity: 0 }}
          animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={'chakra-modal__content container'}
        >
          <div className='inner-container'>
            <ModalBody>
              <ModalHeader>
                <Heading className={'chakra-heading modal-title'}>End!</Heading>
              </ModalHeader>
              <div style={{ display: 'flex' }}>
                <ModalBody
                  className={'chakra-text modal-body'}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  I hope you enjoyed this portfolio <br />
                  Let's keep in touch! <br />
                </ModalBody>

                <form
                  onChange={(form) => setFormToSend(form.currentTarget)}
                  style={{ paddingTop: 20, paddingBottom: 20 }}
                >
                  <FormControl id='name'>
                    <FormLabel className={'chakra-text modal-body'}>Your Name</FormLabel>
                    <InputGroup borderColor='#E0E1E7'>
                      <Input type='text' name='name' size='md' required />
                    </InputGroup>
                  </FormControl>
                  <FormControl id='mail'>
                    <FormLabel className={'chakra-text modal-body'}>Email</FormLabel>
                    <InputGroup borderColor='#E0E1E7'>
                      <Input type='email' name='email' size='md' required />
                    </InputGroup>
                  </FormControl>
                  <FormControl id='message'>
                    <FormLabel className={'chakra-text modal-body'}>Message</FormLabel>
                    <Textarea
                      borderColor='gray.300'
                      _hover={{
                        borderRadius: 'gray.300',
                      }}
                      placeholder='message'
                      name='message'
                      required
                    />
                  </FormControl>
                  <FormControl
                    id='submit'
                    float='right'
                    style={{ justifyContent: 'flex-end', display: 'flex', padding: 10 }}
                  ></FormControl>
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type='submit'
                variant='solid'
                bg='#0D74FF'
                color='white'
                className={'chakra-button next-button'}
                onClick={handleSubmit}
              >
                Send Message
              </Button>
            </ModalFooter>
          </div>
        </MotionModalContent>
      </Modal>
    </AnimatePresence>
  )
}
