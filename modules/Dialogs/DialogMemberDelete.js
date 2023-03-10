import React from 'react';
import { AlertDialog } from '@/components';

function DialogMemberDelete({ isOpen, setIsOpen, memberId }) {
  return (
    <AlertDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      intent="constrained"
      actionPhrase="delete member"
      title="Delete Member?"
      description="This action cannot be undone. This will permanently delete the member and remove their data from our servers. If the member has an active membership, this action will fail."
      close="No, go back."
      action="Yes, delete member."
      href={`/api/member/delete/${memberId}`}
      toastTitle="Member Deleted"
      toastDescription="Successfully deleted member."
    />
  );
}

export default DialogMemberDelete;
