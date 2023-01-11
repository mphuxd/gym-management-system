import React from 'react';

function TableRowCell({ children, className, ...props }) {
  return (
    <td {...props} className={className}>
      {children}
    </td>
  );
}

export default TableRowCell;
