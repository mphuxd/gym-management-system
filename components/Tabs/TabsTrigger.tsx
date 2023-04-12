import React from 'react';
import cx from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';
import styles from './TabsTrigger.module.scss';

type TabsTriggerRef = React.ElementRef<typeof Tabs.Trigger>;
export interface TabsTriggerProps extends Tabs.TabsTriggerProps {}

const TabsTrigger = React.forwardRef<TabsTriggerRef, TabsTriggerProps>(
  ({ className, ...props }, forwardedRef) => {
    const classNames = cx(className, styles.trigger);
    return (
      <Tabs.Trigger className={classNames} ref={forwardedRef} {...props} />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger;
