import { FC, useState, useRef, useEffect } from 'react'
import {
  Box,
  Button,
  Center,
  Image as ChakraImage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Client } from 'minio'
import ImageComponent from './ImageComponent'

export type PhotoContainerProps = {
  albumName: string
}

const PhotoContainer: FC<PhotoContainerProps> = ({ albumName }) => {
  const [image, selectImage] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const fileRef = useRef<any>()
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [refresh, setRefresh] = useState({})

  const onClickWrapper = (image: string) => {
    selectImage(image)
    onOpen()
  }

  const minioClient = new Client({
    endPoint: 'minio.justintomlin.us',
    useSSL: false,
    accessKey: 'justin',
    secretKey: 'password',
  })

  const upload = async () => {
    const file = fileRef!.current!.files[0]
    if (file === undefined) return

    minioClient.putObject(
      albumName,
      file.name,
      Buffer.from(await new Response(file).arrayBuffer()),
      file.size,
      {
        'Content-Type': file.type,
      },
      (err) => {
        if (err) {
          toast({
            title: 'File could not be uploaded.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'File uploaded successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          setRefresh({})
        }
      }
    )
  }

  const stream = minioClient.listObjectsV2(albumName, '', true, '')

  useEffect(() => {
    setImageUrls([])
    stream.on('data', (bucketItem) => {
      minioClient.getObject(albumName, bucketItem.name, (error, dataStream) => {
        // @ts-ignore
        setImageUrls((url) => [...url, dataStream!.url])
      })
    })
    stream.on('error', (err) => {
      console.log(err)
    })
  }, [albumName, refresh])

  return (
    <>
      <Center>
        <Box p="2">
          <Input ref={fileRef} type="file" />
        </Box>
        <Box>
          <Button onClick={upload}>UPLOAD</Button>
        </Box>
      </Center>
      <SimpleGrid minChildWidth="200px" spacing="10px" p="2">
        {imageUrls.map((image: string, key: number) => {
          return (
            <Box key={key} onClick={() => onClickWrapper(image)}>
              <ImageComponent url={image} />
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
              <ChakraImage objectFit="fill" src={image} />
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
