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
      main: '#3D4246',
      light:'#2A9D8F',
    },
    secondary: {
      main:'#F4C1E3'
    },
    info:{
      main:"#788188"
    }
   },
   breakpoints: {
    values: {
      mobile: 0,
      bigMobile: 350,
      tablet: 650,
      desktop: 900
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
