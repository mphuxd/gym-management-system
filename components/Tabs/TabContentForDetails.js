import React, { useRef } from "react";
import { TabContentRow, TabContentRowItem } from "/components";

function processData(queryMemberResult) {
  const data = queryMemberResult;
  const details = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: "-",
    name: data.firstName + " " + data.lastName,
    userId: data.userId,
    status: data.membership.status,
    membershipPlan: data.membership.plan.planName,
    notes: data.notes,
  };
  return details;
}

function TabContentForDetails({ className, queryMemberResult }) {
  let memberRef = useRef({
    id: "",
    firstName: "",
    lastName: "",
    middleName: "-",
    name: "",
    userId: "",
    status: "",
    membershipPlan: "",
    notes: "",
  });

  if (queryMemberResult) {
    memberRef.current = processData(queryMemberResult);
  }

  const member = memberRef.current;

  return (
    <div className='flex flex-col gap-y-6'>
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
    </div>
  );
}

export default TabContentForDetails;
