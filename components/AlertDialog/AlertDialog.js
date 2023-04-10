import React, { useState } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { ErrorFilled } from '@carbon/icons-react';
import { useAtom } from 'jotai';
import { AlertDialogCross, Button } from '@/components';
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
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [toast, setToast] = useAtom(toastAtom);

    function sendToast() {
      if (toastTitle && toastDescription) {
        setToast({
          title: toastTitle,
          description: toastDescription,
          isOpen: true,
          intent: 'success',
        });
      }
    }

    async function handleAction() {
      const response = await fetch(href);
      const results = await response.json();
      if (results.statusCode === 200) {
        setIsOpen(false);
        sendToast();
      }
      if (results.statusCode === 403) {
        setError(results.message);
        setIsOpen(true);
      }
    }

    const handleOpenChange = (e) => {
      if (e) {
        e.stopPropagation();
      }
      setIsOpen(!isOpen);
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
          <AlertDialogPrimitive.Overlay
            onClick={handleOpenChange}
            className="fixed inset-0 z-10 bg-overlay-neg opacity-70"
          />
          <AlertDialogPrimitive.Content
            tabIndex={-1}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute inset-1/2 z-20 h-fit w-[640px] -translate-x-1/2 -translate-y-3/4 space-y-4 bg-layer p-6"
          >
            <div className="flex flex-row justify-between">
              <AlertDialogPrimitive.Title className="font-semibold">
                {title}
              </AlertDialogPrimitive.Title>
              <AlertDialogCross onClick={handleOpenChange} />
            </div>
            <AlertDialogPrimitive.Description asChild>
              <div>
                {description}
                {intent === 'constrained' && (
                  <div className="flex flex-col">
                    <div>
                      <span className="mt-4 inline-block text-support">
                        To continue, enter the phrase
                      </span>
                      <span className="font-bold">{` ${actionPhrase}`}</span>
                    </div>
                    {error && (
                      <div className="mt-2 flex flex-row items-center gap-x-1 text-neg-text">
                        <ErrorFilled className="fill-icon-neg" />
                        <div>{error}</div>
                      </div>
                    )}
                    <input
                      placeholder={actionPhrase}
                      type="text"
                      input={input}
                      onInput={(e) => setInput(e.target.value)}
                      className="my-4 w-full px-2 py-1 outline outline-1 outline-border-interactive"
                    />
                  </div>
                )}
              </div>
            </AlertDialogPrimitive.Description>

            <div className="flex flex-row justify-end gap-x-6">
              <AlertDialogPrimitive.Cancel
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <Button as="button" role="button" intent="ghost" size="large">
                  {close}
                </Button>
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
                    as="button"
                    role="button"
                    disabled={input !== actionPhrase}
                    intent={input !== actionPhrase ? 'disabled' : 'danger'}
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
