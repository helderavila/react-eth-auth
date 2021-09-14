import { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { MetaAuthProvider } from '../context/MetaAuthContext'

declare global {
  interface Window {
    ethereum: any;
    contract: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MetaAuthProvider>
        <Component {...pageProps} />
      </MetaAuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
