import React, { useReducer, useState } from "react";
import Link from "next/link";
import cx from "classnames";
import * as Tabs from "@radix-ui/react-tabs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { CaretDownIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  DashboardCheckinSearch,
  DashboardCheckinImage,
  DashboardModuleLabel,
  DashboardCheckinEditDetailsForm,
  DropdownItem,
  DropdownContent,
  DropdownSeparator,
  DropdownTrigger,
  TabsTrigger,
  TabsContent,
  TabContentRow,
  TabContentRowItem,
  TabContentForDetails,
  TabContentForContact,
} from "/components";

function reducer(state, action) {
  switch (action.type) {
    case "editMember": {
      return action.member;
    }
    case "checkInMember": {
      return action.member;
    }
  }
  throw Error("Unknown action: " + action.type);
}

function DashboardCheckin({ lastCheckedInMember, className }) {
  const [checkedInMember, setCheckedInMemberDispatcher] = useReducer(reducer, lastCheckedInMember);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const CHECK_IN_HISTORY_RECENT = Array.from(checkedInMember.checkIns).reverse();

  const classNames = cx(className, "");

  return (
    <div id='dashboard-member-checkin' className={classNames}>
      <div className='flex flex-row justify-between mb-4'>
        <DashboardModuleLabel label='Member Check In' />
        <DashboardCheckinSearch setCheckedInMemberDispatcher={setCheckedInMemberDispatcher} />
      </div>
      <div className='flex flex-row gap-x-4'>
        {checkedInMember ? <DashboardCheckinImage checkedInMember={checkedInMember} /> : null}
        <div className='w-full'>
          <Tabs.Root defaultValue='details'>
            <Tabs.List
              className='flex flex-row justify-between border-b'
              aria-label='checked in member details'
            >
              <div className='flex flex-row gap-x-4'>
                <TabsTrigger value='details'>Details</TabsTrigger>
                <TabsTrigger value='contact'>Contact</TabsTrigger>
                <TabsTrigger value='check-in-history'>Check-in History</TabsTrigger>
              </div>
              <DropdownMenu.Root>
                <DropdownTrigger className='overflow-hidden block'>
                  <Button
                    className='text-gray-600 my-auto flex flex-row justify-center items-center focus:outline-none'
                    as='div'
                    size='small'
                    variant='default'
                  >
                    <span>Actions</span>
                    {<CaretDownIcon />}
                  </Button>
                </DropdownTrigger>
                <DropdownContent align='end'>
                  <DropdownMenu.Group>
                    <DropdownItem>
                      <Link href={`members/details/${checkedInMember.id}`}>
                        View Member Details
                      </Link>
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
                        onClick={() => {
                          setIsCancelDialogOpen(true);
                        }}
                      >
                        Cancel Membership
                      </button>
                    </DropdownItem>
                    <DropdownItem>
                      <button
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        Delete Member
                      </button>
                    </DropdownItem>
                  </DropdownMenu.Group>
                  <DropdownMenu.Arrow />
                </DropdownContent>
              </DropdownMenu.Root>
            </Tabs.List>
            <TabsContent value='details'>
              <div className='mt-2'>
                {checkedInMember ? (
                  <TabContentForDetails queryMemberResult={checkedInMember} />
                ) : null}
              </div>
            </TabsContent>
            <TabsContent value='contact'>
              <div className='mt-2'>
                {checkedInMember ? (
                  <TabContentForContact queryMemberResult={checkedInMember} />
                ) : null}
              </div>
            </TabsContent>
            <TabsContent value='check-in-history'>
              {checkedInMember ? (
                <div className='flex flex-col mt-2'>
                  <TabContentRow>
                    <TabContentRowItem
                      label='Check-ins'
                      space='full'
                      value={
                        <div className='flex flex-col'>
                          {CHECK_IN_HISTORY_RECENT.map((checkIn, idx) => {
                            return (
                              idx <= 9 && (
                                <span key={idx}>
                                  {new Date(checkIn.checkInDate).toLocaleString()}
                                </span>
                              )
                            );
                          })}
                        </div>
                      }
                    />
                  </TabContentRow>
                </div>
              ) : null}
            </TabsContent>
          </Tabs.Root>
        </div>
      </div>
      <div>
        <AlertDialog
          isOpen={isCancelDialogOpen}
          setIsOpen={setIsCancelDialogOpen}
          title='Cancel Membership?'
          description='This action cannot be undone. This will permanently cancel the membership. The member will have access until the end of their billing cycle, and will be charged applicable cancellation fees.'
          close='No, go back.'
          action='Yes, cancel membership.'
          href={`api/member/cancel/${checkedInMember.userId}`}
        />
        <AlertDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={setIsDeleteDialogOpen}
          title='Delete Member?'
          description='This action cannot be undone. This will permanently delete the member and remove their data from our servers. If the member has an active membership, this action will fail.'
          close='No, go back.'
          action='Yes, delete member.'
          href={`api/member/delete/${checkedInMember.userId}`}
        />
        <Dialog.Root open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className='fixed bg-black opacity-30 inset-0' />
            <Dialog.Content className='absolute inset-1/2 -translate-x-1/2  -translate-y-3/4 h-fit w-fit bg-white'>
              <DashboardCheckinEditDetailsForm
                setOpen={setIsEditDialogOpen}
                member={checkedInMember}
                setCheckedInMemberDispatcher={setCheckedInMemberDispatcher}
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}

export default DashboardCheckin;
