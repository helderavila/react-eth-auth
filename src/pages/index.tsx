import {
  Box,
  useColorMode
} from '@chakra-ui/react'
import { Account } from '../components/Account'

export default function Home() {
  const { colorMode } = useColorMode()  
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Account />
    </Box>
  )
}
