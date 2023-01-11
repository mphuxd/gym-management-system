import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogOverlay } from '@/components';

const Dialog = React.forwardRef(
  ({ children, open, onOpenChange, ...props }, forwardedRef) => (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      ref={forwardedRef}
      {...props}
    >
      <DialogPrimitive.Portal>
        <DialogOverlay />
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
);

Dialog.displayName = 'Dialog';

export default Dialog;
