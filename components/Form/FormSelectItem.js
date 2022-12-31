import React from "react";
import cx from "classnames";
import * as Select from "@radix-ui/react-select";
import { CheckIcon } from "@radix-ui/react-icons";

const FormSelectItem = React.forwardRef(
  ({ children, className, value, ...props }, forwardedRef) => {
    return (
      <Select.Item
        value={value}
        className={cx("flex flex-row w-full relative px-2 hover:bg-gray4 items-center", className)}
        {...props}
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

FormSelectItem.displayName = "FormSelectItem";

export default FormSelectItem;
