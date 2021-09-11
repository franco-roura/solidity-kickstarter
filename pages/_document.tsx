/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
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