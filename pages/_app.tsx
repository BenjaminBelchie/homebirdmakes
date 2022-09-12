import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
import {SessionProvider} from 'next-auth/react'

const theme = createTheme({
  typography: {
    fontFamily: ['"Arvo"', 'serif'].join(',')
   },
   palette:{
     primary: {
      main: '#264653',
      light:'#2A9D8F',
    },
   }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
    </SessionProvider>
    </>
    )
}

export default MyApp
