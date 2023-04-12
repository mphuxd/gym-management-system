import React from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import styles from './Navbar.module.scss';

function NavbarItem({ children, className }) {
  const router = useRouter();

  let isActive = false;

  if (router.asPath === children.props.href) isActive = true;
  else if (
    router.asPath.includes(children.props.href) &&
    children.props.href !== '/'
  ) {
    isActive = true;
  }

  const classNames = cx(
    className,
    'relative py-2 px-4',
    isActive ? styles.navItemActive : styles.navItemInactive
  );

  return <div className={classNames}>{children}</div>;
}

export default NavbarItem;
