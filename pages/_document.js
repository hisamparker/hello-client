import Document, { Html, NextScript, Main, Head } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// stop flickering from styled components : everytime you render your app on the server,
// you can create a ServerStyleSheet and add a provider to your React tree, that accepts styles via a context API.
// so the styles are pre-rendered

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App) => (props) =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en-CA">
        <Head>
          <meta http-Equiv="content-type" content="text/html; charset=utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Asap:ital@0;1&family=Asar&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
