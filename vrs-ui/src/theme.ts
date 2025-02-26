import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.900'
      },
      ".b": {
        fontWeight: 'bold'
      }
    }
  },
})

export default theme