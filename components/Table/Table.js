import React from 'react';
import cx from 'classnames';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

function Table({ headers, rows, render, onClick, className, cursor }) {
  return (
    <table className={cx('table-auto w-full text-sm', className)}>
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
              cursor={cursor}
              key={row.id}
              onClick={onClick}
              row={row}
              render={render}
            />
          ))}
      </tbody>
    </table>
  );
}

export default Table;
