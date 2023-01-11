import React from 'react';
import useSWR from 'swr';
import fetcher from '@/lib/useSWRFetcher';
import { TabsContent, TabContentRow, TabContentRowItem } from '@/components';

function processMemberDetails(member, subscriptionData) {
  const membership = {
    status: member.membership.status,
    signUpDate: new Date(member.membership.signUpDate).toLocaleString(),
    membershipEnds: new Date(member.membership.membershipEnds).toLocaleString(),
    planName: member.membership.plan.planName,
    nextBillingCycle: new Date(
      subscriptionData.subscription.current_period_end * 1000
    ).toLocaleString(),
    billAmount: subscriptionData.subscription.plan.amount / 100,
    contractLength: member.membership.plan.contractLength,
    customerId: member.membership.customerId,
    stripeSubscriptionId: member.membership.stripeSubscriptionId,
  };
  return membership;
}

export default function TabContentMemberDetails({ member, ...props }) {
  const { data: subscriptionData } = useSWR(
    member
      ? `/api/member/getStripeSubscription/${member.membership.stripeSubscriptionId}`
      : null,
    fetcher
  );

  let membership = null;

  if (member && subscriptionData) {
    membership = processMemberDetails(member, subscriptionData);
  } else {
    membership = {
      status: '-',
      signUpDate: '-',
      membershipEnds: '-',
      planName: '-',
      nextBillingCycle: '-',
      billAmount: '-',
      contractLength: '-',
      customerId: '-',
      stripeSubscriptionId: '-',
    };
  }

  return (
    <TabsContent {...props}>
      <div className="space-y-6 ">
        <TabContentRow>
          <TabContentRowItem
            label="Membership Status"
            value={membership.status}
            space="third"
          />
          <TabContentRowItem
            label="Plan Name"
            value={membership.planName}
            space="third"
          />
          <TabContentRowItem
            label="Contract Length"
            value={membership.contractLength}
            space="third"
          />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem
            label="Sign Up Date"
            value={membership.signUpDate}
            space="third"
          />
          <TabContentRowItem
            label="Membership Ends"
            value={membership.membershipEnds}
            space="third"
          />
          <TabContentRowItem
            label="Customer Id"
            value={membership.customerId}
            space="third"
          />
        </TabContentRow>
        <TabContentRow>
          <TabContentRowItem
            label="Next Billing Cycle Date"
            value={membership.nextBillingCycle}
            space="third"
          />
          <TabContentRowItem
            label="Amount"
            value={membership.billAmount}
            space="third"
          />
          <TabContentRowItem
            label="Stripe Subscription Id"
            value={membership.stripeSubscriptionId}
            space="third"
          />
        </TabContentRow>
      </div>
    </TabsContent>
  );
}
