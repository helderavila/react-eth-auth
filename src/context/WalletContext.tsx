/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { ethers } from 'ethers'

interface MetaAuthProviderProps {
  children: ReactNode
}

interface MetaAuthContextData {
  connectWallet: () => void;
  walletAddress: string | undefined;
  isWalletConnected: boolean;
  balance: string;
  chain: string;
}

const chains = {
  '1': 'mainnet',
  '3': 'ropsten',
  '4': 'rinkeby',
  '5': 'goerli',
  '42': 'kovan'
}

export const WalletContext = createContext({} as MetaAuthContextData)

export function WalletProvider({ children }: MetaAuthProviderProps) {
  const toast = useToast()

  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined)
  const [balance, setBalance] = useState<string | undefined>('')
  const [chain, setChain] = useState<string | undefined>('')
  const isWalletConnected = !!walletAddress

  useEffect(() => {
    handleConnectedWallet()
  }, [])

  async function getWalletBalance(address: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const walletBalance = await provider.getBalance(address)
    setBalance(ethers.utils.formatEther(walletBalance))
  }

  async function handleConnectedWallet() {
    if (window.ethereum) {
      try {
        const [account] = await window.ethereum.request({ method: 'eth_accounts' })
        const chainId = await window.ethereum.request({ method: 'net_version' })
        setChain(chains[chainId])

        if (account) {
          setWalletAddress(account)
          getWalletBalance(account)
        }
      } catch (err) {
        toast({
          title: 'Ooops!',
          description: 'An error ocurred with the wallet',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        })
      }
    } else {
      toast({
        title: 'Ooops!',
        description: 'First install metamask wallet',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const chainId = await window.ethereum.request({ method: 'net_version' })
        setChain(chains[chainId])

        if (account) {
          setWalletAddress(account)
          getWalletBalance(account)
        }
        toast({
          title: 'Yeeap! :)',
          description: 'Wallet connected!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        })
      } catch (err) {
        toast({
          title: 'Ooops!',
          description: 'An error ocurred with the wallet',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        })
      }
    } else {
      toast({
        title: 'Ooops!',
        description: 'First install metamask wallet',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  }

  return (
    <WalletContext.Provider value={{
      connectWallet,
      walletAddress,
      isWalletConnected,
      balance,
      chain
    }}>
      {children}
    </WalletContext.Provider>
  )
}

