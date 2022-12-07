import React from "react";
import { gql, useQuery } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  DashboardCheckin,
  DashboardHistory,
  DashboardNotes,
  Breadcrumbs,
  BreadcrumbsChain,
} from "/components";

const GET_LAST_CHECKIN_MEMBER = gql`
  query GetLastCheckinMember {
    lastCheckInMember {
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
      checkIns {
        checkInDate
      }
    }
  }
`;

export const getServerSideProps = withPageAuthRequired();

export default function Home() {
  let { data } = useQuery(GET_LAST_CHECKIN_MEMBER);
  return (
    <div className='grid grid-cols-12 2xl:grid-rows-2 gap-y-8  min-w-[768px] max-w-[1839px] mx-auto'>
      <div id='row-1' className='col-span-12 flex flex-col 2xl:flex-row gap-x-12 2xl:max-h-[400px] '>
        {data && (
          <DashboardCheckin
            className='basis-full 2xl:basis-2/3'
            lastCheckedInMember={data.lastCheckInMember}
          />
        )}
        <DashboardHistory />
      </div>
      <div id='row-2' className='col-span-12 flex flex-col 2xl:flex-row gap-x-8'>
        <div className='basis-full 2xl:basis-2/3'>Misc</div>
        <DashboardNotes />
      </div>
    </div>
  );
}
