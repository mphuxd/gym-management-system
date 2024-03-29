import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { toastAtom } from 'atoms';
import { useAtom } from 'jotai';
import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import { TrashCan } from '@carbon/icons-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import fetcher from '@/lib/useSWRFetcher';
import {
  Button,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
  Grid,
  TabsTrigger,
  TabContentRow,
  TabContentRowItem,
  Screen,
  Sidepanel,
  Stack,
  StatusMessage,
} from '@/components';
import {
  CheckInMemberImage,
  DialogEditMemberForm,
  DialogMembershipCancel,
  DialogMemberDelete,
  MemberTabContentMembership,
  MemberTabContentCheckInHistory,
  MemberTabContentPaymentHistory,
} from '@/modules';

export const getServerSideProps = withPageAuthRequired();

export default function UserId() {
  const router = useRouter();
  const { id } = router.query;
  // eslint-disable-next-line prefer-const
  let { data, mutate } = useSWR(`/api/member/getMember/${id}`, fetcher);

  if (data) {
    const member = data?.member;
    return (
      <Screen as="section">
        <Stack direction="row" className="mx-auto max-w-[1920px]">
          <Sidepanel id="sidepanel" className="flex flex-col gap-y-6 border-r">
            <Stack className="gap-x-4">
              <h1 className="mb-3 pb-1 text-3xl font-medium">
                {`${member.firstName}  ${member.lastName}`}
              </h1>
              <CheckInMemberImage checkedInMember={member} />
            </Stack>
            <StatusMessage
              size="sm"
              subscriptionId={member.membership.stripeSubscriptionId}
            />
            <TabContentRow>
              <TabContentRowItem
                label="Card Id"
                value={member.userId}
                space="full"
              />
            </TabContentRow>
            <TabContentRow>
              <TabContentRowItem
                label="Contact"
                value={
                  <Stack>
                    <span>{member.contact.email}</span>
                    <span>{member.contact.phoneNumber}</span>
                  </Stack>
                }
                space="full"
              />
            </TabContentRow>
            <TabContentRow className="flex flex-col">
              <TabContentRowItem
                label="Mailing Address"
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
                space="full"
              />
            </TabContentRow>
            <TabContentRow>
              <TabContentRowItem
                label="Birthday"
                value={member.birthday}
                space="full"
              />
            </TabContentRow>
            <TabContentRow>
              <TabContentRowItem label="Notes" value={member.notes} />
            </TabContentRow>
          </Sidepanel>
          <Grid
            as="section"
            className="mx-auto w-full max-w-[1544px] auto-rows-min gap-y-8 p-8 "
          >
            <Tabs.Root className="col-span-full" defaultValue="membership">
              <Tabs.List
                className="flex w-full flex-row justify-between gap-x-[2px] border-b border-border-subtle-dark"
                aria-label="Member details"
              >
                <Stack direction="row" className="gap-x-[2px]">
                  <TabsTrigger value="membership">Membership</TabsTrigger>
                  <TabsTrigger value="history">Check-in History</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </Stack>
                <MemberDropdownMenu member={member} mutate={mutate} />
              </Tabs.List>
              <MemberTabContentMembership value="membership" member={member} />
              <MemberTabContentCheckInHistory value="history" member={member} />
              <MemberTabContentPaymentHistory
                value="payments"
                member={member}
              />
            </Tabs.Root>
          </Grid>
        </Stack>
      </Screen>
    );
  }
}

function MemberDropdownMenu({ member, mutate }) {
  const router = useRouter();
  const [, setToast] = useAtom(toastAtom);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownTrigger asChild className="block overflow-hidden">
          <Button
            className="my-auto flex flex-row items-center justify-between"
            as="button"
            size="large"
            length="medium"
            intent="tertiary"
          >
            <span>Actions</span>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownContent className="shadow-xl" align="end">
          <DropdownMenu.Group>
            <DropdownItem asChild>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await fetch(`/api/checkin/${member.id}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }).then(() =>
                      setToast({
                        title: 'Checked In Member',
                        description: member.id,
                        isOpen: true,
                        intent: 'success',
                      })
                    );
                    await router.push('/checkin');
                  } catch (err) {
                    setToast({
                      title: 'Edit Failed',
                      description: err.message,
                      isOpen: true,
                      intent: 'error',
                    });
                  }
                }}
              >
                Check In Member
              </button>
            </DropdownItem>
            <DropdownItem asChild>
              <button
                type="button"
                className="hover:cursor-not-allowed"
                disabled
              >
                Schedule appointment
              </button>
            </DropdownItem>
          </DropdownMenu.Group>
          <DropdownMenu.Group>
            <DropdownItem asChild>
              <button
                type="button"
                onClick={() => {
                  setIsEditDialogOpen(true);
                }}
              >
                Edit Member Information
              </button>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem asChild>
              <button
                type="button"
                className="flex items-center gap-x-1 text-error"
                onClick={() => {
                  setIsCancelDialogOpen(true);
                }}
              >
                <Cross2Icon />
                Cancel Membership
              </button>
            </DropdownItem>
            <DropdownItem asChild>
              <button
                type="button"
                className="flex items-center gap-x-1 text-error"
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
      <DialogEditMemberForm
        member={member}
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        mutate={mutate}
      />
      <DialogMemberDelete
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        memberId={member.id}
      />
      <DialogMembershipCancel
        isOpen={isCancelDialogOpen}
        setIsOpen={setIsCancelDialogOpen}
        memberId={member.id}
      />
    </>
  );
}
