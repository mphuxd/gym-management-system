import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import cx from "classnames";

const DropdownItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(
    className,
    "hover:bg-gray-200 focus:outline-none flex flex-row items-center px-4 font-medium "
  );

  return (
    <DropdownMenuPrimitive.Item {...rest} ref={forwardedRef} className={classNames}>
      {children}
    </DropdownMenuPrimitive.Item>
  );
});

export default DropdownItem;

DropdownItem.displayName = "DropdownItem";
