import React from 'react';
import { useAtom } from 'jotai';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { toastAtom } from '@/atoms';

const rootStyle =
  'w-72 border-l-2 border-solid bg-white px-4 py-2 outline outline-1 -outline-offset-1';

const toastStyles = cva(rootStyle, {
  variants: {
    intent: {
      success: 'border-green10 outline-green7',
      information: 'border-blue10 outline-blue7',
      warning: 'border-yellow8 outline-yellow7',
      error: 'border-red10 outline-red7',
    },
  },
  defaultVariants: {
    intent: 'warning',
  },
});

function Toast() {
  const [toastValue, setToastValue] = useAtom(toastAtom);

  return (
    <>
      <ToastPrimitive.Root
        open={toastValue.isOpen}
        onOpenChange={() => {
          setToastValue({ ...toastValue, isOpen: !toastValue.isOpen });
        }}
        className={toastStyles({ intent: toastValue.intent as any })}
      >
        <div className="relative flex flex-row items-center justify-between">
          <ToastPrimitive.Title className="font-semibold">
            {toastValue.title}
          </ToastPrimitive.Title>
          <ToastPrimitive.Close className="relative after:absolute after:-left-1/2 after:-top-1/2 after:h-[200%] after:w-[200%] after:content-['']">
            <Cross2Icon />
          </ToastPrimitive.Close>
        </div>
        <ToastPrimitive.Description className="text-sm font-medium text-body">
          {toastValue.description}
        </ToastPrimitive.Description>
        <ToastPrimitive.Action altText="Action" />
        <ToastPrimitive.Close />
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-8 right-8 z-50 h-fit" />
    </>
  );
}

// @@@ consider removing outline and replace with border

export default Toast;
