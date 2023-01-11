import React from 'react';
import cx from 'classnames';

function TabContentRow({ children, className }) {
  const classNames = cx(className, 'flex flex-row');
  return <div className={classNames}>{children}</div>;
}

export default TabContentRow;
