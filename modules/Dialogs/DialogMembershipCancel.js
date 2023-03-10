import React from 'react';
import { AlertDialog } from '@/components';

function DialogMembershipCancel({ isOpen, setIsOpen, memberId }) {
  return (
    <AlertDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      intent="constrained"
      actionPhrase="cancel membership"
      title="Cancel Membership?"
      description="This action cannot be undone. This will permanently cancel the membership. The member will have access until the end of their billing cycle, and will be charged applicable cancellation fees."
      close="No, go back."
      action="Yes, cancel membership."
      href={`/api/member/cancel/${memberId}`}
      toastTitle="Membership Cancelled"
      toastDescription="Successfully cancelled membership."
    />
  );
}

export default DialogMembershipCancel;
