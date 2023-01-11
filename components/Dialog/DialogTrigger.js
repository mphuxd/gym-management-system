import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const DialogTrigger = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Trigger {...props} ref={forwardedRef}>
      {children}
    </DialogPrimitive.Trigger>
  )
);

DialogTrigger.displayName = 'DialogTrigger';

export default DialogTrigger;
