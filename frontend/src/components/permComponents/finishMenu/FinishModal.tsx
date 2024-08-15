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
import React from 'react'
import { FC, useEffect, useState } from 'react'
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

export const FinishModal: FC<FinishModalProps> = ({ isOpen, onClose }) => {
  interface Score {
    score: number
    names: string[]
  }

  const [scores, setScores] = useState<Score[]>([])

  const apiUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    if (isOpen) {
      fetch(`${apiUrl}/getScores`)
        .then((response) => response.json())
        .then((data: Score[]) => {
          setScores(data)
        })
        .catch((error) => {
          console.error('Error fetching scores:', error)
        })
    }
  }, [isOpen])

  const [formToSend, setFormToSend] = useState<HTMLFormElement>()

  const toast = useToast()

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
      motionPreset='slideInBottom'
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent className={'chakra-modal__content container'}>
        <div className='inner-container'>
          <ModalBody>
            <ModalHeader>
              <Heading className={'chakra-heading modal-title'}>Game Over</Heading>
            </ModalHeader>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                height: '100%',
              }}
            >
              <Box>
                <div className='leaderboard'>
                  <div className='leaderboard-title'>High Scores</div>
                  {scores.map((namesPerScore) => {
                    const scoreElements = namesPerScore.names.map((name, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <div key={name + '-' + idx} className='leaderboard-entries'>
                            {name}
                          </div>
                          <div
                            key={namesPerScore.score + '-' + name + '-' + idx}
                            className='leaderboard-entries'
                          >
                            {namesPerScore.score}
                          </div>
                        </React.Fragment>
                      )
                    })
                    return scoreElements
                  })}
                </div>
              </Box>
              <form
                onChange={(form) => setFormToSend(form.currentTarget)}
                style={{
                  paddingLeft: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  className={'chakra-text modal-body'}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  Let's keep in touch! <br />
                </div>

                <FormControl id='name'>
                  <FormLabel
                    className={'chakra-text modal-body'}
                    display={'flex'}
                    justifyContent={'flex-end'}
                  >
                    Your Name
                  </FormLabel>
                  <InputGroup borderColor='#E0E1E7'>
                    <Input type='text' name='name' size='md' required />
                  </InputGroup>
                </FormControl>
                <FormControl id='mail'>
                  <FormLabel
                    className={'chakra-text modal-body'}
                    display={'flex'}
                    justifyContent={'flex-end'}
                  >
                    Email
                  </FormLabel>
                  <InputGroup borderColor='#E0E1E7'>
                    <Input type='email' name='email' size='md' required />
                  </InputGroup>
                </FormControl>
                <FormControl id='message'>
                  <FormLabel
                    className={'chakra-text modal-body'}
                    display={'flex'}
                    justifyContent={'flex-end'}
                  >
                    Message
                  </FormLabel>
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
      </ModalContent>
    </Modal>
  )
}
