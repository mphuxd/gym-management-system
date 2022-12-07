import React from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery, gql } from "@apollo/client";
import useSWR from "swr";
import fetcher from "/lib/useSWRFetcher";
import * as Tabs from "@radix-ui/react-tabs";
import {
  TabsTrigger,
  TabsContent,
  TabContentRow,
  TabContentRowItem,
  DashboardModuleLabel,
  CheckInHistory,
} from "/components";

const ONE_MEMBER_QUERY = gql`
  query oneMemberQuery($id: String!) {
    member(id: $id) {
      id
      userId
      firstName
      middleName
      lastName
      image
      gender
      birthday
      notes
      membership {
        signUpDate
        signUpLocation
        signedUpBy
        customerId
        stripeSubscriptionId
        membershipEnds
        status
        plan {
          planId
          planName
          annualFee
          monthlyFee
          contractLength
        }
      }
      membershipId
      user {
        role
      }
      contact {
        streetAddress
        city
        state
        zipcode
        country
        email
        phoneNumber
      }
      contactId
      checkIns {
        checkInDate
      }
      updatedAt
    }
  }
`;

export const getServerSideProps = withPageAuthRequired();

function UserId() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(ONE_MEMBER_QUERY, { variables: { id } });
  const { data: subscriptionData, error: subscriptionError } = useSWR(
    data
      ? `/api/member/getStripeSubscription/${data.member.membership.stripeSubscriptionId}`
      : null,
    fetcher
  );

  console.log(subscriptionData);

  if (error) console.log(error);
  if (subscriptionError) console.log(subscriptionError);

  if (data && subscriptionData) {
    const member = data.member;
    return (
      <section className='grid grid-cols-12 min-w-[768px] max-w-[1856px] mx-auto gap-x-16'>
        <div className='col-span-full mb-6'>
          <DashboardModuleLabel label='Member' />
        </div>

        <aside id='sidepanel' className='col-span-3 flex flex-col gap-y-6'>
          <div className='text-3xl mb-6 pb-1  border-b'>
            {member.firstName + " " + member.lastName}
          </div>

          <TabContentRow>
            <TabContentRowItem label='Card Id' value={member.userId} space='full' />
          </TabContentRow>
          <TabContentRow>
            <TabContentRowItem label='Gender' value={member.gender} space='full' />
          </TabContentRow>
          <TabContentRow>
            <TabContentRowItem label='Birthday' value={member.birthday} space='full' />
          </TabContentRow>
          <TabContentRow className>
            <TabContentRowItem
              label='Contact'
              value={
                <div className='flex flex-col'>
                  <span>{member.contact.email}</span>
                  <span>{member.contact.phoneNumber}</span>
                </div>
              }
              space='full'
            />
          </TabContentRow>
          <TabContentRow className='flex flex-col'>
            <TabContentRowItem
              label='Mailing Address'
              value={
                <div className='flex flex-col'>
                  <span>{member.firstName + " " + member.lastName}</span>
                  <span>{member.contact.streetAddress}</span>
                  <span>
                    {member.contact.city +
                      ", " +
                      member.contact.state +
                      " " +
                      member.contact.zipcode}
                  </span>
                </div>
              }
              space='full'
            />
          </TabContentRow>

          <TabContentRow>
            <TabContentRowItem label='Notes' value={member.notes} />
          </TabContentRow>
        </aside>

        <div id='' className='col-span-8 flex flex-col gap-y-6'>
          <Tabs.Root defaultValue='tab1'>
            <Tabs.List className='border-b flex flex-row gap-x-4 ' aria-label='tabs'>
              <TabsTrigger className='py-2' value='tab1'>
                Membership
              </TabsTrigger>
              <TabsTrigger value='tab2'>Check-in History</TabsTrigger>
            </Tabs.List>
            <TabsContent value='tab1' className='pt-8'>
              <div className='mt-4 space-y-6 '>
                <TabContentRow>
                  <TabContentRowItem
                    label='Membership Status'
                    value={member.membership.status}
                    space='third'
                  />

                  <TabContentRowItem
                    label='Sign Up Date'
                    value={new Date(member.membership.signUpDate).toLocaleString()}
                    space='third'
                  />
                  <TabContentRowItem
                    label='Membership Ends'
                    value={new Date(member.membership.membershipEnds).toLocaleString()}
                    space='third'
                  />
                </TabContentRow>
                <TabContentRow>
                  <TabContentRowItem
                    label='Plan Name'
                    value={member.membership.plan.planName}
                    space='third'
                  />
                  <TabContentRowItem
                    label='Next Billing Cycle Date'
                    value={new Date(
                      subscriptionData.subscription.current_period_end * 1000
                    ).toLocaleString()}
                    space='third'
                  />
                  <TabContentRowItem
                    label='Amount'
                    value={subscriptionData.subscription.plan.amount / 100}
                    space='third'
                  />
                </TabContentRow>
                <TabContentRow>
                  <TabContentRowItem
                    label='Contract Length'
                    value={member.membership.plan.contractLength}
                    space='third'
                  />
                  <TabContentRowItem
                    label='Customer Id'
                    value={member.membership.customerId}
                    space='third'
                  />
                  <TabContentRowItem
                    label='Stripe Subscription Id'
                    value={member.membership.stripeSubscriptionId}
                    space='third'
                  />
                </TabContentRow>
              </div>
            </TabsContent>
            <TabsContent className='pt-8' value='tab2'>
              <div className='mt-4'>
                <CheckInHistory history={member.checkIns} />
              </div>
            </TabsContent>
          </Tabs.Root>
        </div>
      </section>
    );
  }
}

export default UserId;
