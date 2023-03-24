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
import { DialogMemberDelete, DialogMembershipCancel } from '@/modules';
import {
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
        <Grid
          as="section"
          className="max-w-[1920px] gap-y-0 mx-auto auto-rows-min p-8"
        >
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
                intent="neutral"
                size="base"
                onChange={onChange}
                {...register('searchValue')}
              />
            </Stack>
          </Stack>
          <div className="col-span-full h-fit">
            <div className="h-[378px] bg-white">
              <Table
                className=""
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
            </div>
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
        className="mx-auto p-2 hover:shadow-xl hover:outline outline-2 outline-blue9 active:outline-blue9 active:outline overflow-hidden block bg-transparent"
      >
        <DotsHorizontalIcon />
      </DropdownMenu.Trigger>
      <DropdownContent onClick={(e) => e.stopPropagation()} align="end">
        <DropdownMenu.Group>
          <DropdownItem asChild>
            <Link href={`members/details/${row.id}`}>View Member Details</Link>
          </DropdownItem>
          <DropdownItem asChild>
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
          <DropdownItem asChild>
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
          <DropdownItem asChild>
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
      <DialogMemberDelete
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        memberId={row.id}
      />
      <DialogMembershipCancel
        isOpen={isCancelDialogOpen}
        setIsOpen={setIsCancelDialogOpen}
        memberId={row.id}
      />
    </DropdownMenu.Root>
  );
}
