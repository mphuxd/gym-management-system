import React from "react";
import cx from "classnames";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const DialogClose = React.forwardRef(({ className, ...props }, forwardedRef) => {
  const classNames = cx(
    className,
    "p-2 block hover:bg-slate4 rounded-sm focus:outline focus:outline-slate7 active:bg-slate5"
  );
  return (
    <DialogPrimitive.Close {...props} ref={forwardedRef} className={classNames}>
      <Cross2Icon height={16} width={16} />
    </DialogPrimitive.Close>
  );
});

DialogClose.displayName = "DialogClose";

export default DialogClose;
