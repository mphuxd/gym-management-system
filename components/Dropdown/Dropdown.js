import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import React from "react";

function Dropdown({ children }) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger />

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content>
          {/* <DropdownMenuPrimitive.Label />
          <DropdownMenuPrimitive.Item />

          <DropdownMenuPrimitive.Group>
            <DropdownMenuPrimitive.Item />
          </DropdownMenuPrimitive.Group>

          <DropdownMenuPrimitive.CheckboxItem>
            <DropdownMenuPrimitive.ItemIndicator />
          </DropdownMenuPrimitive.CheckboxItem>

          <DropdownMenuPrimitive.RadioGroup>
            <DropdownMenuPrimitive.RadioItem>
              <DropdownMenuPrimitive.ItemIndicator />
            </DropdownMenuPrimitive.RadioItem>
          </DropdownMenuPrimitive.RadioGroup>

          <DropdownMenuPrimitive.Sub>
            <DropdownMenuPrimitive.SubTrigger />
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.SubContent />
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Sub>

          <DropdownMenuPrimitive.Separator />
          <DropdownMenuPrimitive.Arrow /> */}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export default Dropdown;
