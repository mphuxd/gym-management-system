import React from "react";
import styles from "./Layout.module.scss";
import Toast from "../Toast/Toast";
import { Navbar, NavbarItem } from "/components";
import Link from "next/link";

function AuthorizedLayout({ children }) {
  return (
    <>
      <Navbar>
        <NavbarItem>
          <Link href='/'>Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/members'>Members</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/signup'>Sign Up New Member</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/analytics'>Analytics</Link>
        </NavbarItem>
      </Navbar>
      <section className={styles.main}>
        {children}
        <Toast />
      </section>
    </>
  );
}

export default AuthorizedLayout;
