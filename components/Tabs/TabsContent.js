import React from 'react';
import cx from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';
import styles from './Tabs.module.scss';

const TabsContent = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(styles.tabsContent, className);
  return (
    <Tabs.Content className={classNames} {...rest} ref={forwardedRef}>
      {children}
    </Tabs.Content>
  );
});

TabsContent.displayName = 'TabsContent';

export default TabsContent;
