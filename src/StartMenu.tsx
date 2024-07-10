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
  ScaleFade,
  UnorderedList,
  Text,
} from '@chakra-ui/react'
import { FC } from 'react'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const StartMenu: FC<StartMenuProps> = ({ isOpen, onClose }) => {
  return (
    <ScaleFade initialScale={0.02} in={isOpen}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ScaleFade delay={0.1} initialScale={0.00002} in={isOpen}>
              <Heading lineHeight={'tall'} justifyContent={'flex'} display={'flex'}>
                {' '}
                Fore!
              </Heading>
            </ScaleFade>
          </ModalHeader>
          <ScaleFade delay={0.25} initialScale={0.00002} in={isOpen}>
            <ModalBody>
              <Text size={'4xl'} margin={2}>
                Hello there! I'm Luke, a passionate web developer and reasonably good
                minigolf enthusiast.
              </Text>
              <Text size={'4xl'} margin={2}>
                Thanks for stopping by my interactive portfolio. Let's dive in, Here's how
                to play:
              </Text>
              <UnorderedList margin={2}>
                <ListItem margin={2}>
                  Aim: Click on the ball and drag in the opposite direction of where you
                  want the ball to go.
                </ListItem>
                <ListItem margin={2}>
                  Power: The farther you drag, the more powerful your shot will be.
                </ListItem>
                <ListItem margin={2}>
                  Release: Let go to take your shot and watch the ball roll towards the
                  hole.
                </ListItem>
              </UnorderedList>
              <Text size={'4xl'} margin={2}>
                I'm a web developer with a love for creating engaging and dynamic user
                experiences. Enjoy the game and feel free to reach out if you have any
                questions or would like to collaborate! Happy golfing!
              </Text>
              <Text size={'4xl'} margin={2}>
                THIS IS A WORK IN PROGRESS!
              </Text>
            </ModalBody>
          </ScaleFade>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Get Started!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScaleFade>
  )
}
