import React from "react";
import { cva } from "class-variance-authority";
import cx from "classnames";

const buttonStyles = cva(["focus:outline"], {
  variants: {
    intent: {
      primary: "bg-blue10 text-white hover:bg-blue11",
      secondary: "bg-red-400 text-white",
      tertiary:
        "text-blue11 outline-blue9 outline outline-[1px] hover:text-white hover:shadow-sm hover:bg-blue11 active:bg-blue11 active:text-white ",
      neutral:
        "text-slate11 border-slate9 border-[1px] hover:text-slate12 hover:shadow-sm hover:shadow-sand8 hover:bg-slate3 hover:border-slate10 hover:ring-0 focus:bg-slate4 active:bg-slate5",
      warning: "",
      danger: "text-red11 bg-red4 hover:bg-red5 active:bg-red6  focus:outline-red7",
    },
    size: {
      small: "text-sm py-1 px-2",
      base: "px-4 py-1",
      large: "px-4 py-2",
    },
    rounded: {
      true: "rounded-md",
      false: "",
    },
  },
  defaultVariants: {
    intent: "neutral",
    size: "base",
    rounded: "true",
  },
});

const Button = React.forwardRef(
  (
    { as = "button", type, intent, size, onClick, className, label, children, rounded, ...props },
    forwardedRef
  ) => {
    const classNames = cx(buttonStyles({ intent, size, rounded }), className);
    return React.createElement(
      as,
      {
        type: type,
        onClick: onClick,
        className: classNames,
        value: label,
        ref: forwardedRef,
        ...props,
      },
      children
    );
  }
);

Button.displayName = "Button";

export default Button;
