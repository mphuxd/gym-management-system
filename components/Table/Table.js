import React from 'react';
import cx from 'classnames';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

function Table({ headers, rows, render, onClick, className }) {
  return (
    <table className={cx('table-auto w-full text-sm', className)}>
      <thead>
        <tr className="bg-gray4">
          {headers &&
            headers.map((header) => <TableHeader>{header}</TableHeader>)}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row) => (
            <TableRow onClick={onClick} row={row} render={render} />
          ))}
      </tbody>
    </table>
  );
}

export default Table;
