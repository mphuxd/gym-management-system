import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';

const DialogOverlay = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    const { className, ...rest } = { ...props };
    const classNames = cx(className, 'fixed bg-gray12 opacity-70 inset-0');
    return (
      <DialogPrimitive.Overlay
        ref={forwardedRef}
        {...rest}
        className={classNames}
      />
    );
  }
);

DialogOverlay.displayName = 'DialogOverlay';

export default DialogOverlay;
