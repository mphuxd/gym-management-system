import React from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import styles from './Navbar.module.scss';

type NavbarLinkRef = React.ElementRef<typeof Link>;
export interface NavbarLinkProps extends LinkProps {
  children?: React.ReactNode;
  className?: string;
  href: string;
}

const NavbarLink = React.forwardRef<NavbarLinkRef, NavbarLinkProps>(
  ({ children, className, href, ...props }, forwardedRef) => {
    const router = useRouter();
    let isActive = false;

    if (router.asPath === href) isActive = true;
    else if (router.asPath.includes(href) && href !== '/') isActive = true;

    const classNames = cx(
      className,
      'px-4 relative text-base py-5',
      isActive ? styles.navLinkActive : styles.navLinkInactive
    );

    return (
      <li className="my-auto">
        <Link ref={forwardedRef} href={href} {...props} className={classNames}>
          <span className="leading-6">{children}</span>
        </Link>
      </li>
    );
  }
);

NavbarLink.displayName = 'NavbarLink';

export default NavbarLink;
