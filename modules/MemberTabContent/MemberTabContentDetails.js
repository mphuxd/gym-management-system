import React from "react";
import { Stack, TabsContent, TabContentRow, TabContentRowItem } from "@/components";

function processMemberDetails(checkedInMember) {
  const data = checkedInMember;
  const details = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: "-",
    name: `${data.firstName} ${data.lastName}`,
    userId: data.userId,
    status: data.membership.status,
    membershipPlan: data.membership.plan.planName,
    notes: data.notes,
  };
  return details;
}

export default function TabContentMemberDetails({ member, ...props }) {
  member
    ? (member = processMemberDetails(member))
    : (member = {
        id: "-",
        firstName: "-",
        lastName: "-",
        middleName: "-",
        name: "-",
        userId: "-",
        status: "-",
        membershipPlan: "-",
        notes: "-",
      });

  return (
    <TabsContent {...props}>
      <Stack className='gap-y-6'>
        <TabContentRow>
          <TabContentRowItem label='Name' value={member.name} space='half' />
          <TabContentRowItem label='Member Id' value={member.userId} space='half' />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem label='Status' value={member.status} space='half' />
          <TabContentRowItem label='Membership Plan' value={member.membershipPlan} space='half' />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem label='Notes' value={member.notes} />
        </TabContentRow>
      </Stack>
    </TabsContent>
  );
}
