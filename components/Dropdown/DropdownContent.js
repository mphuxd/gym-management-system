import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import cx from "classnames";

const DropdownContent = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(className, "z-10 bg-white rounded-lg border border-gray-400 text-sm py-2");

  return (
    <DropdownMenuPrimitive.Content {...rest} ref={forwardedRef} className={classNames}>
      {children}
    </DropdownMenuPrimitive.Content>
  );
});

export default DropdownContent;

DropdownContent.displayName = "DropdownContent";
