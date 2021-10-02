import { FC, useState, useRef, useEffect } from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Client } from 'minio'

export type PhotoContainerProps = {
  albumName: string
}

const PhotoContainer: FC<PhotoContainerProps> = ({ albumName }) => {
  const [image, selectImage] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const fileRef = useRef<any>()
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  const onClickWrapper = (image: string) => {
    selectImage(image)
    onOpen()
  }

  const minioClient = new Client({
    endPoint: '192.168.1.17',
    port: 9000,
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
        }
      }
    )
    setTimeout(() => window.location.reload(), 5000)
  }

  const stream = minioClient.listObjectsV2(albumName, '', true, '')

  useEffect(() => {
    setImageUrls([])
    stream.on('data', (bucketItem) => {
      minioClient.getObject(albumName, bucketItem.name, (error, dataStream) =>
        // @ts-ignore
        setImageUrls((url) => [...url, dataStream!.url])
      )
    })
    stream.on('error', (err) => {
      console.log(err)
    })
  }, [albumName, fileRef])

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
      {!loaded ? (
        <Center>
          <Spinner />
        </Center>
      ) : null}
      <SimpleGrid minChildWidth="200px" spacing="10px" p="2">
        {imageUrls.map((image: string, key: number) => {
          return (
            <AspectRatio key={key} onClick={() => onClickWrapper(image)}>
              <Image
                src={image}
                loading="eager"
                onLoad={() => setLoaded(true)}
                style={loaded ? {} : { display: 'none' }}
              />
            </AspectRatio>
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
              <Image objectFit="fill" src={image} />
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
