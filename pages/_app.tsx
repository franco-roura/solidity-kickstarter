import { blue } from '@mui/material/colors'
import { pink } from '@mui/material/colors'
import { createTheme,ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
  },
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
