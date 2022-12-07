import React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

const AlertDialogAction = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <AlertDialogPrimitive.Action ref={forwardedRef} {...props}>
      {children}
    </AlertDialogPrimitive.Action>
  );
});

AlertDialogAction.displayName = "AlertDialogAction";

export default AlertDialogAction;
