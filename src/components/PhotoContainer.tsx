import { FC } from 'react'
import { Box, Image, SimpleGrid } from '@chakra-ui/react'
import images from './ReadFiles'

const PhotoContainer: FC = () => {
  console.log(images)
  return (
    <SimpleGrid minChildWidth="300px" spacing="10px">
      {images.map((image: string, key: number) => {
        return (
          <Box key={key}>
            <Image src={image} />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

export default PhotoContainer
