import React from 'react';
import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const DropdownSeparator = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Separator
      {...props}
      ref={forwardedRef}
      className={cx(className, 'my-2 mx-4 h-px bg-black')}
    >
      {children}
    </DropdownMenuPrimitive.Separator>
  )
);

export default DropdownSeparator;

DropdownSeparator.displayName = 'DropdownSeparator';
