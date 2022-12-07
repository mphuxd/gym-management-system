import React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

const AlertDialogCancel = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <AlertDialogPrimitive.Cancel ref={forwardedRef} {...props}>
      {children}
    </AlertDialogPrimitive.Cancel>
  );
});

AlertDialogCancel.displayName = "AlertDialog";

export default AlertDialogCancel;
