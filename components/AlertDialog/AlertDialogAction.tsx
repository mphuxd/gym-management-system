import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

type AlertDialogActionRef = React.ElementRef<
  typeof AlertDialogPrimitive.Action
>;

export interface AlertDialogActionProps
  extends AlertDialogPrimitive.AlertDialogActionProps {
  children?: React.ReactNode;
}

const AlertDialogAction = React.forwardRef<
  AlertDialogActionRef,
  AlertDialogActionProps
>(({ children, ...props }, forwardedRef) => (
  <AlertDialogPrimitive.Action ref={forwardedRef} {...props}>
    {children}
  </AlertDialogPrimitive.Action>
));

AlertDialogAction.displayName = 'AlertDialogAction';

export default AlertDialogAction;
