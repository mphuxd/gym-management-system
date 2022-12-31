import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import { TrashCan } from "@carbon/icons-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { EditMemberDialogForm } from "@/modules";
import {
  AlertDialog,
  Button,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components";

function CheckInMemberDropdownMenu({ checkedInMember, mutate }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <React.Fragment>
      <DropdownMenu.Root>
        <DropdownTrigger asChild>
          <Button
            className='my-auto flex flex-row gap-x-2 items-center'
            as='button'
            size='base'
            intent='tertiary'
            rounded
          >
            <span>Actions</span>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownContent align='end'>
          <DropdownMenu.Group>
            <DropdownItem>
              <Link href={`members/details/${checkedInMember.id}`}>View Member Details</Link>
            </DropdownItem>
            <DropdownItem>
              <button
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
                className='text-red11 flex items-center gap-x-1'
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
                className='text-red11 flex items-center gap-x-1'
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

      <EditMemberDialogForm
        member={checkedInMember}
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        mutate={mutate}
      />

      <AlertDialog
        isOpen={isCancelDialogOpen}
        setIsOpen={setIsCancelDialogOpen}
        title='Cancel Membership?'
        description='This action cannot be undone. This will permanently cancel the membership. The member will have access until the end of their billing cycle, and will be charged applicable cancellation fees.'
        close='No, go back.'
        action='Yes, cancel membership.'
        href={`api/member/cancel/${checkedInMember.userId}`}
      />
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        title='Delete Member?'
        description='This action cannot be undone. This will permanently delete the member and remove their data from our servers. If the member has an active membership, this action will fail.'
        close='No, go back.'
        action='Yes, delete member.'
        href={`api/member/delete/${checkedInMember.userId}`}
      />
    </React.Fragment>
  );
}

export default CheckInMemberDropdownMenu;
