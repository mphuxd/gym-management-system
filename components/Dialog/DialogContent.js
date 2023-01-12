import React from 'react';
import cx from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const DialogContent = React.forwardRef(
  ({ children, className, title, ...props }, forwardedRef) => {
    const classNames = cx(className, 'absolute bg-white rounded-lg z-50');
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
