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
}

export const WalletContext = createContext({} as MetaAuthContextData)

export function WalletProvider({ children }: MetaAuthProviderProps) {
  const toast = useToast()

  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined)
  const [balance, setBalance] = useState<string | undefined>()
  const isWalletConnected = !!walletAddress
  
  useEffect(() => {
    handleConnectedWallet()
  },[])

  async function getWalletBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const walletBalance = await provider.getBalance(walletAddress)
    setBalance(ethers.utils.formatEther(walletBalance))
  }

  async function handleConnectedWallet() {
    if (window.ethereum) {
      try {
        const [account] = await window.ethereum.request({ method: 'eth_accounts' })
        setWalletAddress(account)
        getWalletBalance()
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
        setWalletAddress(account)
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
      balance
    }}>
      {children}
    </WalletContext.Provider>
  )
}

