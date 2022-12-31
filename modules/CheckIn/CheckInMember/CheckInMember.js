import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  CheckInMemberSearch,
  CheckInMemberImage,
  CheckInMemberDropdownMenu,
  MemberTabContentCheckInHistory,
  MemberTabContentContact,
  MemberTabContentDetails,
} from "@/modules";
import { Stack, Status, TabsTrigger } from "@/components";

export default function CheckInMember({ checkInHistory, mutate }) {
  const checkedInMember = checkInHistory.history[checkInHistory.history.length - 1].member;

  return (
    <section className='w-full grid grid-cols-12 min-w-[768px] max-w-[1544px] p-8 mx-auto'>
      <Stack id='dashboard-member-checkin' className='col-span-full gap-y-8'>
        <h1 className='font-medium'>Check In Member</h1>
        {/* Row 1 - Image/Name/Search */}
        <Stack direction='row' as='section' className='justify-between'>
          <Stack direction='row' className='gap-x-3'>
            <CheckInMemberImage checkedInMember={checkedInMember} />
            {checkedInMember && (
              <Stack>
                <Stack direction='row' id='member-name' className='items-center'>
                  <h2 className='text-4xl'>
                    {`${checkedInMember.firstName} ${checkedInMember.lastName}`}
                  </h2>
                  <Status status={checkedInMember.membership.status} />
                </Stack>
                <span id='membership-status'>{checkedInMember.membership.status}</span>
              </Stack>
            )}
          </Stack>
          <CheckInMemberSearch mutate={mutate} />
        </Stack>
        {/* Row 2 - Tabs && Action / TabsContent */}
        <Stack as='section' className='gap-x-4'>
          <div className='w-full'>
            <Tabs.Root defaultValue='details'>
              <Stack direction='row' className='justify-between border-b'>
                <Tabs.List className='' aria-label='checked in member details'>
                  <Stack direction='row' className='gap-x-[2px]'>
                    <TabsTrigger value='details'>Details</TabsTrigger>
                    <TabsTrigger value='contact'>Contact</TabsTrigger>
                    <TabsTrigger value='check-in-history'>Check In History</TabsTrigger>
                    <TabsTrigger value='appointments'>Appointments</TabsTrigger>
                    <TabsTrigger value='membership'>Membership</TabsTrigger>
                  </Stack>
                </Tabs.List>
                {checkedInMember && (
                  <CheckInMemberDropdownMenu checkedInMember={checkedInMember} mutate={mutate} />
                )}
              </Stack>

              <MemberTabContentDetails value='details' member={checkedInMember} />
              <MemberTabContentContact value='contact' member={checkedInMember} />
              <MemberTabContentCheckInHistory value='check-in-history' member={checkedInMember} />
            </Tabs.Root>
          </div>
        </Stack>
      </Stack>
    </section>
  );
}
