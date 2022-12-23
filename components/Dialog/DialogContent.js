import React from "react";
import cx from "classnames";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Stack } from "@/components";

const DialogContent = React.forwardRef(({ children, className, title, ...props }, forwardedRef) => {
  const classNames = cx(className, "absolute bg-white");
  return (
    <DialogPrimitive.Content {...props} ref={forwardedRef} className={classNames}>
      <Stack className='p-8 space-y-8'>{children}</Stack>
    </DialogPrimitive.Content>
  );
});

DialogContent.displayName = "DialogContent";

export default DialogContent;
