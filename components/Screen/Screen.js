import React from 'react';
import { cva } from 'class-variance-authority';
import cx from 'classnames';

const screenStyles = cva('', {
  variants: {
    intent: {
      standard: 'w-full min-w-[1440px] min-h-screen-no-header',
    },
    background: {
      primary: 'bg-background',
      alt: 'bg-background-alt',
    },
  },
  defaultVariants: {
    intent: 'standard',
    background: 'primary',
  },
});

function Screen({ as = 'div', intent, color, className, children }) {
  const classNames = cx(screenStyles({ intent, color }), className);
  return React.createElement(
    as,
    {
      className: classNames,
    },
    children
  );
}

export default Screen;
