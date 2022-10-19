import React from "react";
import "../styles/styles.css";

// enable axe-core
// if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
//   const ReactDOM = require("react-dom");
//   const axe = require("@axe-core/react");
//   axe(React, ReactDOM, 1000);
// }

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
