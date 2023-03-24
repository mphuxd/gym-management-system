import React from 'react';
import cx from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const DialogContent = React.forwardRef(
  ({ children, className, title, rounded = true, ...props }, forwardedRef) => {
    const classNames = cx(className, 'absolute z-30 bg-white', {
      'rounded-lg': rounded,
    });
    return (
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={classNames}
      >
        {children}
      </DialogPrimitive.Content>
    );
  }
);

DialogContent.displayName = 'DialogContent';

export default DialogContent;
