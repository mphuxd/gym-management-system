import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';

const NavbarLink = React.forwardRef(
  ({ children, className, href, ...props }, forwardedRef) => {
    const router = useRouter();
    let isActive = false;

    if (router.asPath === href) isActive = true;
    else if (router.asPath.includes(href) && href !== '/') isActive = true;

    const classNames = cx(className, ' ', {
      'px-4 relative text-base py-5': true, // default
      'after:absolute after:w-1/2 after:translate-x-1/2 after:bg-red11 after:h-0.5 after:inset-0 after:inset-y-3/4 ':
        isActive, // selected
      'hover:after:absolute hover:after:w-1/2 after:translate-x-1/2 hover:after:bg-red7 hover:after:h-0.5 hover:after:inset-0 hover:after:inset-y-3/4':
        !isActive, // not selected
    });

    return (
      <Link ref={forwardedRef} href={href} {...props} className={classNames}>
        <span className="leading-6">{children}</span>
      </Link>
    );
  }
);

NavbarLink.displayName = 'NavbarLink';

export default NavbarLink;
