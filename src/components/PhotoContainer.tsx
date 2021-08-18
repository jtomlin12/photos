import { FC, useState } from 'react'
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'
import images from '../utils/ReadFiles'

const PhotoContainer: FC = () => {
  const [image, selectImage] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log(images)

  const onClickWrapper = (image: string) => {
    selectImage(image)
    console.log(image)
    onOpen()
  }

  return (
    <>
      <SimpleGrid minChildWidth="200px" spacing="10px">
        {images.map((image: string, key: number) => {
          return (
            <Box key={key} onClick={() => onClickWrapper(image)}>
              <Image src={image} />
            </Box>
          )
        })}
      </SimpleGrid>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={'full'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody onClick={onClose}>
            <Box paddingTop="500px">
              <Image src={image} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PhotoContainer
