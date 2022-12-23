import React from "react";
import cx from "classnames";

function Sidepanel({ children, className }) {
  const classNames = cx(
    className,
    "w-[376px] p-8 flex flex-col h-full min-h-screen-calc border-r border-black"
  );
  return <aside className={classNames}>{children}</aside>;
}

export default Sidepanel;
