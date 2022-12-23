import React from "react";
import cx from "classnames";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const DialogTitle = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  const classNames = cx(className, "font-bold text-lg");
  return (
    <DialogPrimitive.Title {...props} ref={forwardedRef} className={classNames}>
      {children}
    </DialogPrimitive.Title>
  );
});

DialogTitle.displayName = "DialogTitle";

export default DialogTitle;
