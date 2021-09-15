import { Box, IconButton, HStack, useColorMode } from '@chakra-ui/react'
import { BiSun, BiMoon } from 'react-icons/bi'
import { WalletInfo } from './WalletInfo'

export function Account() {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <HStack spacing="4">
        <WalletInfo />
        {/* <IconButton
          aria-label="Search database"
          icon={colorMode === 'dark' ? <BiSun /> : <BiMoon />}
          onClick={toggleColorMode}
        /> */}
      </HStack>
    </Box>
  )
}