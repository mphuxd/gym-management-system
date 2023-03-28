import React from 'react';
import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const DropdownContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Content
      {...props}
      ref={forwardedRef}
      className={cx(
        className,
        'z-10 bg-white py-2 text-sm shadow-custom outline outline-1 -outline-offset-1 outline-border-subtle-dark drop-shadow-md hover:outline-border-strong-dark active:outline-border-strong-darker'
      )}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  )
);

export default DropdownContent;

DropdownContent.displayName = 'DropdownContent';
