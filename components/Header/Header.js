// components/Layout/Header.tsx
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { GearIcon, ExitIcon } from "@radix-ui/react-icons";
import { HeaderIcon } from "/components";
import styles from "./Header.module.scss";

const Header = () => {
  const { user } = useUser();
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href='/' className={styles.logo}>
          <Image
            width={50}
            height={50}
            src='/images/logo/evolve.svg'
            alt='Evolve Gyms Logo is a triangle with 3 intersecting lines radiating from the center.'
          />
          <span className={styles.evolve}>EVOLVE</span>
          <span className={styles.gym}>GYM</span>
        </Link>

        <nav className={styles.headerNav}>
          {user ? (
            <div className={styles.iconContainer}>
              <HeaderIcon content='Settings' href='/settings' icon={<GearIcon />} />
              <HeaderIcon content='Logout' href='/api/auth/logout' icon={<ExitIcon />} />
              <Image
                alt='profile'
                width={48}
                height={48}
                className={styles.avatar}
                src={user.picture}
              />
            </div>
          ) : (
            <Link href='/api/auth/login' className={styles.login}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
