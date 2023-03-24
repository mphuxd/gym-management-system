import React from 'react';
import cx from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';
import styles from './TabsTrigger.module.scss';

const TabsTrigger = React.forwardRef(
  ({ className, ...props }, forwardedRef) => {
    const classNames = cx(className, styles.trigger);
    return (
      <Tabs.Trigger className={classNames} ref={forwardedRef} {...props} />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger;
