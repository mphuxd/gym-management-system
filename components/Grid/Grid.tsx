import React from 'react';
import cx from 'classnames';
import { cva, type VariantProps } from 'class-variance-authority';

const gridStyles = cva('grid', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    },
    gap: {},
  },
  defaultVariants: {
    columns: 12,
  },
});

export interface GridProps extends VariantProps<typeof gridStyles> {
  as?: 'div' | 'section' | 'article';
  children?: React.ReactNode;
  className?: string;
}

function Grid({ as = 'div', children, columns, className }: GridProps) {
  const classNames = cx(gridStyles({ columns }), className);
  return React.createElement(as, { className: classNames }, children);
}

export default Grid;
