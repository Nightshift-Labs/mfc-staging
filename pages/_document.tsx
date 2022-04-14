import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html style={{ scrollBehavior: "smooth" }}>
        <Head />
        <link
          rel="preload"
          href="/fonts/TerminaW00-Demi.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/TerminaW00-Demi.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/TerminaW05-Bold.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/TerminaW05-Bold.woff2"
          as="font"
          crossOrigin=""
        />
        <meta name="theme-color" content="#8efe1c"></meta>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans+Condensed:wght@700&family=Roboto:wght@400;700&family=Roboto+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
