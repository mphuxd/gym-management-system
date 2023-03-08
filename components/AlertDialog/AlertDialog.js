import React, { useState } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ErrorFilled } from '@carbon/icons-react';
import { useAtom } from 'jotai';
import { Button } from '@/components';
import { toastAtom } from '@/atoms';

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
      toastTitle,
      toastDescription,
      ...props
    },
    forwardedRef
  ) => {
    const [input, setInput] = useState();
    const [error, setError] = useState();
    // eslint-disable-next-line no-unused-vars
    const [toast, setToast] = useAtom(toastAtom);

    async function handleAction() {
      const response = await fetch(href);
      const results = await response.json();
      if (results.statusCode === 200) {
        setIsOpen(false);
        if (toastTitle && toastDescription) {
          setToast({
            title: toastTitle,
            description: toastDescription,
            isOpen: true,
            intent: 'success',
          });
        }
      }
      if (results.statusCode === 403) {
        setError(results.message);
        setIsOpen(true);
      }
    }

    const handleOpenChange = () => {
      setIsOpen();
      setError('');
      setInput('');
    };

    return (
      <AlertDialogPrimitive.Root
        open={isOpen}
        onOpenChange={handleOpenChange}
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
                  onClick={handleOpenChange}
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
            <AlertDialogPrimitive.Description>
              {description}
            </AlertDialogPrimitive.Description>
            {intent === 'constrained' && (
              <div className="flex flex-col">
                <div className="mt-4 text-gray11">
                  To continue, enter the phrase
                  <span className="font-bold text-black">{` ${actionPhrase}`}</span>
                </div>
                {error && (
                  <div className="flex flex-row items-center mt-2 gap-x-1 ">
                    <ErrorFilled className="fill-red11" />
                    <div className="text-red11">{error}</div>
                  </div>
                )}
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
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleAction(e);
                }}
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
