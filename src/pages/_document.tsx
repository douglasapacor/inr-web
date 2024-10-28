import createEmotionCache from "@/styles/createcache"
import theme from "@/styles/theme"
import createEmotionServer from "@emotion/server/create-instance"
import { AppType } from "next/app"
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript
} from "next/document"
import React, { JSX } from "react"
import { MyAppProps } from "./_app"

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="pt-br">
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta charSet="iso88591" />
        <link rel="icon" href="/favicon_16.png" sizes="16x16" />
        <link rel="icon" href="/favicon_32.png" sizes="32x32" />
        <meta name="referrer" content="always" />
        <meta name="description" content="INR Publicações (c) 2024" />
        <meta name="author" content="Douglas Pacor, Douglas Pacor Developer" />
        <meta name="copyright" content="INR Publicações (c) 2024" />
        <meta name="application-name" content="INR Publicações" />
        <meta name="keywords" content="INR Publicações" />
        <meta name="emotion-insertion-point" content="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        }
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}
