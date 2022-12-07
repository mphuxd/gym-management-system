// components/Layout/Header.tsx
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { GearIcon, ExitIcon } from "@radix-ui/react-icons";
import { HeaderIcon } from "/components";

const Header = () => {
  const { user } = useUser();
  return (
    <header className='text-gray-600 body-font border-b '>
      <div className='2xl:px-8 mx-auto flex flex-wrap px-5 py-2 flex-col md:flex-row items-center'>
        <Link
          href='/'
          className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
        >
          <Image
            width={50}
            height={50}
            src='/images/logo/evolve.svg'
            alt='Evolve Gyms Logo is a triangle with 3 intersecting lines radiating from the center.'
          />
          <span className='font-black text-xl mr-1'>EVOLVE</span>{" "}
          <span className='font-light text-xl '>GYM</span>
        </Link>
        <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
          {user ? (
            <div className='flex items-center space-x-6'>
              <HeaderIcon content='Settings' href='/settings' icon={<GearIcon />} />
              <HeaderIcon content='Logout' href='/api/auth/logout' icon={<ExitIcon />} />
              <Image
                alt='profile'
                width={48}
                height={48}
                className='rounded-full w-12 h-12'
                src={user.picture}
              />
            </div>
          ) : (
            <Link
              href='/api/auth/login'
              className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
