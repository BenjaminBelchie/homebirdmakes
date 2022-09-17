import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
import { UserProvider } from '@auth0/nextjs-auth0';

const theme = createTheme({
  typography: {
    fontFamily: ['"Arvo"', 'serif'].join(',')
   },
   palette:{
     primary: {
      main: '#264653',
      light:'#2A9D8F',
    },
    secondary: {
      main:'#ffffff'
    }
   }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <UserProvider>
      <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
    </UserProvider>
    </>
    )
}

export default MyApp
