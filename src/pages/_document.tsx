import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="description"
          content="Speedcubing timer and ccramble generator"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
