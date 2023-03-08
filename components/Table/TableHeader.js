import React from 'react';

function TableHeader({ children }) {
  return (
    <td className="p-2 border-y-[1px] border-gray-200 font-semibold text-sm">
      {children}
    </td>
  );
}

export default TableHeader;
