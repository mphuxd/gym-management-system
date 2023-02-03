import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Header, AuthorizedLayout, GenericLayout } from '@/components';

function Layout({ children }) {
  const { user } = useUser();
  return (
    <div>
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
