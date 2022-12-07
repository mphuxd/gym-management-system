import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Header, AuthorizedLayout, GenericLayout } from "/components";
import { Inter } from "@next/font/google";

const inter = Inter();

function Layout({ children }) {
  const { user } = useUser();
  return (
    <div className={inter.className}>
      <Header />
      <main className='grid grid-cols-12 2xl:mx-8 2xl:gap-x-6'>
        {user ? (
          <AuthorizedLayout>{children}</AuthorizedLayout>
        ) : (
          <GenericLayout>{children}</GenericLayout>
        )}
      </main>
    </div>
  );
}

export default Layout;
