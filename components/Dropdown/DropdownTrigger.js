import React from "react";
import cx from "classnames";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const DropdownTrigger = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(className, "overflow-hidden block");

  return (
    <DropdownMenuPrimitive.Trigger ref={forwardedRef} {...rest} className={classNames}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";

export default DropdownTrigger;
