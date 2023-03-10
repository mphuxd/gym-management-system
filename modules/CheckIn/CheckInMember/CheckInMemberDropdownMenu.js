import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import { TrashCan } from '@carbon/icons-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  Button,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from '@/components';
import {
  DialogEditMemberForm,
  DialogMemberDelete,
  DialogMembershipCancel,
} from '@/modules';

function CheckInMemberDropdownMenu({ checkedInMember, mutate }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownTrigger asChild>
          <Button
            className="my-auto flex flex-row gap-x-2 items-center z-10 justify-between"
            as="button"
            size="large"
            intent="tertiary"
            rounded="false"
            length="medium"
          >
            <span>Actions</span>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownContent align="end">
          <DropdownMenu.Group>
            <DropdownItem>
              <Link href={`members/details/${checkedInMember.id}`}>
                View Member Details
              </Link>
            </DropdownItem>
            <DropdownItem>
              <button
                type="button"
                onClick={() => {
                  setIsEditDialogOpen(true);
                }}
              >
                Edit Member Information
              </button>
            </DropdownItem>
          </DropdownMenu.Group>
          <DropdownSeparator />
          <DropdownMenu.Group>
            <DropdownItem>
              <button
                type="button"
                className="text-red11 flex items-center gap-x-1"
                onClick={() => {
                  setIsCancelDialogOpen(true);
                }}
              >
                <Cross2Icon />
                Cancel Membership
              </button>
            </DropdownItem>
            <DropdownItem>
              <button
                type="button"
                className="text-red11 flex items-center gap-x-1"
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                }}
              >
                <TrashCan />
                Delete Member
              </button>
            </DropdownItem>
          </DropdownMenu.Group>
          <DropdownMenu.Arrow />
        </DropdownContent>
      </DropdownMenu.Root>
      <DialogEditMemberForm
        member={checkedInMember}
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        mutate={mutate}
      />
      <DialogMemberDelete
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        memberId={checkedInMember.id}
      />
      <DialogMembershipCancel
        isOpen={isCancelDialogOpen}
        setIsOpen={setIsCancelDialogOpen}
        memberId={checkedInMember.id}
      />
    </>
  );
}

export default CheckInMemberDropdownMenu;
