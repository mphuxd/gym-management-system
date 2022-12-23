import React from "react";
import cx from "classnames";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const DialogClose = React.forwardRef(({ className, ...props }, forwardedRef) => {
  const classNames = cx(className, "");
  return (
    <DialogPrimitive.Close {...props} ref={forwardedRef} className={classNames}>
      <Cross2Icon />
    </DialogPrimitive.Close>
  );
});

DialogClose.displayName = "DialogClose";

export default DialogClose;
