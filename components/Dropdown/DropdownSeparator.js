import React from "react";
import cx from "classnames";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const DropdownSeparator = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(className, "bg-black h-[1px] my-2 mx-4");

  return (
    <DropdownMenuPrimitive.Separator {...rest} ref={forwardedRef} className={classNames}>
      {children}
    </DropdownMenuPrimitive.Separator>
  );
});

export default DropdownSeparator;

DropdownSeparator.displayName = "DropdownSeparator";
