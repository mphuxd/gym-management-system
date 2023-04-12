import React from 'react';
import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type DropdownSeparatorRef = React.ElementRef<
  typeof DropdownMenuPrimitive.Separator
>;
export interface DropdownSeparatorProps
  extends DropdownMenuPrimitive.DropdownMenuSeparatorProps {}

const DropdownSeparator = React.forwardRef<
  DropdownSeparatorRef,
  DropdownSeparatorProps
>(({ children, className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.Separator
    {...props}
    ref={forwardedRef}
    className={cx(className, 'mx-4 my-2 h-px bg-black')}
  >
    {children}
  </DropdownMenuPrimitive.Separator>
));

export default DropdownSeparator;

DropdownSeparator.displayName = 'DropdownSeparator';
