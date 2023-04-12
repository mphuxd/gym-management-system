import React from 'react';
import cx from 'classnames';

export interface StackProps {
  as?: React.ElementType;
  children: React.ReactNode;
  direction: 'col' | 'row';
  className?: string;
}

function Stack({
  as = 'div',
  children,
  direction = 'col',
  className,
}: StackProps) {
  const classNames = cx(className, {
    'flex flex-col': direction === 'col',
    'flex flex-row': direction === 'row',
  });
  return React.createElement(as, { className: classNames }, children);
}

export default Stack;
