import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

const TableDropdownDialog = React.forwardRef(
  ({ isOpen, setIsOpen, header, description, href, yesText, noText, ...props }, forwardedRef) => {
    async function handleClick(e) {
      e.stopPropagation();
      // const results = await fetch(href);
      // const resultsData = await results.json();
      console.log("Works but disabled");
      //integrate with toast
    }

    return (
      <Dialog.Root
        ref={forwardedRef}
        {...props}
        className='z-10'
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className='fixed bg-black opacity-30 inset-0' />
          <Dialog.Content className='absolute inset-1/2 -translate-x-1/2  -translate-y-3/4 h-fit w-fit p-6 bg-white'>
            <div className='p-4 w-96 flex flex-col text-black opacity-100'>
              <div className='flex flex-row justify-between'>
                <span>{header}</span>
                <Dialog.Trigger
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  <Cross1Icon />
                </Dialog.Trigger>
              </div>
              <span>{description}</span>
              <div className='flex flex-row justify-between'>
                <button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  {yesText}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  {noText}
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

TableDropdownDialog.displayName = "TableDropdownDialog";

export default TableDropdownDialog;
