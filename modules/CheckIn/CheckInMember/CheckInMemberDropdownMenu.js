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
            className="my-auto flex flex-row gap-x-2 items-center justify-between"
            as="button"
            size="large"
            intent="tertiary"
            length="medium"
          >
            <span>Actions</span>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownContent align="end">
          <DropdownMenu.Group>
            <DropdownItem asChild>
              <Link href={`members/details/${checkedInMember.id}`}>
                View Member Details
              </Link>
            </DropdownItem>
            <DropdownItem asChild>
              <button
                type="button"
                onSelect={() => {
                  setIsEditDialogOpen(true);
                }}
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
            <DropdownItem asChild>
              <button
                type="button"
                className="text-error flex items-center gap-x-1"
                onClick={() => {
                  setIsCancelDialogOpen(true);
                }}
                onSelect={() => {
                  setIsCancelDialogOpen(true);
                }}
              >
                <Cross2Icon />
                Cancel Membership
              </button>
            </DropdownItem>
            <DropdownItem asChild>
              <button
                type="button"
                className="text-error flex items-center gap-x-1"
                onSelect={() => {
                  setIsDeleteDialogOpen(true);
                }}
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
