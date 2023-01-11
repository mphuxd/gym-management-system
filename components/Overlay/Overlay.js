import React from 'react';
import cx from 'classnames';

function Overlay({ className }) {
  const classNames = cx(
    className,
    'fixed inset-0 w-full h-full bg-slate12 opacity-70'
  );
  return <div className={classNames} />;
}

export default Overlay;
