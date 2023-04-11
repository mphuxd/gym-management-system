import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
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

export interface ScreenProps extends VariantProps<typeof screenStyles> {
  as?: 'div' | 'section' | 'article';
  className?: string;
  children: React.ReactNode;
}

function Screen({
  as = 'div',
  intent,
  background,
  className,
  children,
}: ScreenProps) {
  const classNames = cx(screenStyles({ intent, background }), className);
  return React.createElement(
    as,
    {
      className: classNames,
    },
    children
  );
}

export default Screen;
