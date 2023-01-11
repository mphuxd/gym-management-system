import React from 'react';
import {
  Stack,
  TabsContent,
  TabContentRow,
  TabContentRowItem,
} from '@/components';

function processMemberOverview(checkedInMember) {
  const data = checkedInMember;
  const overview = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: '-',
    name: `${data.firstName} ${data.lastName}`,
    userId: data.userId,
    status: data.membership.status,
    membershipPlan: data.membership.plan.planName,
    notes: data.notes,
  };
  return overview;
}

export default function TabContentMemberOverview({ member, ...props }) {
  let overview = {
    id: '-',
    firstName: '-',
    lastName: '-',
    middleName: '-',
    name: '-',
    userId: '-',
    status: '-',
    membershipPlan: '-',
    notes: '-',
  };

  if (member) overview = processMemberOverview(member);

  return (
    <TabsContent {...props}>
      <Stack className="gap-y-6">
        <TabContentRow>
          <TabContentRowItem label="Name" value={overview.name} space="half" />
          <TabContentRowItem
            label="Member Id"
            value={overview.userId}
            space="half"
          />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem
            label="Status"
            value={overview.status}
            space="half"
          />
          <TabContentRowItem
            label="Membership Plan"
            value={overview.membershipPlan}
            space="half"
          />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem label="Notes" value={overview.notes} />
        </TabContentRow>
      </Stack>
    </TabsContent>
  );
}
