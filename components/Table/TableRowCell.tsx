import React from 'react';

export interface TableRowCellProps
  extends React.ComponentPropsWithoutRef<'td'> {}

function TableRowCell({ children, className, ...props }: TableRowCellProps) {
  return (
    <td {...props} className={className}>
      {children}
    </td>
  );
}

export default TableRowCell;
