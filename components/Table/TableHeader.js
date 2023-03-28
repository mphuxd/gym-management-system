import React from 'react';

function TableHeader({ children }) {
  return (
    <td className="h-9 text-sm font-semibold">
      <span className="m-2 h-5">{children}</span>
    </td>
  );
}

export default TableHeader;
