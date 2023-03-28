import React from 'react';
import cx from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const DialogTitle = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <DialogPrimitive.Title
      {...props}
      ref={forwardedRef}
      className={cx(className, 'text-lg font-bold')}
    >
      {children}
    </DialogPrimitive.Title>
  )
);

DialogTitle.displayName = 'DialogTitle';

export default DialogTitle;
