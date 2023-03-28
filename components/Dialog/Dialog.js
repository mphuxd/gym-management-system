import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import { DialogOverlay, DialogTrigger } from '@/components';

const Dialog = React.forwardRef(
  (
    { children, open, onOpenChange, className, trigger, ...props },
    forwardedRef
  ) => (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      ref={forwardedRef}
      className={cx(className)}
      {...props}
    >
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogPrimitive.Portal className="relative z-20">
        <DialogOverlay />
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
);

Dialog.displayName = 'Dialog';

export default Dialog;
