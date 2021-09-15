import { Box, Button, Text, Badge } from '@chakra-ui/react'
import { useWallet } from '../hooks/useMetaAuth'

export default function Home() {
  const { connectWallet, isWalletConnected, walletAddress, balance, chain } = useWallet()

  console.log(balance)

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

        <Text fontSize="xs" color="yellow.500" fontWeight="bold">
          {chain.toUpperCase()}
        </Text>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.800"
        borderRadius="25px"
        paddingLeft="5"
        ml="2"
        >
        <Text
          color="gray.400"
          fontWeight="bold"
          mr="3"
        >
          {balance.slice(0, 3)} ETH
        </Text>
        <Box
          bg="gray.700"
          h="100%"
          py="2"
          px="4"
          borderRadius="25px"
        >
          <Text
            color="gray.400"
            fontWeight="bold"
          >
            {walletAddress.slice(0, 10)}...
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
