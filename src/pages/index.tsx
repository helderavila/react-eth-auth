import {
  Box,
  Button,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { useWallet } from '../hooks/useMetaAuth'
import { chains } from '../constants/chains'
import { HiLightningBolt } from 'react-icons/hi'


export default function Home() {
  const { connectWallet, isWalletConnected, walletAddress, balance, chainId } = useWallet()

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

  if (!chains[chainId]) {
    return (
      <Box
        w="100%"
        h="100vh"
        bg="gray.900"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Popover>
          <PopoverTrigger>
            <Button
              background="#FF4848"
              borderRadius="25px"
              _hover={{
                background: "#FF4848",
                opacity: 0.7
              }}
              leftIcon={<HiLightningBolt />}
            >
              Wrong network
            </Button>
          </PopoverTrigger>
          <PopoverContent
            background="gray.900"
            borderColor="gray.800"
          >
            <PopoverCloseButton />
            <PopoverHeader borderColor="gray.800" color="gray.400">Wrong Network!</PopoverHeader>
            <PopoverBody color="gray.400">Please connect to the appropriate Ethereum network.</PopoverBody>
          </PopoverContent>
        </Popover>
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
        {chains[chainId].toUpperCase()}
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
