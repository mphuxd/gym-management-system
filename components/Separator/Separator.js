import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import cx from 'classnames';

const Separator = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    const classNames = cx(className, 'h-px');
    return (
      <SeparatorPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={classNames}
      />
    );
  }
);

Separator.displayName = 'Separator';

export default Separator;

// @@@ create variants
