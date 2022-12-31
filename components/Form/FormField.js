import React from "react";
import * as Label from "@radix-ui/react-label";
import cx from "classnames";

const FormField = React.forwardRef(
  (
    {
      as = "input",
      id,
      label,
      type,
      defaultValue,
      error = null,
      errorMessage,
      children,
      className,
      register,
      required = false,
      ...props
    },
    forwardedRef
  ) => {
    const classNames = cx(
      className,
      "px-2 py-1 border border-gray7 hover:border-gray8 focus:outline-blue8 focus:shadow-md focus:shadow-blue4 rounded-md"
    );
    return (
      <fieldset {...props} className='flex flex-col gap-y-1'>
        <Label.Root className='text-sm mb-1 text-slate12 font-medium' htmlFor={id}>
          {label}
        </Label.Root>
        {React.createElement(
          as,
          {
            id: id,
            type: type,
            ref: forwardedRef,
            defaultValue: defaultValue,
            className: classNames,
            ...register(id, { required }),
          },
          children
        )}
        {error && <span className='text-sm mt-1 text-red11'>{errorMessage}</span>}
      </fieldset>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
