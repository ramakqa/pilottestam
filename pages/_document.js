import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=pilottestram"></script>
        <script async defer src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></script>
      </Head>
      <body className="overflow-x-hidden antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
