import React from 'react';
import {
  Stack,
  TabsContent,
  TabContentRow,
  TabContentRowItem,
} from '@/components';

function getMemberContactData(member) {
  const defaultValues = {
    email: '-',
    phoneNumber: '-',
    streetAddress: '-',
    city: '-',
    state: '-',
    zipcode: '-',
    country: '-',
  };

  if (!member) return defaultValues;

  return {
    email: member.contact.email,
    phoneNumber: member.contact.phoneNumber,
    streetAddress: member.contact.streetAddress,
    city: member.contact.city,
    state: member.contact.state,
    zipcode: member.contact.zipcode,
    country: member.contact.country,
  };
}

export default function TabContentMemberContact({ member, ...props }) {
  const contact = getMemberContactData(member);

  return (
    <TabsContent {...props}>
      <Stack className="gap-y-6">
        <TabContentRow>
          <TabContentRowItem label="Email" value={contact.email} space="half" />
          <TabContentRowItem
            label="Phone Number"
            value={contact.phoneNumber}
            space="half"
          />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem
            label="Street Address"
            value={contact.streetAddress}
            space="half"
          />
          <TabContentRowItem label="City" value={contact.city} space="half" />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem label="State" value={contact.state} space="half" />
          <TabContentRowItem
            label="Zip Code"
            value={contact.zipcode}
            space="half"
          />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem
            label="Country"
            value={contact.country}
            space="full"
          />
        </TabContentRow>
      </Stack>
    </TabsContent>
  );
}
