import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

function Dropdown({ children }) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger />
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content>
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export default Dropdown;
