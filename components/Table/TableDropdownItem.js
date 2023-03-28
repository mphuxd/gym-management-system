import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function TableDropdownItem({ children }) {
  return (
    <DropdownMenu.Item className="focus:outline-none">
      {children}
    </DropdownMenu.Item>
  );
}

export default TableDropdownItem;

// @@@ unused
