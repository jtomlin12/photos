import { FC, useState, useRef, useEffect } from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
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

const PhotoContainer: FC = () => {
  const [image, selectImage] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const fileRef = useRef<any>()
  const [imageUrls, setImageUrls] = useState<string[]>([])

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

    // KEEP
    // alternative way
    // minioClient.presignedPutObject(
    //   'album',
    //   file.name,
    //   246060,
    //   function (err, presignedUrl) {
    //     if (err) return console.log(err)
    //     console.log(presignedUrl)
    //     fetch(presignedUrl, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': file.type,
    //       },
    //       body: file,
    //     }).then((e) => console.log(e))
    //   }
    // )

    // better way
    minioClient.putObject(
      'album',
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
        }
        toast({
          title: 'File uploaded successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    )
    setTimeout(() => window.location.reload(), 5000)
  }

  const stream = minioClient.listObjectsV2('album', '', true, '')

  useEffect(() => {
    stream.on('data', (bucketItem) => {
      minioClient.getObject('album', bucketItem.name, (error, dataStream) =>
        // @ts-ignore
        setImageUrls((url) => [...url, dataStream!.url])
      )
    })
    stream.on('error', (err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <Flex alignItems="center">
        <Button onClick={upload}>UPLOAD</Button>
        <Input ref={fileRef} type="file" />
      </Flex>
      <SimpleGrid minChildWidth="200px" spacing="10px">
        {imageUrls.map((image: string, key: number) => {
          return (
            <AspectRatio key={key} onClick={() => onClickWrapper(image)}>
              <Image src={image} objectFit="cover" />
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
