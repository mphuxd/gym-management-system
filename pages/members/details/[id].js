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
  AlertDialog,
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
  EditMemberDialogForm,
  MemberTabContentMembership,
  MemberTabContentCheckInHistory,
} from '@/modules';

export const getServerSideProps = withPageAuthRequired();

export default function UserId() {
  const router = useRouter();
  const { id } = router.query;

  // eslint-disable-next-line prefer-const
  let { data: member, mutate } = useSWR(`/api/member/getMember/${id}`, fetcher);

  if (member) {
    member = member.member;
    return (
      <Screen as="section">
        <Stack direction="row">
          <Sidepanel id="sidepanel" className="flex flex-col gap-y-6 border-r">
            <Stack className="gap-x-4">
              <h1 className="text-3xl pb-1 mb-3 font-medium">
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
            className="w-full gap-y-8 max-w-[1544px] p-8 mx-auto auto-rows-min "
          >
            <Tabs.Root className="col-span-full" defaultValue="membership">
              <Tabs.List
                className="w-full justify-between border-b flex flex-row gap-x-[2px]"
                aria-label="tabs"
              >
                <div>
                  <TabsTrigger value="membership">Membership</TabsTrigger>
                  <TabsTrigger value="history">Check-in History</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </div>

                <MemberDropdownMenu member={member} mutate={mutate} />
              </Tabs.List>
              <MemberTabContentMembership value="membership" member={member} />
              <MemberTabContentCheckInHistory value="history" member={member} />
            </Tabs.Root>
          </Grid>
        </Stack>
      </Screen>
    );
  }
}

function MemberDropdownMenu({ member, mutate }) {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [toast, setToast] = useAtom(toastAtom);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownTrigger asChild className="overflow-hidden block">
          <Button
            className="my-auto flex flex-row justify-center items-center"
            as="div"
            size="large"
            intent="tertiary"
            rounded="false"
          >
            <span>Actions</span>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownContent className="shadow-xl" align="end">
          <DropdownMenu.Group>
            <DropdownItem>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await fetch(`/api/checkin/${member.id}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }).then(
                      () =>
                        setToast({
                          title: 'Checked In Member',
                          description: member.id,
                          isOpen: true,
                          intent: 'success',
                        }),
                      router.push('/checkin')
                    );
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
            <DropdownItem>
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
            <DropdownItem>
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
            <DropdownItem>
              <button
                type="button"
                className="text-red-600 flex items-center gap-x-1"
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
                type="button"
                className="text-red-600 flex items-center gap-x-1"
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
        intent="constrained"
        actionPhrase="cancel membership"
        title="Cancel Membership?"
        description="This action cannot be undone. This will permanently cancel the membership. The member will have access until the end of their billing cycle, and will be charged applicable cancellation fees."
        close="No, go back."
        action="Yes, cancel membership."
        href={`api/member/cancel/${member.userId}`}
      />
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        intent="constrained"
        actionPhrase="delete member"
        title="Delete Member?"
        description="This action cannot be undone. This will permanently delete the member and remove their data from our servers. If the member has an active membership, this action will fail."
        close="No, go back."
        action="Yes, delete member."
        href={`api/member/delete/${member.userId}`}
      />
    </>
  );
}
