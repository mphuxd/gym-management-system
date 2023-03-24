import React from 'react';
import cx from 'classnames';
import * as Label from '@radix-ui/react-label';

function TabContentRowItem({ label, value = '-', space }) {
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
