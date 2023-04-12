import React from 'react';
import cx from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type DialogContentRef = React.ElementRef<typeof DialogPrimitive.Content>;
export interface DialogContentProps extends DialogPrimitive.DialogContentProps {
  rounded: boolean;
}

const DialogContent = React.forwardRef<DialogContentRef, DialogContentProps>(
  ({ children, className, title, rounded = true, ...props }, forwardedRef) => {
    const classNames = cx(className, 'absolute z-30 bg-white', {
      'rounded-lg': rounded,
    });
    return (
      <DialogPrimitive.Content
        className={classNames}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    );
  }
);

DialogContent.displayName = 'DialogContent';

export default DialogContent;
