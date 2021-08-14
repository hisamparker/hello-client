/* eslint-disable react/prop-types */
import React from 'react';
// to hook into the router and change things based on events
import Router from 'next/router';
// progress bar package https://ricostacruz.com/nprogress/
import NProgress from 'nprogress';
// styling for the progress bar
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import Page from '../components/layout/Page';
import { CartStateProvider } from '../context/cartState';
import { SnackbarStateProvider } from '../context/snackbarState';
// on the event routeChangeStart, start the progress bar
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
// on the event routeChangeDone, stop the progress bar
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
// on the event routeChangeError, stop the progress bar
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

// where does apollo come from? When we export the app, we'll wrap it in the withData function (in lib folder),
// this will give us access to  give us our entire app component, but with all the data from apollo
function App({ Component, pageProps, apollo }) {
  // console.log(apollo);
  return (
    // {/* a provider is a component that lives very high up in the react tree, it allows components below it to access data (theme provider, context provider etc...) */}
    // apollo provider needs a client prop
    <ApolloProvider client={apollo}>
      <SnackbarStateProvider>
        <CartStateProvider>
          <Page>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Page>
        </CartStateProvider>
      </SnackbarStateProvider>
    </ApolloProvider>
  );
}

// this is an async nextjs method we want to destructure component and context
App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    // we're saying if any of the pages have get initial props on them (they do, because that's what withData() does), then go fetch it!
    pageProps = await Component.getInitialProps(ctx);
  }
  // this allows us to get nay query variables at a page level
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(App);
