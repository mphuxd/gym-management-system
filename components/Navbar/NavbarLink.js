import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import styles from './Navbar.module.scss';

const NavbarLink = React.forwardRef(
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
      <Link ref={forwardedRef} href={href} {...props} className={classNames}>
        <span className="leading-6">{children}</span>
      </Link>
    );
  }
);

NavbarLink.displayName = 'NavbarLink';

export default NavbarLink;
