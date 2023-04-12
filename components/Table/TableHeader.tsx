import React from 'react';

export interface TableHeaderProps {
  children: React.ReactNode;
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <td className="h-9 text-sm font-semibold">
      <span className="m-2 h-5">{children}</span>
    </td>
  );
}

export default TableHeader;
