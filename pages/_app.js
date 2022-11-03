import React from "react";
import "../styles/styles.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../components/Layout/Layout";

// enable axe-core
// if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
//   const ReactDOM = require("react-dom");
//   const axe = require("@axe-core/react");
//   axe(React, ReactDOM, 1000);
// }

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
