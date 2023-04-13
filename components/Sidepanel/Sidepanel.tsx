import React from 'react';
import cx from 'classnames';

export interface SidepanelProps
  extends React.ComponentPropsWithoutRef<'aside'> {
  children: React.ReactNode;
  className?: string;
}

function Sidepanel({ children, className }: SidepanelProps) {
  return (
    <aside
      className={cx(
        className,
        'flex w-left-sidepanel flex-col border-none p-8'
      )}
    >
      {children}
    </aside>
  );
}

export default Sidepanel;
