import React from "react";
import Link from "next/link";

function TableRow({ onClick, render, row }) {
  return (
    <tr
      onClick={(e) => onClick(e, row)}
      className='relative hover:cursor-pointer border-y-[1px]  border-gray-200 hover:bg-gray-200 overflow-hidden'
    >
      {render(row)}
    </tr>
  );
}

export default TableRow;
