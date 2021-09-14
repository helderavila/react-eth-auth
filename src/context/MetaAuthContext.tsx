/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'

interface MetaAuthProviderProps {
  children: ReactNode
}

interface MetaAuthContextData {
  connectWallet: () => void;
  walletAddress: string | undefined;
  isWalletConnected: boolean;
}

export const MetaAuthContext = createContext({} as MetaAuthContextData)

export function MetaAuthProvider({ children }: MetaAuthProviderProps) {
  const toast = useToast()

  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined)
  const isWalletConnected = !!walletAddress
  
  useEffect(() => {
    handleConnectedWallet()
  },[])

  async function handleConnectedWallet() {
    if (window.ethereum) {
      try {
        const [account] = await window.ethereum.request({ method: 'eth_accounts' })
        setWalletAddress(account)
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
    <MetaAuthContext.Provider value={{
      connectWallet,
      walletAddress,
      isWalletConnected
    }}>
      {children}
    </MetaAuthContext.Provider>
  )
}

