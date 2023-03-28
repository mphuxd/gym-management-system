import React from 'react';
import cx from 'classnames';

function Sidepanel({ children, className }) {
  return (
    <aside
      className={cx(
        className,
        'flex w-left-sidepanel flex-col border-none p-8 '
      )}
    >
      {children}
    </aside>
  );
}

export default Sidepanel;
