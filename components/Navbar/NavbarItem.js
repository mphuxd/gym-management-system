import React from "react";
import { useRouter } from "next/router";
import cx from "classnames";

function NavbarItem({ children, className }) {
  const router = useRouter();

  let isActive = false;

  if (router.asPath === children.props.href) isActive = true;
  else if (router.asPath.includes(children.props.href) && children.props.href !== "/")
    isActive = true;

  const classNames = cx(className, {
    "py-2 px-4 relative": true, //default
    "font-semibold border-b-2 border-red9": isActive, //selected
    "hover:border-b-2 hover:border-red8 ": !isActive, //not selected
  });

  return <div className={classNames}>{children}</div>;
}

export default NavbarItem;
