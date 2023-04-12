import React from 'react';
import cx from 'classnames';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export interface TableProps
  extends React.ComponentPropsWithoutRef<typeof TableRow> {
  headers: string[];
  rows: { id: string }[];
  render: () => React.ReactNode;
  onClick: () => void;
  className?: string;
}

function Table({
  headers,
  rows,
  render,
  onClick,
  className,
  cursor,
  layer = 'default',
}: TableProps) {
  return (
    <table className={cx(className, 'w-full table-auto text-sm')}>
      <thead>
        <tr className="bg-gray4">
          {headers &&
            headers.map((header) => (
              <TableHeader key={header}>{header}</TableHeader>
            ))}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row) => (
            <TableRow
              layer={layer}
              key={row.id}
              row={row}
              render={render}
              cursor={cursor}
              onClick={onClick}
            />
          ))}
      </tbody>
    </table>
  );
}

export default Table;

// @@@ consider refactoring away from render function
// @@@ consider tanstack tables
