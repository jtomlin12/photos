import { FC } from 'react'

import {
  Box,
  Flex,
  IconButton,
  Spacer,
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
    <Flex border="2px">
      <Spacer />
      <Box>
        <Text fontSize="large" fontFamily="monospace">
          Photos
        </Text>
      </Box>
      <Spacer />
      <Box>
        <IconButton
          aria-label="theme"
          variant="ghost"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          size={iconBreakpoint}
        />
      </Box>
    </Flex>
  )
}
export default TitleBar
