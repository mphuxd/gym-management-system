import React from "react";

function TableRow({ onClick, render, row }) {
  return (
    <tr
      tabIndex={0}
      onClick={(e) => onClick(e, row)}
      className='relative hover:cursor-pointer border-y-[1px]  border-gray6 hover:bg-gray4 focus:bg-gray4 active:bg-gray-5 overflow-hidden'
    >
      {render(row)}
    </tr>
  );
}

export default TableRow;
