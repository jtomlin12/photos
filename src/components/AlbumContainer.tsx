import { FC, useState, useEffect, FormEvent, KeyboardEvent } from 'react'
import { Box, Button, Input, Tooltip, useToast, VStack } from '@chakra-ui/react'
import { Client, BucketItemFromList } from 'minio'

export type AlbumContainerProps = {
  selectedAlbumNameHandler: (message: string) => void
}

const AlbumContainer: FC<AlbumContainerProps> = ({
  selectedAlbumNameHandler,
}) => {
  const [albumNames, setAlbumNames] = useState<BucketItemFromList[]>([])
  const [newAlbumName, setNewAlbumName] = useState<string>()
  const [refreshList, setRefreshList] = useState(false)
  const toast = useToast()

  const handleNewAlbumInput = (event: FormEvent<HTMLInputElement>) =>
    setNewAlbumName(event.currentTarget.value)
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (newAlbumName === undefined) return
      minioClient.makeBucket(newAlbumName, 'us-east-1', function (err) {
        if (err) {
          toast({
            title: 'Album could not be created.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Album created successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
        setRefreshList(true)
      })
    }
  }

  const minioClient = new Client({
    endPoint: 'minio.justintomlin.us',
    useSSL: false,
    accessKey: 'justin',
    secretKey: 'password',
  })

  const updateList = () => {
    setAlbumNames([])
    minioClient.listBuckets(function (err, albums) {
      if (err) return console.log(err)
      albums.map((album: BucketItemFromList) =>
        setAlbumNames((name) => [...name, album])
      )
    })
  }

  useEffect(() => {
    updateList()
  }, [, refreshList])

  return (
    <VStack>
      {albumNames.map((item: BucketItemFromList, key: number) => {
        return (
          <Tooltip key={key} label={'Created ' + item.creationDate}>
            <Button
              width="100%"
              onClick={() => selectedAlbumNameHandler(item.name)}
            >
              {item.name}
            </Button>
          </Tooltip>
        )
      })}
      <Box w="100%">
        <Input
          borderRadius="2px"
          placeholder="Enter New Album Name"
          onChange={handleNewAlbumInput}
          onKeyDown={handleKeyDown}
        />
      </Box>
    </VStack>
  )
}

export default AlbumContainer
