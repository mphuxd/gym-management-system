import React from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';
import cx from 'classnames';

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
  ) => (
    <Select.Root className={cx(className, 'w-full')} {...props}>
      <div className="flex flex-col">
        <Label.Root
          className="mb-2 text-sm font-medium text-support"
          htmlFor={id}
        >
          {label}
        </Label.Root>
        <Select.Trigger
          className="relative flex h-8 w-full flex-row items-center justify-between border-b px-2 py-1 focus:shadow-md focus:shadow-blue4"
          aria-label={ariaLabel}
          ref={forwardedRef}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDownIcon className="fill-icon" />
          </Select.Icon>
        </Select.Trigger>
        {error && <span>{errorMessage}</span>}
      </div>

      <Select.Portal>
        <Select.Content className="z-40 w-full overflow-hidden bg-white">
          <Select.Viewport className="w-full rounded-sm border border-gray7 hover:border-border-strong-dark">
            {children}
          </Select.Viewport>
          <Select.ScrollDownButton>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
