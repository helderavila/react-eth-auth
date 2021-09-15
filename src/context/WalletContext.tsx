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
    addAccountListener()
  }, [])

  function addChainListener() {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', async (chainId) => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        setChainId(chainId)
        getWalletBalance(accounts[0])
        // window.location.reload();
      });
    }
  }

  function addAccountListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          getWalletBalance(accounts[0])
        }
      });
    }
  }

  async function getWalletBalance(account) {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const walletBalance = await provider.getBalance(account)

      setBalance(ethers.utils.formatEther(walletBalance))
    }
  }

  async function handleConnectedWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        // if (!chains[chainId]) throw new Error("Please connect to the appropriate Ethereum network.")
        if (accounts.length > 0 && chainId) {
          setWalletAddress(accounts[0])
          getWalletBalance(accounts[0])
          setChainId(chainId)
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
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })

        // if (!chains[chainId]) throw new Error("Please connect to the appropriate Ethereum network.")

        if (accounts.length > 0 && chainId) {
          setWalletAddress(accounts[0])
          getWalletBalance(accounts[0])
          setChainId(chainId)
        } else {
          throw new Error("An error ocurred")
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

