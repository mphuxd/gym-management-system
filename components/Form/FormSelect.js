import React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import cx from "classnames";

const FormSelect = React.forwardRef(
  (
    {
      id,
      label,
      ariaLabel,
      children,
      placeholder,
      className,
      error = null,
      errorMessage,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Select.Root className={cx("w-full", className)} {...props}>
        <div className='flex flex-col'>
          <Label.Root className='text-sm text-slate12 font-medium mb-2' htmlFor={id}>
            {label}
          </Label.Root>
          <Select.Trigger
            className='flex flex-row items-center justify-between w-full px-2 py-1 h-8 relative border border-gray7 hover:border-gray8 focus:outline-blue8 focus:shadow-md focus:shadow-blue4'
            aria-label={ariaLabel}
            ref={forwardedRef}
          >
            <Select.Value placeholder={placeholder} />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          {error && <span>{errorMessage}</span>}
        </div>

        <Select.Portal>
          <Select.Content className='bg-white overflow-hidden w-full'>
            <Select.Viewport className='w-full border border-1 border-gray7 hover:border-gray8 rounded-md '>
              {children}
            </Select.Viewport>
            <Select.ScrollDownButton>
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
