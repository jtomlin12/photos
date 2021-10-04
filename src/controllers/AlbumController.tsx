import React, { FC, useRef } from 'react'
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

export type AlbumControllerProps = {
  albumContainer: React.ReactNode
  albumName: string
}

const AlbumController: FC<AlbumControllerProps> = ({
  albumContainer,
  albumName,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Center>
      <VStack>
        <Box p="1">
          <Button
            /*@ts-ignore*/
            ref={btnRef}
            colorScheme="teal"
            onClick={onOpen}
          >
            View Albums
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            /*@ts-ignore*/
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Text>Albums</Text>
              </DrawerHeader>

              <DrawerBody>{albumContainer}</DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
        <Box>
          {albumName !== '' ? (
            <Text>{'Showing Album: ' + albumName}</Text>
          ) : null}
        </Box>
      </VStack>
    </Center>
  )
}

export default AlbumController
