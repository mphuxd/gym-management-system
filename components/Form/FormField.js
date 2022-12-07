import React from "react";
import cx from "classnames";

function FormField({ children, className }) {
  const classNames = cx(className, "flex flex-col gap-y-1");
  return <fieldset className={classNames}>{children}</fieldset>;
}

export default FormField;
