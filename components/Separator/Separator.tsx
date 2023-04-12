import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import cx from 'classnames';

type SeparatorRef = React.ElementRef<typeof SeparatorPrimitive.Root>;
export interface SeparatorProps extends SeparatorPrimitive.SeparatorProps {}

const Separator = React.forwardRef<SeparatorRef, SeparatorProps>(
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
