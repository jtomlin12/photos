import { FC } from 'react'

import {
  Box,
  Center,
  IconButton,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const TitleBar: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const iconBreakpoint = useBreakpointValue({ base: 'sm', md: 'md' })

  console.log(colorMode)
  return (
    <Center border="2px">
      <Box>
        <Text>Photos</Text>
      </Box>
      <Box>
        <IconButton
          aria-label="theme"
          variant="ghost"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          size={iconBreakpoint}
        />
      </Box>
    </Center>
  )
}
export default TitleBar
