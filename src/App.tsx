import { FC } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import TitleBar from './components/TitleBar'
import PhotoAlbum from './pages/PhotoAlbum'

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontSize: 'large',
        fontFamily: 'monospace',
        borderRadius: '2px',
      },
    },
    Text: {
      baseStyle: {
        fontSize: 'large',
        fontFamily: 'monospace',
      },
    },
    Input: {
      parts: ['field'],
      baseStyle: {
        field: {
          fontSize: 'large',
          fontFamily: 'monospace',
        },
      },
    },
  },
})

const App: FC = () => (
  <ChakraProvider theme={theme}>
    <TitleBar />
    <PhotoAlbum />
  </ChakraProvider>
)

export default App
