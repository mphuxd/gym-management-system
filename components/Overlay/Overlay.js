import React from "react";
import cx from "classnames";

function Overlay({ className }) {
  const classNames = cx(className, "absolute inset-0 w-full h-full bg-slate-600 opacity-30");
  return <div className={classNames}></div>;
}

export default Overlay;
