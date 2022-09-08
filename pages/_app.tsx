import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'

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

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
    )
}

export default MyApp
