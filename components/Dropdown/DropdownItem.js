import React from 'react';
import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const DropdownItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Item
      {...props}
      ref={forwardedRef}
      className={cx(
        className,
        'data-[highlighted]:focusable flex w-full flex-row items-center bg-transparent px-4 hover:bg-layer-alt'
      )}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
);

export default DropdownItem;

DropdownItem.displayName = 'DropdownItem';
