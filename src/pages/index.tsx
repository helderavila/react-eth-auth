import { Box, Button, Text, Badge } from '@chakra-ui/react'
import { useMetaAuth } from '../hooks/useMetaAuth'

export default function Home() {
  const { connectWallet, isWalletConnected, walletAddress } = useMetaAuth()

  if (!isWalletConnected) {
    return (
      <Box
        w="100%"
        h="100vh"
        bg="gray.900"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button colorScheme="pink" size="lg" onClick={connectWallet}> 🦊 Connect wallet</Button>
      </Box>
    )
  }

  return (
    <Box
      w="100%"
      h="100vh"
      bg="gray.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        color="gray.400"
        fontWeight="bold"
      >
        Wallet connected: {walletAddress}
      </Text>
    </Box>
  )
}
