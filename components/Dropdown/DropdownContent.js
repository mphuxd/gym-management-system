import React from "react";
import cx from "classnames";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const DropdownContent = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(className, "z-10 bg-white rounded-lg border border-gray-300 text-sm py-2");

  return (
    <DropdownMenuPrimitive.Content {...rest} ref={forwardedRef} className={classNames}>
      {children}
    </DropdownMenuPrimitive.Content>
  );
});

export default DropdownContent;

DropdownContent.displayName = "DropdownContent";
