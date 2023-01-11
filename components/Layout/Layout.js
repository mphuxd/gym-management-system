import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
// eslint-disable-next-line camelcase
import { IBM_Plex_Sans } from '@next/font/google';
import { Header, AuthorizedLayout, GenericLayout } from '@/components';

const IBMPlexSans = IBM_Plex_Sans({
  subsets: 'latin',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

function Layout({ children }) {
  const { user } = useUser();
  return (
    <div className={IBMPlexSans.className}>
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
