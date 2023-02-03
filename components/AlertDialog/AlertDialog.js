import React, { useState } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components';

const AlertDialog = React.forwardRef(
  (
    {
      children,
      title,
      description,
      close,
      action,
      isOpen,
      setIsOpen,
      href,
      intent,
      actionPhrase = 'delete me',
      ...props
    },
    forwardedRef
  ) => {
    async function handleAction(e) {
      e.stopPropagation();
      const response = await fetch(href);
      // eslint-disable-next-line no-unused-vars
      const results = await response.json();
      // @@@ integrate with toast
      // @@@ do some checks here
    }

    const [input, setInput] = useState();

    return (
      <AlertDialogPrimitive.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        ref={forwardedRef}
        {...props}
      >
        <AlertDialogPrimitive.Portal>
          <AlertDialogPrimitive.Overlay className="fixed bg-mauve12 opacity-70 inset-0" />
          <AlertDialogPrimitive.Content
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute inset-1/2 -translate-x-1/2 -translate-y-3/4 h-fit w-[640px] bg-white p-6 rounded-lg space-y-4"
          >
            <div className="flex flex-row justify-between">
              <AlertDialogPrimitive.Title className="font-semibold">
                {title}
              </AlertDialogPrimitive.Title>
              <div className="p-2 block hover:bg-slate4 rounded-sm focus:outline focus:outline-slate7 active:bg-slate5">
                <Cross2Icon
                  onClick={() => setIsOpen(false)}
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
            <AlertDialogPrimitive.Description>
              {description}
            </AlertDialogPrimitive.Description>
            {intent === 'constrained' && (
              <div className="flex flex-col gap-y-2">
                <div className="mt-4 text-gray11">
                  To continue, enter the phrase
                  <span className="font-bold text-black">{` ${actionPhrase}`}</span>
                </div>
                <input
                  placeholder={actionPhrase}
                  type="text"
                  input={input}
                  onInput={(e) => setInput(e.target.value)}
                  className="w-full outline outline-1 outline-gray10 px-2 py-1 my-4"
                />
              </div>
            )}
            <div className="flex flex-row justify-end gap-x-6">
              <AlertDialogPrimitive.Cancel
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <Button as="button">{close}</Button>
              </AlertDialogPrimitive.Cancel>
              <AlertDialogPrimitive.Action
                asChild
                onClick={(e) => handleAction(e)}
              >
                {intent === 'constrained' ? (
                  <Button
                    disabled={input !== actionPhrase}
                    intent={input !== actionPhrase ? 'disabled' : 'danger'}
                    as="button"
                  >
                    {action}
                  </Button>
                ) : (
                  <Button intent="danger" as="button">
                    {action}
                  </Button>
                )}
              </AlertDialogPrimitive.Action>
            </div>
            {children}
          </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Portal>
      </AlertDialogPrimitive.Root>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';

export default AlertDialog;
