import React from 'react';
import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type DropdownTriggerRef = React.ElementRef<
  typeof DropdownMenuPrimitive.Trigger
>;
export interface DropdownTriggerProps
  extends DropdownMenuPrimitive.DropdownMenuTriggerProps {}

const DropdownTrigger = React.forwardRef<
  DropdownTriggerRef,
  DropdownTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.Trigger
    {...props}
    ref={forwardedRef}
    className={cx(className, 'overflow-hidden')}
  >
    {children}
  </DropdownMenuPrimitive.Trigger>
));

DropdownTrigger.displayName = 'DropdownTrigger';

export default DropdownTrigger;
