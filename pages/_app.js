import React from 'react';
// eslint-disable-next-line camelcase
import { IBM_Plex_Sans } from '@next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from '@apollo/client';
import { Provider as JotaiProvider } from 'jotai';
import { Provider as ToastProvider } from '@radix-ui/react-toast';
// eslint-disable-next-line import/extensions
import apolloClient from '@/lib/apollo';
import { Layout } from '@/components';
import '../styles/styles.css';

// @@ Enable Axe-core accessibility testing
// if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
//   const ReactDOM = require("react-dom");
//   const axe = require("@axe-core/react");
//   axe(React, ReactDOM, 1000);
// }

// @@ Enable stack trace for mem leaks
// process.on("warning", (e) => console.warn(e.stack));

const IBMPlexSans = IBM_Plex_Sans({
  subsets: 'latin',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${IBMPlexSans.style.fontFamily};
        }
      `}</style>
      <UserProvider>
        <ApolloProvider client={apolloClient}>
          <JotaiProvider>
            <ToastProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ToastProvider>
          </JotaiProvider>
        </ApolloProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
