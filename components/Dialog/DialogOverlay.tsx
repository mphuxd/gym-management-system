import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';

type DialogOverlayRef = React.ElementRef<typeof DialogPrimitive.Content>;
export interface DialogOverlayProps extends DialogPrimitive.DialogOverlayProps {
  rounded?: boolean;
}

const DialogOverlay = React.forwardRef<DialogOverlayRef, DialogOverlayProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <DialogPrimitive.Overlay
      className={cx(className, 'fixed inset-0 z-10 bg-gray12 opacity-70')}
      ref={forwardedRef}
      {...props}
    />
  )
);

DialogOverlay.displayName = 'DialogOverlay';

export default DialogOverlay;
