import React from "react";

function TableRow({ onClick, render, row }) {
  return (
    <tr
      tabIndex={0}
      onClick={(e) => onClick(e, row)}
      className='relative hover:cursor-pointer border-y-[1px]  border-gray-200 hover:bg-gray-200 overflow-hidden focus:bg-gray-300 focus:outline-none'
    >
      {render(row)}
    </tr>
  );
}

export default TableRow;
