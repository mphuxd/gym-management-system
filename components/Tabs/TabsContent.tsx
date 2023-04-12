import React from 'react';
import cx from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';

type TabsContentRef = React.ElementRef<typeof Tabs.Content>;
export interface TabsContentProps extends Tabs.TabsContentProps {}

const TabsContent = React.forwardRef<TabsContentRef, TabsContentProps>(
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
