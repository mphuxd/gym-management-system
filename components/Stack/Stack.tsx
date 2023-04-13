import React from 'react';
import cx from 'classnames';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType<any>;
  children: React.ReactNode | any;
  direction?: 'col' | 'row';
  className?: string;
}

function Stack({
  as = 'div',
  children,
  direction = 'col',
  className,
  ...props
}: StackProps) {
  const Component = as;
  const classNames = cx(className, {
    'flex flex-col': direction === 'col',
    'flex flex-row': direction === 'row',
  });
  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
}

export default Stack;
