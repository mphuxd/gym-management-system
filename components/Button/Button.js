import React from 'react';
import { cva } from 'class-variance-authority';
import cx from 'classnames';

const buttonStyles = cva(['bg-initial'], {
  variants: {
    intent: {
      primary:
        'text-white bg-primary hover:bg-blue9 active:bg-blue11 active:outline-none',
      secondary:
        'text-white bg-secondary hover:bg-slate9 active:bg-slate11 active:outline-none',
      tertiary:
        'text-blue11 bg-white outline outline-1 outline-blue9 -outline-offset-1 hover:text-white hover:shadow-sm hover:bg-blue11 focus:bg-primary focus:text-white focus:outline-white active:bg-blue11 active:text-white active:outline-none',
      neutral:
        'text-support outline-border-strong-darker outline outline-1 -outline-offset-1 hover:shadow-sm hover:shadow-sand8 hover:bg-layer-hover hover:outline-border-strong-darkest active:bg-layer-active',
      danger:
        'block text-white bg-neg hover:bg-neg-hover active:bg-neg-active focus:outline-red7',
      dark: 'text-white bg-slate3Dark hover:bg-slate4Dark active:bg-slate3Dark active:outline-none',
      brand:
        'text-white bg-brand hover:bg-red9 active:bg-red11 active:outline-none',
      disabled: 'text-gray8 outline-gray6 outline outline-2',
    },
    size: {
      small: 'text-sm py-1 px-2',
      base: 'px-4 py-1',
      large: 'px-4 py-2',
    },
    length: {
      auto: 'w-fit',
      medium: 'w-32',
      large: 'w-36',
    },
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'base',
    length: 'auto',
  },
});

const Button = React.forwardRef(
  (
    {
      as = 'button',
      type,
      intent,
      size,
      length,
      onClick,
      className,
      label,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const classNames = cx(buttonStyles({ intent, size, length }), className);
    return React.createElement(
      as,
      {
        type,
        onClick,
        className: classNames,
        value: label,
        ref: forwardedRef,
        ...props,
      },
      children
    );
  }
);

Button.displayName = 'Button';

export default Button;
