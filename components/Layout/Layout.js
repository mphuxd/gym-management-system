import React from "react";
import Header from "../Header/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className='min-h-screen'>{children}</main>
    </>
  );
}

export default Layout;
