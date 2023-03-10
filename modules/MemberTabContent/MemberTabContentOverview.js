import React from 'react';
import {
  Stack,
  TabsContent,
  TabContentRow,
  TabContentRowItem,
} from '@/components';

function getMemberOverview(member) {
  const defaultValues = {
    id: '-',
    name: '-',
    userId: '-',
    status: '-',
    membershipPlan: '-',
    notes: '-',
  };

  if (!member) return defaultValues;

  return {
    id: member.id,
    name: `${member.firstName} ${member.lastName}`,
    userId: member.userId || defaultValues.userId,
    status: member.membership.status,
    membershipPlan: member.membership.plan.planName,
    notes: member.notes || defaultValues.notes,
  };
}

export default function TabContentMemberOverview({ member, ...props }) {
  const overview = getMemberOverview(member);

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
