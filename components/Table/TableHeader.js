import React from "react";

function TableHeader({ children }) {
  return (
    <td className='py-2 border-y-[1px] border-gray-200 font-light text-sm uppercase'>
      {children}
    </td>
  );
}

export default TableHeader;
