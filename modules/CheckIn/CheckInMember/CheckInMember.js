import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import {
  CheckInMemberSearch,
  CheckInMemberImage,
  CheckInMemberDropdownMenu,
  CheckInMemberName,
  MemberTabContentCheckInHistory,
  MemberTabContentContact,
  MemberTabContentMembership,
  MemberTabContentOverview,
  MemberTabContentPaymentHistory,
} from '@/modules';
import { Grid, Stack, Status, StatusMessage, TabsTrigger } from '@/components';

export default function CheckInMember({ checkInHistory, mutate }) {
  const checkedInMember =
    checkInHistory.checkins[checkInHistory.checkins.length - 1].member;

  return (
    <Grid
      as="section"
      className="mx-auto h-fit w-full max-w-[theme(width.content)] p-8"
    >
      <Stack id="dashboard-member-checkin" className="col-span-full h-fit">
        <h1>Check In Member</h1>
        {/* Row 1 - Image/Name/Search */}
        <Stack direction="row" as="section" className="mt-6 justify-between">
          <Stack direction="row" className="gap-x-3">
            <CheckInMemberImage checkedInMember={checkedInMember} />
            {checkedInMember && (
              <Stack>
                <Stack
                  direction="row"
                  id="member-name"
                  className="items-center"
                >
                  <CheckInMemberName
                    memberId={checkedInMember.id}
                    memberFirstName={checkedInMember.firstName}
                    memberLastName={checkedInMember.lastName}
                  />
                  {/* Indicates whether member should be allowed access */}
                  <Status status={checkedInMember.membership.status} />
                </Stack>
                <Stack className="mt-3">
                  {/* Indicates whether member has billing issues. */}
                  <StatusMessage
                    subscriptionId={
                      checkedInMember.membership.stripeSubscriptionId
                    }
                  />
                </Stack>
              </Stack>
            )}
          </Stack>
          <CheckInMemberSearch mutate={mutate} />
        </Stack>
        {/* Row 2 - Tabs && Action / TabsContent */}
        <Stack as="section" className="mt-6 gap-x-4">
          <div className="w-full">
            <Tabs.Root defaultValue="overview">
              <Stack
                direction="row"
                className="justify-between border-b border-border-subtle-dark"
              >
                <Tabs.List aria-label="Member details">
                  <Stack direction="row" className="gap-x-[2px]">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="membership">Membership</TabsTrigger>
                    <TabsTrigger value="check-in-history">
                      Check-in History
                    </TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  </Stack>
                </Tabs.List>
                {checkedInMember && (
                  <CheckInMemberDropdownMenu
                    checkedInMember={checkedInMember}
                    mutate={mutate}
                  />
                )}
              </Stack>
              <MemberTabContentOverview
                value="overview"
                member={checkedInMember}
              />
              <MemberTabContentContact
                value="contact"
                member={checkedInMember}
              />
              <MemberTabContentMembership
                value="membership"
                member={checkedInMember}
              />
              <MemberTabContentCheckInHistory
                value="check-in-history"
                member={checkedInMember}
              />
              <MemberTabContentPaymentHistory
                value="payments"
                member={checkedInMember}
              />
            </Tabs.Root>
          </div>
        </Stack>
      </Stack>
    </Grid>
  );
}
