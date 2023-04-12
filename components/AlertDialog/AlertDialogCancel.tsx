import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

type AlertDialogCancelRef = React.ElementRef<
  typeof AlertDialogPrimitive.Cancel
>;

export interface AlertDialogCancelProps
  extends AlertDialogPrimitive.AlertDialogCancelProps {
  children?: React.ReactNode;
}

const AlertDialogCancel = React.forwardRef<
  AlertDialogCancelRef,
  AlertDialogCancelProps
>(({ children, ...props }, forwardedRef) => (
  <AlertDialogPrimitive.Cancel ref={forwardedRef} {...props}>
    {children}
  </AlertDialogPrimitive.Cancel>
));

AlertDialogCancel.displayName = 'AlertDialog';

export default AlertDialogCancel;
