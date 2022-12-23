import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Grid,
  Table,
  TableRowCell,
  TablePagination,
  TableDropdown,
  Button,
  Searchbar,
  Stack,
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
        email
        phoneNumber
      }
      membership {
        signUpDate
        status
        plan {
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

  if (loading) return console.log("loading"); //@@@ Create skeleton
  if (error) return <div>{error}</div>;
  if (allMembers) {
    const members = filteredMembers ? { members: filteredMembers } : allMembers;
    const allRows = getRows(members);
    const rows = allRows.slice(firstRowIndex, firstRowIndex + currentPageSize);
    return (
      <Grid
        as='section'
        className='min-h-screen-calc gap-y-0 min-w-[1280px] mx-auto auto-rows-min p-8'
      >
        <div className='col-span-full mb-2'>
          <h1 className='font-semibold text-lg'>Members</h1>
        </div>
        <Stack direction='row' className='justify-between col-span-full h-fit'>
          <Stack direction='row' className='items-center'>
            <Searchbar
              name='searchValue'
              className='w-80'
              placeholder='Search'
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
