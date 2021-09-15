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
  chainId: string;
}

export const WalletContext = createContext({} as MetaAuthContextData)

export function WalletProvider({ children }: MetaAuthProviderProps) {
  const toast = useToast()

  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined)
  const [balance, setBalance] = useState<string | undefined>('')
  const [chainId, setChainId] = useState<string | undefined>('')
  const isWalletConnected = !!walletAddress

  useEffect(() => {
    handleConnectedWallet()
    addChainListener()
  }, [])

  function addChainListener() {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(chainId)
        getWalletBalance(walletAddress)
        // window.location.reload();
      });
    }
  }

  async function getWalletBalance(address: string) {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const [account] = await window.ethereum.request({ method: 'eth_accounts' })
      const walletBalance = await provider.getBalance(account)

      setBalance(ethers.utils.formatEther(walletBalance))
    }
  }

  async function handleConnectedWallet() {
    if (window.ethereum) {
      try {
        const [account] = await window.ethereum.request({ method: 'eth_accounts' })
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        // if (!chains[chainId]) throw new Error("Please connect to the appropriate Ethereum network.")
        setChainId(chainId)
        if (account) {
          setWalletAddress(account)
          getWalletBalance(account)
        }
      } catch (err) {
        toast({
          title: 'Ooops!',
          description: err.message,
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
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })

        // if (!chains[chainId]) throw new Error("Please connect to the appropriate Ethereum network.")

        setChainId(chainId)

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
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        })
      }
    } else {
      toast({
        title: 'Ooops!',
        description: 'Install metamask',
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
      chainId
    }}>
      {children}
    </WalletContext.Provider>
  )
}

