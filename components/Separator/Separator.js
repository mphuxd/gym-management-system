import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import cx from 'classnames';
import styles from './Separator.module.scss';

const Separator = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(className, styles.separator);
  return (
    <SeparatorPrimitive.Root
      className={classNames}
      ref={forwardedRef}
      {...rest}
    />
  );
});

Separator.displayName = 'Separator';

export default Separator;
