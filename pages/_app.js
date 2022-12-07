import React from "react";
import "../styles/styles.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../components/Layout/Layout";
import { Provider as JotaiProvider } from "jotai";
import { Provider as ToastProvider } from "@radix-ui/react-toast";

// enable axe-core
// if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
//   const ReactDOM = require("react-dom");
//   const axe = require("@axe-core/react");
//   axe(React, ReactDOM, 1000);
// }

// enable stack trace for mem leaks
// process.on("warning", (e) => console.warn(e.stack));

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
