import React from 'react';

function TableHeader({ children }) {
  return (
    <td className="py-2 border-y-[1px] border-gray-200 font-semibold text-sm">
      {children}
    </td>
  );
}

export default TableHeader;
