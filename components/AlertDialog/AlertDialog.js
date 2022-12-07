import React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button } from "../Button";

const AlertDialog = React.forwardRef(
  (
    { children, title, description, close, action, isOpen, setIsOpen, href, ...props },
    forwardedRef
  ) => {
    async function handleAction(e) {
      e.stopPropagation();
      // const response = await fetch(href);
      // const results = await response.json();
      console.log("Works but disabled");
      //integrate with toast
    }
    return (
      <AlertDialogPrimitive.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        ref={forwardedRef}
        {...props}
      >
        <AlertDialogPrimitive.Portal>
          <AlertDialogPrimitive.Overlay className='fixed bg-black opacity-30 inset-0' />
          <AlertDialogPrimitive.Content className='absolute inset-1/2 -translate-x-1/2 -translate-y-3/4 h-fit w-[640px] bg-white p-6 rounded-lg space-y-4'>
            <AlertDialogPrimitive.Title className='font-semibold '>
              {title}
            </AlertDialogPrimitive.Title>
            <AlertDialogPrimitive.Description className=''>
              {description}
            </AlertDialogPrimitive.Description>
            <div className='flex flex-row justify-end gap-x-6 '>
              <AlertDialogPrimitive.Cancel onClick={(e) => e.stopPropagation()}>
                <Button as='div'>{close}</Button>
              </AlertDialogPrimitive.Cancel>
              <AlertDialogPrimitive.Action onClick={(e) => handleAction(e)}>
                <Button variant='danger' as='div'>
                  {action}
                </Button>
              </AlertDialogPrimitive.Action>
            </div>
            {children}
          </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Portal>
      </AlertDialogPrimitive.Root>
    );
  }
);

AlertDialog.displayName = "AlertDialog";

export default AlertDialog;
