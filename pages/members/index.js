import React, { useState } from 'react';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { gql, useQuery } from '@apollo/client';
import { toastAtom } from 'atoms';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { TrashCan } from '@carbon/icons-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  AlertDialog,
  Button,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  Grid,
  Screen,
  Searchbar,
  Stack,
  Table,
  TableRowCell,
  TablePagination,
} from '@/components';

const allMembersQuery = gql`
  query {
    members {
      id
      userId
      firstName
      lastName
      birthday
      createdAt
      contact {
        id
        email
        phoneNumber
      }
      membership {
        id
        signUpDate
        status
        plan {
          id
          planName
        }
      }
    }
  }
`;

export const getServerSideProps = withPageAuthRequired();

function getRows(data) {
  return data.members.map((member) => ({
    id: member.id,
    firstName: member.firstName,
    lastName: member.lastName,
    userId: member.userId,
    birthday: member.birthday,
    email: member.contact.email,
    phoneNumber: member.contact.phoneNumber,
    plan: member.membership.plan.planName,
    status: member.membership.status,
    created: new Date(member.createdAt).toLocaleString(),
  }));
}

export default function Members() {
  const router = useRouter();
  const { data: allMembers, loading, error } = useQuery(allMembersQuery);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [filteredMembers, setFilteredMembers] = useState(null);

  const headers = [
    'First Name',
    'Last Name',
    'User Id',
    'Birthday',
    'Email',
    'Phone Number',
    'Membership Plan',
    'Status',
    'Created',
    '',
  ];

  function handleFilterMembers(e, data) {
    const input = e.target.value.toLowerCase().trim();
    const filtered = data.members.filter((member) => {
      // create array of values to filter
      const memberValues = [
        member.firstName,
        member.lastName,
        `${member.firstName} ${member.lastName}`,
        member.userId,
        member.birthday,
        member.contact.email,
        member.contact.phoneNumber,
        member.membership.plan.planName,
        member.membership.status,
      ];
      // return members with values that include input
      for (let i = 0; i < memberValues.length; i += 1) {
        if (memberValues[i] && memberValues[i].toLowerCase().includes(input))
          return member;
      }

      return false;
    });
    setFilteredMembers(filtered);
  }

  const { register } = useForm();
  const { onChange } = register('searchValue', {
    onChange: (e) => handleFilterMembers(e, allMembers),
  });

  if (loading) return null; // @@@ Create skeleton
  if (error) return null;
  if (allMembers) {
    const members = filteredMembers ? { members: filteredMembers } : allMembers;
    const allRows = getRows(members);
    const rows = allRows.slice(firstRowIndex, firstRowIndex + currentPageSize);
    return (
      <Screen>
        <Grid as="section" className="gap-y-0 mx-auto auto-rows-min p-8">
          <div className="col-span-full mb-2">
            <h1 className="font-semibold text-lg">Members</h1>
          </div>
          <Stack
            direction="row"
            className="justify-between col-span-full h-fit"
          >
            <Stack direction="row" className="items-center">
              <Searchbar
                name="searchValue"
                placeholder="Search"
                intent="primary"
                size="base"
                onChange={onChange}
                {...register('searchValue')}
              />
            </Stack>
            <Stack direction="row" className="gap-x-2">
              <Button
                className="text-gray-600"
                as="div"
                size="small"
                variant="default"
              >
                Filter
              </Button>
              {/* TO:DO: Add Filter */}
              <Button disabled as="button" size="small" variant="default">
                Reset Filter
              </Button>
            </Stack>
          </Stack>
          <div className="col-span-full h-fit mt-4">
            <Table
              headers={headers}
              rows={rows}
              onClick={(e, row) => {
                e.stopPropagation();
                e.preventDefault();
                router.push(`members/details/${row.id}`);
              }}
              render={(row, idx) => (
                <>
                  {Object.values(row).map((cell, jdx) => {
                    if (jdx !== 0) {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableRowCell className="px-2" key={jdx}>
                          {cell}
                        </TableRowCell>
                      );
                    }
                    return null;
                  })}
                  <TableRowCell key={idx}>
                    <TableDropdown row={row} />
                  </TableRowCell>
                </>
              )}
            />
            <TablePagination
              totalItems={allRows.length}
              backText="Previous"
              nextText="Next"
              pageSize={currentPageSize}
              pageSizes={[5, 10, 15, 25]}
              onChange={(page, pageSize) => {
                if (pageSize !== currentPageSize) setCurrentPageSize(pageSize);
                setFirstRowIndex(pageSize * (page - 1));
              }}
            />
          </div>
        </Grid>
      </Screen>
    );
  }
}

function TableDropdown({ row }) {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [toast, setToast] = useAtom(toastAtom);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="mx-auto p-2 hover:shadow-xl hover:outline outline-1 rounded-lg outline-gray7 active:outline-gray8 active:outline overflow-hidden block"
      >
        <DotsHorizontalIcon />
      </DropdownMenu.Trigger>
      <DropdownContent onClick={(e) => e.stopPropagation()} align="end">
        <DropdownMenu.Group>
          <DropdownItem>
            <Link href={`members/details/${row.id}`}>View Member Details</Link>
          </DropdownItem>
          <DropdownItem>
            <button
              type="button"
              onClick={async () => {
                try {
                  await fetch(`/api/checkin/${row.id}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }).then(
                    () =>
                      setToast({
                        title: 'Checked In Member',
                        description: row.id,
                        isOpen: true,
                        intent: 'success',
                      }),
                    router.push('/checkin')
                  );
                } catch (err) {
                  setToast({
                    title: 'Edit Failed',
                    description: err.message,
                    isOpen: true,
                    intent: 'error',
                  });
                }
              }}
            >
              Check In Member
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
      <AlertDialog
        isOpen={isCancelDialogOpen}
        setIsOpen={setIsCancelDialogOpen}
        intent="constrained"
        actionPhrase="cancel membership"
        title="Cancel Membership?"
        description="This action cannot be undone. This will permanently cancel the membership. The member will have access until the end of their billing cycle, and will be charged applicable cancellation fees."
        close="No, go back."
        action="Yes, cancel membership."
        href={`/api/member/cancel/${row.id}`}
        toastTitle="Membership Cancelled"
        toastDescription="Successfully cancelled membership."
      />
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        intent="constrained"
        actionPhrase="delete member"
        title="Delete Member?"
        description="This action cannot be undone. This will permanently delete the member and remove their data from our servers. If the member has an active membership, this action will fail."
        close="No, go back."
        action="Yes, delete member."
        href={`/api/member/delete/${row.id}`}
        toastTitle="Member Deleted"
        toastDescription="Successfully deleted member."
      />
    </DropdownMenu.Root>
  );
}
