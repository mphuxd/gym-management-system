import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Query } from '@carbon/icons-react';
import { useAtom } from 'jotai';
import { toastAtom } from '@/atoms';
import { Stack, Table, TableRowCell } from '@/components';

const CHECKIN_MEMBER = gql`
  mutation ($memberId: String!) {
    createCheckIn(memberId: $memberId) {
      memberId
    }
  }
`;

export default function CheckInMemberSearchDialogTable({
  mutate,
  setIsOpen,
  searchWarning,
  filteredMembers,
}) {
  const [checkInMember] = useMutation(CHECKIN_MEMBER);
  // eslint-disable-next-line no-unused-vars
  const [toast, setToast] = useAtom(toastAtom);

  const handleOnClickCheckIn = async (e, row) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await checkInMember({ variables: { memberId: row.id } });
      mutate();
      setToast({
        title: 'Checked In Member',
        description: `${row.firstName} ${row.lastName}`,
        isOpen: true,
        intent: 'success',
      });
      setIsOpen(false);
    } catch (err) {
      setToast({
        title: 'Error Occurred',
        description: err.message,
        isOpen: true,
        intent: 'error',
      });
    }
  };

  return (
    <div>
      <Stack className="h-[268px] w-full text-sm">
        <Table
          headers={[
            'First Name',
            'Last Name',
            'User Id',
            'Birthday',
            'Email',
            'Phone Number',
            'Plan',
            'Status',
          ]}
          rows={filteredMembers}
          onClick={handleOnClickCheckIn}
          render={(row) => (
            <>
              <TableRowCell className="px-2 py-1">{row.firstName}</TableRowCell>
              <TableRowCell className="px-2 py-1">{row.lastName}</TableRowCell>
              <TableRowCell className="px-2 py-1">{row.userId}</TableRowCell>
              <TableRowCell className="px-2 py-1">{row.birthday}</TableRowCell>
              <TableRowCell className="px-2 py-1">
                {row.contact.email}
              </TableRowCell>
              <TableRowCell className="px-2 py-1">
                {row.contact.phoneNumber}
              </TableRowCell>
              <TableRowCell className="px-2 py-1">
                {row.membership.plan.planName}
              </TableRowCell>
              <TableRowCell className="px-2 py-1">
                {row.membership.status}
              </TableRowCell>
            </>
          )}
        />
        <NoResultsFound searchWarning={searchWarning} />
      </Stack>
    </div>
  );
}

function NoResultsFound({ searchWarning }) {
  return (
    searchWarning && (
      <Stack direction="row" className="justify-center items-center h-full">
        <Stack direction="row" className="justify-center items-center my-auto">
          <Query className="mx-1" />
          No results found.
        </Stack>
      </Stack>
    )
  );
}
