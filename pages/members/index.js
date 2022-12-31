import React, { useState } from "react";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { gql, useQuery } from "@apollo/client";
import { toastAtom } from "atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Cross2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { TrashCan } from "@carbon/icons-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  Button,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  Grid,
  Searchbar,
  Stack,
  Table,
  TableRowCell,
  TablePagination,
} from "@/components";

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
    "First Name",
    "Last Name",
    "User Id",
    "Birthday",
    "Email",
    "Phone Number",
    "Membership Plan",
    "Status",
    "Created",
    "",
  ];

  const { register } = useForm();
  const { onChange } = register("searchValue", {
    onChange: (e) => handleFilterMembers(e, allMembers),
  });

  function handleFilterMembers(e, data) {
    const input = e.target.value.toLowerCase().trim();
    const filteredMembers = data.members.filter((member) => {
      //create array of values to filter
      const memberValues = [
        member.firstName,
        member.lastName,
        member.firstName + " " + member.lastName,
        member.userId,
        member.birthday,
        member.contact.email,
        member.contact.phoneNumber,
        member.membership.plan.planName,
        member.membership.status,
      ];
      //return members with values that include input
      for (let i = 0; i < memberValues.length; i++) {
        if (memberValues[i] && memberValues[i].toLowerCase().includes(input)) return member;
      }
    });
    setFilteredMembers(filteredMembers);
  }

  if (loading) return; //@@@ Create skeleton
  if (error) return console.log(error);
  if (allMembers) {
    const members = filteredMembers ? { members: filteredMembers } : allMembers;
    const allRows = getRows(members);
    const rows = allRows.slice(firstRowIndex, firstRowIndex + currentPageSize);
    return (
      <Grid
        as='section'
        className='min-h-screen-calc gap-y-0 min-w-[1280px] mx-auto auto-rows-min p-8 bg-slate2'
      >
        <div className='col-span-full mb-2'>
          <h1 className='font-semibold text-lg'>Members</h1>
        </div>
        <Stack direction='row' className='justify-between col-span-full h-fit'>
          <Stack direction='row' className='items-center'>
            <Searchbar
              name='searchValue'
              placeholder='Search'
              intent='primary'
              size='base'
              onChange={onChange}
              {...register("searchValue")}
            />
          </Stack>
          <Stack direction='row' className='gap-x-2'>
            <button>
              <Button className='text-gray-600' as='div' size='small' variant='default'>
                Filter
              </Button>
            </button>

            {/* TO:DO: Add Filter */}
            <Button disabled as='button' size='small' variant='default'>
              Reset Filter
            </Button>
          </Stack>
        </Stack>
        <div className='col-span-full h-fit mt-4'>
          <Table
            headers={headers}
            rows={rows}
            onClick={(e, row) => {
              e.stopPropagation();
              e.preventDefault();
              router.push(`members/details/${row.id}`);
            }}
            render={(row) => {
              return (
                <React.Fragment>
                  {Object.values(row).map((cell, idx) => {
                    if (idx !== 0) {
                      return <TableRowCell key={idx}>{cell}</TableRowCell>;
                    }
                  })}
                  <TableRowCell>
                    <TableDropdown row={row} />
                  </TableRowCell>
                </React.Fragment>
              );
            }}
          />
          <TablePagination
            totalItems={allRows.length}
            backText='Previous'
            nextText='Next'
            pageSize={currentPageSize}
            pageSizes={[5, 10, 15, 25]}
            onChange={(page, pageSize) => {
              if (pageSize !== currentPageSize) setCurrentPageSize(pageSize);
              setFirstRowIndex(pageSize * (page - 1));
            }}
          />
        </div>
      </Grid>
    );
  }
}

function TableDropdown({ row }) {
  const router = useRouter();
  const [toast, setToast] = useAtom(toastAtom);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  return (
    <DropdownMenu.Root className=''>
      <DropdownMenu.Trigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className='mx-auto p-2 hover:shadow-xl hover:outline outline-1 rounded-lg outline-gray7 active:outline-gray8 active:outline overflow-hidden block'
      >
        <DotsHorizontalIcon className='' />
      </DropdownMenu.Trigger>
      <DropdownContent onClick={(e) => e.stopPropagation()} align='end'>
        <DropdownMenu.Group>
          <DropdownItem>
            <Link href={`members/details/${row.id}`}>View Member Details</Link>
          </DropdownItem>
          <DropdownItem>
            <button
              onClick={async () => {
                try {
                  await fetch(`/api/checkin/${row.id}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(
                    (res) =>
                      setToast({
                        title: "Checked In Member",
                        description: row.id,
                        isOpen: true,
                      }),
                    router.push("/checkin")
                  );
                } catch (err) {
                  setToast({
                    title: "Edit Failed",
                    description: err.message,
                    isOpen: true,
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
