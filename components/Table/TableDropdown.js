import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { AlertDialog, DropdownItem, DropdownContent, DropdownSeparator } from "/components";

function TableDropdown({ row }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  return (
    <DropdownMenu.Root className=''>
      <DropdownMenu.Trigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className='mx-auto p-2 hover:shadow-xl hover:outline outline-1 rounded-lg outline-gray-200 hover:bg-white active:bg-white active:outline overflow-hidden block'
      >
        <DotsHorizontalIcon className='' />
      </DropdownMenu.Trigger>
      <DropdownContent onClick={(e) => e.stopPropagation()} align='end'>
        <DropdownMenu.Group>
          <DropdownItem>
            <Link href={`members/details/${row.id}`}>View Details</Link>
          </DropdownItem>
          <DropdownItem>
            <Link href={`api/manage/${row.userId}`}>Manage Membership</Link>
          </DropdownItem>
        </DropdownMenu.Group>
        <DropdownSeparator />
        <DropdownMenu.Group>
          <DropdownItem>
            <button
              onClick={() => {
                setIsCancelDialogOpen(true);
              }}
            >
              Cancel Membership
            </button>
          </DropdownItem>
          <DropdownItem>
            <button
              onClick={() => {
                setIsDeleteDialogOpen(true);
              }}
            >
              Delete Member
            </button>
          </DropdownItem>
        </DropdownMenu.Group>
        <DropdownMenu.Arrow />
      </DropdownContent>
      <AlertDialog
        isOpen={isCancelDialogOpen}
        setIsOpen={setIsCancelDialogOpen}
        title='Cancel Membership?'
        description='This action cannot be undone. This will permanently cancel the membership. The member will have access until the end of their billing cycle, and will be charged applicable cancellation fees.'
        close='No, go back.'
        action='Yes, cancel membership.'
        href={`api/member/cancel/${row.userId}`}
      />
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        title='Delete Member?'
        description='This action cannot be undone. This will permanently delete the member and remove their data from our servers. If the member has an active membership, this action will fail.'
        close='No, go back.'
        action='Yes, delete member.'
        href={`api/member/delete/${row.userId}`}
      />
    </DropdownMenu.Root>
  );
}

export default TableDropdown;
