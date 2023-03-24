import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';
import { GearIcon, ExitIcon } from '@radix-ui/react-icons';
import { UserAvatar } from '@carbon/icons-react';
import { Inter } from '@next/font/google';
import { HeaderIcon, Navbar, NavbarLink, Stack } from '@/components';

const inter = Inter({ subsets: 'latin' });

function Header() {
  const { user } = useUser();
  return (
    <header className="col-span-12 h-16 min-w-[1280px] border-b border-gray6 bg-gray1 shadow-sm drop-shadow-sm">
      <Stack
        direction="row"
        className="mx-auto content-between justify-between px-8"
      >
        <Link href="/" className="flex">
          <Image
            width={48}
            height={48}
            className="py-2"
            src="/images/logo/evolve_fragments.svg"
            alt="Evolve Gyms Logo is a triangle with 3 intersecting lines radiating from the center."
          />
          <span
            className={cx(inter.className, 'py-4 px-1 text-2xl font-semibold')}
          >
            EVOLVE
          </span>
        </Link>

        {user ? (
          <Navbar>
            <NavbarLink href="/">Home</NavbarLink>
            <NavbarLink href="/checkin">Check In</NavbarLink>
            <NavbarLink href="/members">Members</NavbarLink>
            <NavbarLink href="/signup">Sign Up New Member</NavbarLink>
            <NavbarLink href="/analytics">Analytics</NavbarLink>
            <NavbarLink href="/calendar">Calendar</NavbarLink>
            <NavbarLink href="/sales">Point of Sales</NavbarLink>
          </Navbar>
        ) : null}

        <Stack
          as="nav"
          direction="row"
          className="ml-auto items-center justify-center"
        >
          {user ? (
            <Stack direction="row" className="items-center space-x-6">
              <HeaderIcon
                content="Settings"
                href="/settings"
                icon={<GearIcon />}
              />
              <HeaderIcon
                content="Logout"
                href="/api/auth/logout"
                icon={<ExitIcon />}
              />
              <UserAvatar
                height={24}
                width={24}
                className="h-full w-full p-5 hover:cursor-pointer hover:bg-gray4"
              />
            </Stack>
          ) : (
            <Link
              href="/api/auth/login"
              className="inline-flex items-center bg-layer-alt py-1 px-3 hover:bg-layer-hover"
            >
              Login
            </Link>
          )}
        </Stack>
      </Stack>
    </header>
  );
}

export default Header;
