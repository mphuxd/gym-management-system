import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogOverlay, DialogTrigger } from '@/components';

export interface DialogProps extends DialogPrimitive.DialogProps {
  trigger?: string | React.ReactNode;
}

function Dialog({
  children,
  open,
  onOpenChange,
  trigger,
  ...props
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} {...props}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogPrimitive.Portal className="relative z-20">
        <DialogOverlay />
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

Dialog.displayName = 'Dialog';

export default Dialog;
