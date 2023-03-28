import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';

const DialogOverlay = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <DialogPrimitive.Overlay
      {...props}
      ref={forwardedRef}
      className={cx(className, 'fixed inset-0 z-10 bg-gray12 opacity-70')}
    />
  )
);

DialogOverlay.displayName = 'DialogOverlay';

export default DialogOverlay;
