import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import {
  Table,
  TableRowCell,
  TablePagination,
  TableDropdown,
  Button,
  Searchbar,
} from "/components";

const allMembersQuery = gql`
  query {
    members {
      id
      userId
      firstName
      lastName
      gender
      birthday
      notes
      contact {
        streetAddress
        city
        state
        zipcode
        country
        email
        phoneNumber
      }
      membership {
        signUpDate
        membershipEnds
        status
        plan {
          planName
          annualFee
          monthlyFee
          contractLength
        }
      }
    }
  }
`;

export const getServerSideProps = withPageAuthRequired();

export default function Members() {
  const { register, handleSubmit, resetField } = useForm();
  const { data, loading, error } = useQuery(allMembersQuery);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const router = useRouter();

  const headers = [
    "First Name",
    "Last Name",
    "User Id",
    "Birthday",
    "Email",
    "Phone Number",
    "Membership Plan",
    "Status",
    "",
  ];

  //create a link to edit their subscription details in the members tab using customer id

  if (loading) return <div>spinner</div>;
  if (error) return <div>{error}</div>;
  if (data) {
    const allRows = getRows(data);
    const rows = allRows.slice(firstRowIndex, firstRowIndex + currentPageSize);
    return (
      <section className='grid grid-cols-12 h-screen gap-y-0 min-w-[768px] max-w-screen-[1839px] mx-auto auto-rows-min'>
        <div className='flex flex-row justify-between col-span-full h-fit mb-2'>
          <h1 className='font-semibold text-lg'>Members</h1>
          <div className='flex flex-row gap-x-2'>
            <Link href='/signup'>Sign up Member</Link>
            <Link href='/create-new'>Create Member</Link>
          </div>
        </div>
        <div className='flex flex-row justify-between col-span-full h-fit'>
          <div className='flex flex-row items-center'>
            <Searchbar name='searchValue' placeholder='Search' {...register("searchValue")} />
          </div>
          <div className='flex flex-row gap-x-2'>
            <button>
              <Button className='text-gray-600' as='div' size='small' variant='default'>
                Filter
              </Button>
            </button>
            {/* 
            TO:DO: Add Filter
            <button>
                <Button as='div' size='small' variant='default'>
                  Reset Filter
                </Button>
              </button> */}
          </div>
        </div>
        <div className='col-span-full h-fit mt-4'>
          <Table
            headers={headers}
            rows={rows}
            href='`members/details/${row.id}`'
            onClick={(e, row) => {
              e.stopPropagation();
              e.preventDefault();
              router.push(`members/details/${row.id}`);
            }}
            render={(row) => {
              return (
                <>
                  {Object.values(row).map((cell, idx) => {
                    if (idx !== 0) {
                      return <TableRowCell key={idx}>{cell}</TableRowCell>;
                    }
                  })}
                  <TableRowCell>
                    <TableDropdown row={row} />
                  </TableRowCell>
                </>
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
      </section>
    );
  }
}

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
  }));
}
