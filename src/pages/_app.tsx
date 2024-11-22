import createEmotionCache from "@/styles/createcache"
import theme from "@/styles/theme"
import { CacheProvider, EmotionCache } from "@emotion/react"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@/styles/common.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import Head from "next/head"
import MasterCtxControll from "@/context/Master"
import LimitedCtxControll from "@/context/Limited"
import { CookiesProvider } from "react-cookie"
const clientSideEmotionCache = createEmotionCache()
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>INR Publicações</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CookiesProvider>
          <MasterCtxControll>
            <LimitedCtxControll>
              <Component {...pageProps} />
            </LimitedCtxControll>
          </MasterCtxControll>
        </CookiesProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
