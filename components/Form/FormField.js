import React from 'react';
import * as Label from '@radix-ui/react-label';
import cx from 'classnames';

const FormField = React.forwardRef(
  (
    {
      as = 'input',
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
    const field = React.createElement(
      as,
      {
        id,
        type,
        ref: forwardedRef,
        defaultValue,
        className: cx(
          className,
          'px-2 py-1 bg-layer-alt hover:bg-layer-hover focus:shadow-md border-b  focus:shadow-blue5'
        ),
        ...register(id, { required }),
      },
      children
    );
    return (
      <fieldset {...props} className="flex flex-col gap-y-1">
        <Label.Root
          className="mb-1 text-sm font-medium text-support"
          htmlFor={id}
        >
          {label}
        </Label.Root>
        {field}
        {error && (
          <span className="mt-1 text-sm text-neg-text">{errorMessage}</span>
        )}
      </fieldset>
    );
  }
);

FormField.displayName = 'FormField';
export default FormField;
