import React from 'react';
import cx from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type DialogTitleRef = React.ElementRef<typeof DialogPrimitive.Content>;
export interface DialogTitleProps extends DialogPrimitive.DialogTitleProps {}

const DialogTitle = React.forwardRef<DialogTitleRef, DialogTitleProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <DialogPrimitive.Title
      className={cx(className, 'text-lg font-bold')}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  )
);

DialogTitle.displayName = 'DialogTitle';

export default DialogTitle;
