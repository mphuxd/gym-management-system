import React, { useRef } from "react";
import { TabContentRow, TabContentRowItem } from "/components";

function processData(queryMemberResult) {
  const data = queryMemberResult;
  const contact = {
    email: data.contact.email,
    phoneNumber: data.contact.phoneNumber,
    streetAddress: data.contact.streetAddress,
    city: data.contact.city,
    state: data.contact.state,
    zipcode: data.contact.zipcode,
    country: data.contact.country,
  };
  return contact;
}

function TabContentForContact({ queryMemberResult }) {
  const contactRef = useRef({
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  if (queryMemberResult) {
    contactRef.current = processData(queryMemberResult);
  }
  const contact = contactRef.current;

  return (
    <div className='flex flex-col gap-y-6'>
      <TabContentRow>
        <TabContentRowItem label='Email' value={contact.email} space='half' />
        <TabContentRowItem label='Phone Number' value={contact.phoneNumber} space='half' />
      </TabContentRow>
      <TabContentRow>
        <TabContentRowItem label='Street Address' value={contact.streetAddress} space='half' />
        <TabContentRowItem label='City' value={contact.city} space='half' />
      </TabContentRow>
      <TabContentRow>
        <TabContentRowItem label='State' value={contact.state} space='half' />
        <TabContentRowItem label='Zip Code' value={contact.zipcode} space='half' />
      </TabContentRow>
      <TabContentRow>
        <TabContentRowItem label='Country' value={contact.country} space='full' />
      </TabContentRow>
    </div>
  );
}

export default TabContentForContact;
