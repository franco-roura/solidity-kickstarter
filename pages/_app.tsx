import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme,ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import React from 'react'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FDD835',
    },
    background: {
      default: '#37474F',
      paper: '#212121'
    }
  },

})
const clientSideEmotionCache = createCache({ key: 'css' })
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>

  )
}
export default MyApp
