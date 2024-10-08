import {
  Button,
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  ListIcon,
  List,
  SimpleGrid,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'
import '../ModalStyling.css'
import {
  IconGolfShot,
  IconLeftClick,
  IconRightClick,
  IconRotate,
  IconScroll,
  IconZoom,
} from '../SvgIcons'

interface StartMenuProps {
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

export const textByTicker = new Map<number, JSX.Element>([
  [
    0,
    <>
      <Text size={'4xl'} margin={2}>
        Thanks for stopping by my portfolio <br /> <br />
        I'm Luke, a full-stack developer specializing in react <br />
        <br />
        Why not try some minigolf, and find out a little bit about me!
      </Text>
    </>,
  ],
  [
    1,
    <List spacing={5}>
      <ListItem>
        <ListIcon as={IconGolfShot} />
        Press & Hold the ball, then drag in the away. The further you drag, the more
        powerful your shot
      </ListItem>
      <ListItem>
        <ListIcon as={IconRotate} />
        Press and hold, then move the mouse to spin the camera
      </ListItem>
      <ListItem>
        <ListIcon as={IconZoom} />
        Use scroll to zoom in and out
      </ListItem>
    </List>,
  ],
  [
    2,
    <>
      <Text size={'4xl'} margin={2}>
        Enjoy the game and feel free to reach out if you have any questions or would like
        to collaborate!
      </Text>
      <Text size={'4xl'} margin={2}>
        Happy golfing!
      </Text>
    </>,
  ],
])

export const StartMenu: FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const [textTicker, setTextTicker] = useState<number>(0)

  return (
    <AnimatePresence>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
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
          className={'chakra-modal__content container'}
        >
          <div className='inner-container'>
            <ModalHeader>
              <Heading className='chakra-heading modal-title' lineHeight={'tall'}>
                Fore!
              </Heading>
            </ModalHeader>
            <ModalBody className='chakra-text modal-body'>
              {textByTicker.get(textTicker)}
              {textTicker === 1 && (
                <Text size={'2xl'} margin={2} as='i'>
                  <br />
                  Don't worry, you can find these controls again in the bottom right!
                </Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Tooltip
                label={'I know how to play already!'}
                hasArrow
                placement='top'
                borderRadius={'5px'}
                fontFamily={'Lilita One'}
              >
                <Button
                  colorScheme='red'
                  mr={3}
                  onClick={onClose}
                  className='chakra-button close-button'
                >
                  Skip Intro
                </Button>
              </Tooltip>
              <Button
                colorScheme='blue'
                mr={3}
                onClick={() => {
                  if (textTicker === 2) {
                    onClose()
                  } else {
                    setTextTicker((tick) => tick + 1)
                  }
                }}
                className='chakra-button next-button'
              >
                Next
              </Button>
            </ModalFooter>
          </div>
        </MotionModalContent>
      </Modal>
    </AnimatePresence>
  )
}
