import {
  Box,
  Button,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  useColorMode
} from '@chakra-ui/react'
import { useWallet } from '../hooks/useMetaAuth'
import { chains } from '../constants/chains'
import { HiLightningBolt } from 'react-icons/hi'
import { shortenAddress } from '../utils'

export function WalletInfo() {
  const { connectWallet, isWalletConnected, walletAddress, balance, chainId } = useWallet()
  const { colorMode } = useColorMode()

  if (!isWalletConnected) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button 
          borderRadius="25px" 
          colorScheme="pink" 
          onClick={connectWallet}
          variant="ghost"
        >
          Connect wallet
        </Button>
      </Box>
    )
  }

  if (!chains[chainId]) {
    return (
      <Box
        w="100%"
        h="100vh"
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
          >
            <PopoverCloseButton />
            <PopoverHeader>Wrong Network!</PopoverHeader>
            <PopoverBody>Please connect to the appropriate Ethereum network.</PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    )
  }

  return (
    <Box
      w="100%"
      h="100vh"
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
        bg="gray.900"
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
            {shortenAddress(walletAddress)}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}