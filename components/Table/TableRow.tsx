import React from 'react';
import cx from 'classnames';

export interface TableRowProps extends React.ComponentPropsWithoutRef<'tr'> {
  cursor?: 'pointer' | 'auto' | 'text';
  layer?: 'default' | string;
  onClick: (...args) => void;
  render: (row) => React.ReactNode;
  row: { id: string };
}

function TableRow({
  cursor = 'pointer',
  layer,
  onClick,
  render,
  row,
}: TableRowProps) {
  const classNames = cx(
    'relative h-fit overflow-hidden border-y border-border-subtle-darker focusable hover:bg-layer-hover active:bg-layer-active',
    {
      'hover:cursor-auto': cursor === 'auto',
      'hover:cursor-pointer': cursor === 'pointer',
      'hover:cursor-text': cursor === 'text',
      'bg-layer': layer === 'default',
      'bg-layer-alt': layer !== 'default',
    }
  );

  return (
    <tr tabIndex={0} onClick={(e) => onClick(e, row)} className={classNames}>
      {render(row)}
    </tr>
  );
}

export default TableRow;
