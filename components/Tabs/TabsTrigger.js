import React from 'react';
import cx from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';
import styles from './Tabs.module.scss';

const TabsTrigger = React.forwardRef((props, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(styles.tabsTrigger, className);
  return <Tabs.Trigger className={classNames} {...rest} ref={forwardedRef} />;
});

TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger;
