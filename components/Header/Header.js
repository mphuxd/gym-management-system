// components/Layout/Header.tsx
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { GearIcon, ExitIcon } from "@radix-ui/react-icons";
import { HeaderIcon, Stack } from "@/components";
import { Navbar, NavbarLink } from "@/components";
import styles from "./Header.module.scss";
import cx from "classnames";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: "latin" });

const Header = () => {
  const { user } = useUser();
  return (
    <header className='col-span-12 bg-gray1 border-b border-gray6 '>
      <Stack
        direction='row'
        className='mx-auto px-8 py-2 items-center justify-between content-between'
      >
        <Link href='/' className='font-medium flex items-center'>
          <Image
            width={50}
            height={50}
            src='/images/logo/evolve.svg'
            alt='Evolve Gyms Logo is a triangle with 3 intersecting lines radiating from the center.'
          />
          <span className={cx(inter.className, "font-semibold text-2xl mr-1")}>EVOLVE</span>
        </Link>

        {user ? (
          <Navbar>
            <NavbarLink href='/'>Home</NavbarLink>
            <NavbarLink href='/checkin'>Check In</NavbarLink>
            <NavbarLink href='/members'>Members</NavbarLink>
            <NavbarLink href='/signup'>Sign Up New Member</NavbarLink>
            <NavbarLink href='/analytics'>Analytics</NavbarLink>
          </Navbar>
        ) : null}

        <Stack as='nav' direction='row' className='items-center justify-center ml-auto'>
          {user ? (
            <Stack direction='row' className='items-center space-x-6'>
              <HeaderIcon content='Settings' href='/settings' icon={<GearIcon />} />
              <HeaderIcon content='Logout' href='/api/auth/logout' icon={<ExitIcon />} />
              <Image
                alt='profile'
                width={48}
                height={48}
                className='h-10 w-10 rounded-full'
                src={user.picture}
              />
            </Stack>
          ) : (
            <Link href='/api/auth/login' className={styles.login}>
              Login
            </Link>
          )}
        </Stack>
      </Stack>
    </header>
  );
};

export default Header;
