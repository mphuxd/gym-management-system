import React from 'react';
import cx from 'classnames';

function Sidepanel({ children, className }) {
  const classNames = cx(
    className,
    'flex flex-col w-left-sidepanel p-8  border-r border-secondary min-h-screen-no-header h-ful'
  );
  return <aside className={classNames}>{children}</aside>;
}

export default Sidepanel;

// @@@ revisit border style
