/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body css={css`margin: 0;`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument