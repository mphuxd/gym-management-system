import React from 'react';
import cx from 'classnames';
import * as Select from '@radix-ui/react-select';
import { CheckIcon } from '@radix-ui/react-icons';

const FormSelectItem = React.forwardRef(
  ({ children, className, value, ...props }, forwardedRef) => {
    const classNames = cx(
      className,
      'group relative flex w-full flex-row items-center px-2 hover:bg-layer-hover data-[highlighted]:bg-primary data-[highlighted]:text-white ring-0 outline-none'
    );
    return (
      <Select.Item
        {...props}
        value={value}
        className={classNames}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator>
          <CheckIcon className="text-blue11 group-data-[highlighted]:text-white" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

FormSelectItem.displayName = 'FormSelectItem';

export default FormSelectItem;
