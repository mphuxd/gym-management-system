import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Header, AuthorizedLayout, GenericLayout } from "@/components";
import { Assistant } from "@next/font/google";

const assistant = Assistant({ subsets: "latin" });

function Layout({ children }) {
  const { user } = useUser();
  return (
    <div className={assistant.className}>
      <Header />
      {user ? (
        <AuthorizedLayout>{children}</AuthorizedLayout>
      ) : (
        <GenericLayout>{children}</GenericLayout>
      )}
    </div>
  );
}

export default Layout;
