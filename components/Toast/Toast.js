import React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { useAtom } from "jotai";
import { toastAtom } from "../../atoms";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./Toast.module.scss";

function Toast() {
  const [toastValue, setToastValue] = useAtom(toastAtom);
  return (
    <>
      <ToastPrimitive.Root
        open={toastValue.isOpen}
        onOpenChange={() => {
          setToastValue({ isOpen: !toastValue.isOpen });
        }}
        className='w-64 bg-white px-4 py-2 border-1 outline outline-gray-400 shadow-md shadow-orange-200 outline-1 rounded-md'
      >
        <div className='flex flex-row justify-between items-center relative'>
          <ToastPrimitive.Title className='font-semibold'>{toastValue.title}</ToastPrimitive.Title>
          <ToastPrimitive.Close className={styles.toastClose}>
            <Cross2Icon />
          </ToastPrimitive.Close>
        </div>
        <ToastPrimitive.Description className='text-sm font-medium  text-gray-800'>
          {toastValue.description}
        </ToastPrimitive.Description>
        <ToastPrimitive.Action altText=' ' />
        <ToastPrimitive.Close />
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className='fixed inset-x-[82%] inset-y-[85%] h-fit' />
    </>
  );
}

//@@@ increase

export default Toast;
