import React from 'react';
import cx from 'classnames';
import * as Select from '@radix-ui/react-select';
import { CheckIcon } from '@radix-ui/react-icons';

const FormSelectItem = React.forwardRef(
  ({ children, className, value, ...props }, forwardedRef) => {
    const classNames = cx(
      className,
      'relative flex w-full flex-row items-center px-2 hover:bg-layer-hover'
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
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

FormSelectItem.displayName = 'FormSelectItem';

export default FormSelectItem;
