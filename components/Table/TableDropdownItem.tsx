import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export interface TableDropdownItemProps {
  children: React.ReactNode;
}

function TableDropdownItem({ children }: TableDropdownItemProps) {
  return (
    <DropdownMenu.Item className="focus:outline-none">
      {children}
    </DropdownMenu.Item>
  );
}

export default TableDropdownItem;

// @@@ unused
