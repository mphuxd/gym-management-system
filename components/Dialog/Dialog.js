import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import { DialogOverlay } from '@/components';

const Dialog = React.forwardRef(
  ({ children, open, onOpenChange, className, ...props }, forwardedRef) => (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      ref={forwardedRef}
      className={cx(className, '')}
      {...props}
    >
      <DialogPrimitive.Portal className="relative z-20">
        <DialogOverlay className="z-10" />
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
);

Dialog.displayName = 'Dialog';

export default Dialog;
