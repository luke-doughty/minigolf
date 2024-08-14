import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { FC, useState } from 'react'
import '../ModalStyling.css'

interface FinishModalProps {
  isOpen: boolean
  onClose: () => void
  totalShots: number
}

interface TextByTicker {
  0: JSX.Element
  1: JSX.Element
  2: JSX.Element
}

// @ts-ignore
const MotionModalContent = motion(ModalContent)

export const ScoreBoardModal: FC<FinishModalProps> = ({
  isOpen,
  onClose,
  totalShots,
}) => {
  const [text, setText] = useState<string>('AAA')

  const controlsLeft = useAnimation()
  const controlsMiddle = useAnimation()
  const controlsRight = useAnimation()

  // 0 = left, 1 = middle, 2=right
  const handleScrollUp = (characterSlot: number) => {
    if (characterSlot === 0) {
      setText(
        (text) =>
          String.fromCharCode(text.charCodeAt(0) === 90 ? 65 : text.charCodeAt(0) + 1) +
          text.slice(1)
      )
      controlsLeft.start({
        y: ['0%', '-100%', '100%', '100%', '0%'],
        opacity: ['100%', '0%', '0%', '0%', '100%'],
        transition: { duration: 0.5 },
      })
    }
    if (characterSlot === 1) {
      setText(
        (text) =>
          text[0] +
          String.fromCharCode(text.charCodeAt(1) === 90 ? 65 : text.charCodeAt(1) + 1) +
          text[2]
      )
      controlsMiddle.start({
        y: ['0%', '-100%', '100%', '100%', '0%'],
        opacity: ['100%', '0%', '0%', '0%', '100%'],
        transition: { duration: 0.5 },
      })
    }
    if (characterSlot === 2) {
      setText(
        (text) =>
          text[0] +
          text[1] +
          String.fromCharCode(text.charCodeAt(2) === 90 ? 65 : text.charCodeAt(2) + 1)
      )
      controlsRight.start({
        y: ['0%', '-100%', '100%', '100%', '0%'],
        opacity: ['100%', '0%', '0%', '0%', '100%'],
        transition: { duration: 0.5 },
      })
    }
  }

  const handleScrollDown = (characterSlot: number) => {
    if (characterSlot === 0) {
      setText(
        (text) =>
          String.fromCharCode(text.charCodeAt(0) === 65 ? 90 : text.charCodeAt(0) - 1) +
          text.slice(1)
      )
      controlsLeft.start({
        y: ['0%', '100%', '-100%', '-100%', '0%'],
        opacity: ['100%', '0%', '0%', '0%', '100%'],
        transition: { duration: 0.5 },
      })
    }
    if (characterSlot === 1) {
      setText(
        (text) =>
          text[0] +
          String.fromCharCode(text.charCodeAt(1) === 65 ? 90 : text.charCodeAt(1) - 1) +
          text[2]
      )
      controlsMiddle.start({
        y: ['0%', '100%', '-100%', '-100%', '0%'],
        opacity: ['100%', '0%', '0%', '0%', '100%'],
        transition: { duration: 0.5 },
      })
    }
    if (characterSlot === 2) {
      setText(
        (text) =>
          text[0] +
          text[1] +
          String.fromCharCode(text.charCodeAt(2) === 65 ? 90 : text.charCodeAt(2) - 1)
      )
      controlsRight.start({
        y: ['0%', '100%', '-100%', '-100%', '0%'],
        opacity: ['100%', '0%', '0%', '0%', '100%'],
        transition: { duration: 0.5 },
      })
    }
    controlsLeft.start({
      transition: { duration: 0.5 },
    })
  }

  const toast = useToast()

  const handleSubmitScore = async () => {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    // This is bad but I need to fix vercel.json to not use this
    const request: RequestInfo = new Request(
      'https://minigolf-backend.vercel.app/api/storeScore',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name: text, score: totalShots }),
      }
    )

    const response = await fetch(request)
    if (response.status === 200) {
      onClose()
    } else {
      toast({
        title: 'Failed to Save',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      })
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
            <ModalHeader>
              <Heading className={'chakra-heading modal-title'}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  Enter Name!
                </div>
              </Heading>
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  paddingBottom: '20px',
                }}
              >
                <div
                  className='triangle-upwards'
                  onClick={() => {
                    handleScrollUp(0)
                  }}
                />
                <div
                  className='triangle-upwards'
                  onClick={() => {
                    handleScrollUp(1)
                  }}
                />
                <div
                  className='triangle-upwards'
                  onClick={() => {
                    handleScrollUp(2)
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
              >
                <motion.div
                  animate={controlsLeft}
                  initial={{ opacity: '100%', y: '0%' }}
                  className={'moving-letter'}
                >
                  <span>{text[0]}</span>
                </motion.div>
                <motion.div
                  animate={controlsMiddle}
                  initial={{ opacity: '100%', y: '0%' }}
                  className={'moving-letter'}
                >
                  <span>{text[1]}</span>
                </motion.div>
                <motion.div
                  animate={controlsRight}
                  initial={{ opacity: '100%', y: '0%' }}
                  className={'moving-letter'}
                >
                  <span>{text[2]}</span>
                </motion.div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  paddingTop: '20px',
                }}
              >
                <div
                  className='triangle-downwards'
                  onClick={() => {
                    handleScrollDown(0)
                  }}
                />
                <div
                  className='triangle-downwards'
                  onClick={() => {
                    handleScrollDown(1)
                  }}
                />
                <div
                  className='triangle-downwards'
                  onClick={() => {
                    handleScrollDown(2)
                  }}
                />
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-around' }}
                className={'chakra-heading modal-title'}
              >
                Score: {totalShots}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                onClick={handleSubmitScore}
                className='chakra-button next-button'
              >
                Submit
              </Button>
            </ModalFooter>
          </div>
        </MotionModalContent>
      </Modal>
    </AnimatePresence>
  )
}
