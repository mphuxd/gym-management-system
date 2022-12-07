import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table({ headers, rows, render, onClick }) {
  return (
    <table className='table-auto w-full text-sm'>
      <thead>
        <tr>
          {headers && headers.map((header, idx) => <TableHeader key={idx}>{header}</TableHeader>)}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row, idx) => (
            <TableRow onClick={onClick} key={idx} row={row} render={render} />
          ))}
      </tbody>
    </table>
  );
}

export default Table;
