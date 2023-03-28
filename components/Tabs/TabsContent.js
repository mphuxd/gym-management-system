import React from 'react';
import cx from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';

const TabsContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    const classNames = cx(className, 'h-[25rem] bg-layer p-8');
    return (
      <Tabs.Content className={classNames} ref={forwardedRef} {...props}>
        {children}
      </Tabs.Content>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export default TabsContent;
