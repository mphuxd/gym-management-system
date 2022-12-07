import React from "react";

function TableHeader({ children }) {
  return (
    <td className='p-2 pt-4 border-y-[1px] border-gray-200 font-light text-sm uppercase'>
      {children}
    </td>
  );
}

export default TableHeader;
