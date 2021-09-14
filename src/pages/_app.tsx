import { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { WalletProvider } from '../context/WalletContext'

declare global {
  interface Window {
    ethereum: any;
    contract: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </ChakraProvider>
  )
}

export default MyApp
