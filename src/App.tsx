import { FC } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import TitleBar from './components/TitleBar'
import PhotoContainer from './components/PhotoContainer'

const App: FC = () => (
  <ChakraProvider>
    <TitleBar />
    <PhotoContainer />
  </ChakraProvider>
)

export default App
