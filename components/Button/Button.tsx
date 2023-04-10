import React, { type ReactNode, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import cx from 'classnames';
import Link from 'next/link';

const buttonStyles = cva(['text-sm'], {
  variants: {
    intent: {
      primary:
        'focusable bg-primary text-white hover:bg-blue11 focus:bg-primary focus:text-white focus:ring-[3px] focus:ring-inset focus:ring-white active:bg-blue12 active:text-white active:outline-none active:ring-0',
      secondary:
        'bg-secondary text-white hover:bg-slate9 active:bg-slate11 active:outline-none',
      tertiary:
        'focusable bg-white text-blue11 outline outline-1 -outline-offset-1 outline-blue9 hover:bg-blue11 hover:text-white focus:bg-primary focus:text-white focus:ring-[3px] focus:ring-inset focus:ring-white active:bg-blue12 active:text-white active:outline-none active:ring-0',
      neutral:
        'text-support outline outline-1 -outline-offset-1 outline-border-strong-darker hover:bg-layer-hover hover:shadow-sm hover:shadow-sand8 hover:outline-border-strong-darkest active:bg-layer-active',
      danger:
        'focusable block bg-neg text-white hover:bg-neg-hover focus:ring-[3px] focus:ring-inset focus:ring-focus-inset active:bg-neg-active active:outline-red8 active:ring-0 active:drop-shadow',
      dark: 'bg-slate3Dark text-white hover:bg-slate4Dark active:bg-slate3Dark active:outline-none',
      disabled: 'text-gray8 outline outline-2 outline-gray6',
      ghost: 'focusable text-dark hover:bg-gray6 active:bg-layer-active',
    },
    size: {
      small: 'px-2 py-1',
      base: 'px-4 py-2',
      large: 'px-4 py-3',
    },
    length: {
      auto: 'w-fit',
      xs: 'w-20',
      small: 'w-24',
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

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  as: 'button' | 'link' | 'div';
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  className: string;
  label: string;
  children?: ReactNode;
  href?: string;
}

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
      href,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    const classNames = cx(buttonStyles({ intent, size, length }), className);
    return as === 'link' ? (
      <Link
        href={href}
        ref={forwardedRef as Ref<HTMLAnchorElement>}
        className={classNames}
        {...props}
      >
        {children}
      </Link>
    ) : (
      React.createElement(
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
      )
    );
  }
);

Button.displayName = 'Button';

export default Button;
