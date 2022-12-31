import React from "react";
import Toast from "../Toast/Toast";
import { Navbar, NavbarLink } from "@/components";

function AuthorizedLayout({ children }) {
  return (
    <React.Fragment>
      <main>
        {children}
        <Toast />
      </main>
    </React.Fragment>
  );
}

export default AuthorizedLayout;
