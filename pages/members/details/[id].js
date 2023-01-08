import React, { useState } from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import fetcher from "/lib/useSWRFetcher";
import { toastAtom } from "atoms";
import { useAtom } from "jotai";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import { TrashCan } from "@carbon/icons-react";
import * as Tabs from "@radix-ui/react-tabs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  Button,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
  Grid,
  TabsTrigger,
  TabsContent,
  TabContentRow,
  TabContentRowItem,
  Screen,
  Sidepanel,
  Stack,
} from "@/components";
import {
  CheckInMemberImage,
  EditMemberDialogForm,
  MemberTabContentCheckInHistory,
} from "@/modules";

export const getServerSideProps = withPageAuthRequired();

export default function UserId() {
  const router = useRouter();
  const { id } = router.query;

  let { data: member, mutate } = useSWR(`/api/member/getMember/${id}`, fetcher);
  const { data: subscriptionData } = useSWR(
    member
      ? `/api/member/getStripeSubscription/${member.member.membership.stripeSubscriptionId}`
      : null,
    fetcher
  );

  if (member && subscriptionData) {
    member = member.member;
    return (
      <Screen as='section'>
        <Stack direction='row'>
          <Sidepanel id='sidepanel' className='flex flex-col gap-y-6 border-r'>
            <Stack className='mb-3 gap-x-4'>
              <h1 className='text-3xl pb-1 mb-3 font-medium'>
                {`${member.firstName}  ${member.lastName}`}
              </h1>
              <CheckInMemberImage checkedInMember={member}></CheckInMemberImage>
            </Stack>
            <TabContentRow>
              <TabContentRowItem label='Card Id' value={member.userId} space='full' />
            </TabContentRow>
            <TabContentRow className>
              <TabContentRowItem
                label='Contact'
                value={
                  <Stack>
                    <span>{member.contact.email}</span>
                    <span>{member.contact.phoneNumber}</span>
                  </Stack>
                }
                space='full'
              />
            </TabContentRow>
            <TabContentRow className='flex flex-col'>
              <TabContentRowItem
                label='Mailing Address'
                value={
                  <Stack>
                    <span>{`${member.firstName} ${member.lastName}`}</span>
                    <span>{member.contact.streetAddress}</span>
                    <span>
                      {`${member.contact.city},
                        ${member.contact.state},
                        ${member.contact.zipcode}`}
                    </span>
                  </Stack>
                }
                space='full'
              />
            </TabContentRow>
            <TabContentRow>
              <TabContentRowItem label='Birthday' value={member.birthday} space='full' />
            </TabContentRow>
            <TabContentRow>
              <TabContentRowItem label='Notes' value={member.notes} />
            </TabContentRow>
          </Sidepanel>
          <Grid as='section' className='w-full gap-y-8 max-w-[1544px] p-8 mx-auto'>
            <Tabs.Root className='col-span-full' defaultValue='tab1'>
              <Tabs.List
                className='w-full justify-between border-b flex flex-row gap-x-[2px]'
                aria-label='tabs'
              >
                <div>
                  <TabsTrigger className='py-2' value='tab1'>
                    Membership
                  </TabsTrigger>
                  <TabsTrigger value='tab2'>Check-in History</TabsTrigger>
                  <TabsTrigger value='tab3'>Payments</TabsTrigger>
                  <TabsTrigger value='tab4'>Schedule</TabsTrigger>
                  <TabsTrigger value='tab5'>Overview</TabsTrigger>
                </div>
                <div className='my-auto'>
                  <MemberDropdownMenu member={member} mutate={mutate}></MemberDropdownMenu>
                </div>
              </Tabs.List>
              <TabsContent value='tab1'>
                <div className='space-y-6 '>
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
              <MemberTabContentCheckInHistory value='tab2' member={member} />
            </Tabs.Root>
          </Grid>
        </Stack>
      </Screen>
    );
  }
}

function MemberDropdownMenu({ member, mutate }) {
  const router = useRouter();
  const [toast, setToast] = useAtom(toastAtom);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <DropdownMenu.Root>
        <DropdownTrigger asChild className='overflow-hidden block'>
          <Button
            className='my-auto flex flex-row justify-center items-center'
            as='div'
            size='base'
            intent='tertiary'
          >
            <span>Actions</span>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownContent className='shadow-xl' align='end'>
          <DropdownMenu.Group>
            <DropdownItem>
              <button
                onClick={async () => {
                  try {
                    await fetch(`/api/checkin/${member.id}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }).then(
                      (res) =>
                        setToast({
                          title: "Checked In Member",
                          description: member.id,
                          isOpen: true,
                        }),
                      router.push("/checkin")
                    );
                  } catch (err) {
                    setToast({
                      title: "Edit Failed",
                      description: err.message,
                      isOpen: true,
                    });
                  }
                }}
              >
                Check In Member
              </button>
            </DropdownItem>
            <DropdownItem>
              <button className='hover:cursor-not-allowed' disabled>
                Schedule appointment
              </button>
            </DropdownItem>
          </DropdownMenu.Group>
          <DropdownMenu.Group>
            <DropdownItem>
              <button
                onClick={() => {
                  setIsEditDialogOpen(true);
                }}
              >
                Edit Member Information
              </button>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem>
              <button
                className='text-red-600 font-semibold flex items-center gap-x-1'
                onClick={() => {
                  setIsCancelDialogOpen(true);
                }}
              >
                <Cross2Icon />
                Cancel Membership
              </button>
            </DropdownItem>
            <DropdownItem>
              <button
                className='text-red-600 font-semibold flex items-center gap-x-1'
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                }}
              >
                <TrashCan />
                Delete Member
              </button>
            </DropdownItem>
          </DropdownMenu.Group>
          <DropdownMenu.Arrow />
        </DropdownContent>
      </DropdownMenu.Root>
      <EditMemberDialogForm
        member={member}
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        mutate={mutate}
      />
      <AlertDialog
        isOpen={isCancelDialogOpen}
        setIsOpen={setIsCancelDialogOpen}
        title='Cancel Membership?'
        description='This action cannot be undone. This will permanently cancel the membership. The member will have access until the end of their billing cycle, and will be charged applicable cancellation fees.'
        close='No, go back.'
        action='Yes, cancel membership.'
        href={`api/member/cancel/${member.userId}`}
      />
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        title='Delete Member?'
        description='This action cannot be undone. This will permanently delete the member and remove their data from our servers. If the member has an active membership, this action will fail.'
        close='No, go back.'
        action='Yes, delete member.'
        href={`api/member/delete/${member.userId}`}
      />
    </React.Fragment>
  );
}
