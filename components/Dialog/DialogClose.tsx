import React from 'react';
import cx from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

type DialogCloseRef = React.ElementRef<typeof DialogPrimitive.Close>;
export interface DialogCloseProps extends DialogPrimitive.DialogCloseProps {}

const DialogClose = React.forwardRef<
  DialogCloseRef,
  DialogPrimitive.DialogCloseProps
>(({ className, ...props }, forwardedRef) => (
  <DialogPrimitive.Close
    ref={forwardedRef}
    className={cx(
      className,
      'bg-transparent p-2 hover:bg-neg-hover hover:text-white active:bg-neg-active active:outline-none'
    )}
    {...props}
  >
    <Cross2Icon className="h-4 w-4 fill-icon" />
  </DialogPrimitive.Close>
));

DialogClose.displayName = 'DialogClose';

export default DialogClose;
