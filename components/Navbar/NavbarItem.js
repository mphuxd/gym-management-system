import React from "react";
import { useRouter } from "next/router";
import cx from "classnames";

function NavbarItem({ children, className }) {
  const router = useRouter();
  const classNames = cx(className, [
    {
      "bg-blue-600 hover:bg-blue-600 active:bg-blue-600 text-white":
        router.asPath === children.props.href,
    },
    {
      "hover:bg-gray-200": router.asPath !== children.props.href,
    },
    { "px-2 py-1 rounded-md": true },
  ]);
  return <div className={classNames}>{children}</div>;
}

export default NavbarItem;
