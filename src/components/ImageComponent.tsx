import { FC, useState } from 'react'
import { AspectRatio, Image as ChakraImage, Skeleton } from '@chakra-ui/react'

interface ImageComponentProps {
  url: string
}

const ImageComponent: FC<ImageComponentProps> = ({ url }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const img = new Image()
  img.src = url
  img.onload = () => setIsLoaded(true)
  return (
    <Skeleton isLoaded={isLoaded}>
      <AspectRatio maxW="500px" ratio={1}>
        <ChakraImage src={url} loading="lazy" />
      </AspectRatio>
    </Skeleton>
  )
}

export default ImageComponent
