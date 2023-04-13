import React from 'react';
import cx from 'classnames';

export interface TabsContentRowProps {
  children: React.ReactNode;
  className?: string;
}

function TabContentRow({ children, className }: TabsContentRowProps) {
  const classNames = cx(className, 'flex flex-row');
  return <div className={classNames}>{children}</div>;
}

export default TabContentRow;
