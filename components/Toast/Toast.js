import React from 'react';
import { useAtom } from 'jotai';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { toastAtom } from '@/atoms';
import styles from './Toast.module.scss';

const toastStyles = cva(
  [
    'border-l-2 border-solid w-72 bg-white px-4 py-2 outline outline-1 outline-gray-400',
  ],
  {
    variants: {
      intent: {
        success: 'outline-green7 border-green10',
        information: 'outline-blue7 border-blue10',
        warning: 'outline-yellow7 border-yellow8',
        error: 'outline-red7 border-red10',
      },
    },
    defaultVariants: {
      intent: 'warning',
    },
  }
);

function Toast() {
  const [toastValue, setToastValue] = useAtom(toastAtom);

  return (
    <>
      <ToastPrimitive.Root
        open={toastValue.isOpen}
        onOpenChange={() => {
          setToastValue({ isOpen: !toastValue.isOpen });
        }}
        className={toastStyles({ intent: toastValue.intent })}
      >
        <div className="flex flex-row justify-between items-center relative">
          <ToastPrimitive.Title className="font-semibold">
            {toastValue.title}
          </ToastPrimitive.Title>
          <ToastPrimitive.Close className={styles.toastClose}>
            <Cross2Icon />
          </ToastPrimitive.Close>
        </div>
        <ToastPrimitive.Description className="text-sm font-medium  text-gray-800">
          {toastValue.description}
        </ToastPrimitive.Description>
        <ToastPrimitive.Action altText=" " />
        <ToastPrimitive.Close />
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed right-8 bottom-8 h-fit z-50" />
    </>
  );
}

// @@@ increase

export default Toast;
