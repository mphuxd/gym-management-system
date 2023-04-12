import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type DialogTriggerRef = React.ElementRef<typeof DialogPrimitive.Trigger>;
export interface DialogTriggerProps
  extends DialogPrimitive.DialogTriggerProps {}

const DialogTrigger = React.forwardRef<DialogTriggerRef, DialogTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Trigger {...props} ref={forwardedRef}>
      {children}
    </DialogPrimitive.Trigger>
  )
);

DialogTrigger.displayName = 'DialogTrigger';

export default DialogTrigger;
