import React from 'react';
import Toast from '../Toast/Toast';

function AuthorizedLayout({ children }) {
  return (
    <main>
      {children}
      <Toast />
    </main>
  );
}

export default AuthorizedLayout;
