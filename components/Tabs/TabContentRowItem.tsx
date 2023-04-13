import React from 'react';
import cx from 'classnames';
import * as Label from '@radix-ui/react-label';

export interface TableContentRowItemProps {
  label: string;
  value?: React.ReactNode;
  space?: 'third' | 'half' | 'full';
}

function TabContentRowItem({
  label,
  value = '-',
  space,
}: TableContentRowItemProps) {
  const id = label.toLowerCase().replaceAll(' ', '-');

  const classNames = cx('flex flex-col', {
    'basis-1/2': space === 'half',
    'basis-1/3': space === 'third',
    'basis-full': space === 'full' || null,
  });

  return (
    <div className={classNames}>
      <Label.Root
        className="mb-1 text-sm font-medium text-support"
        htmlFor={id}
      >
        {label}
      </Label.Root>
      <span id={id}>{value}</span>
    </div>
  );
}

export default TabContentRowItem;
