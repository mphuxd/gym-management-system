import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAtom } from "jotai";
import { toastAtom } from "@/atoms";
import { useForm } from "react-hook-form";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  Searchbar,
  Stack,
  Table,
  TableRowCell,
} from "@/components";

export default function CheckInMemberSearch({ mutate }) {
  let { data } = useQuery(GET_ALL_MEMBERS);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Searchbar
        onClick={() => {
          setIsOpen(true);
        }}
        className=''
        intent='primary'
        rounded='false'
        placeholder='Search Members'
      />

      <SearchDialogModal data={data} mutate={mutate} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

function SearchDialogModal({ data, mutate, isOpen, setIsOpen }) {
  const [toast, setToast] = useAtom(toastAtom);
  const [checkInMember] = useMutation(CHECKIN_MEMBER);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const { register, handleSubmit, resetField } = useForm();
  const { onChange } = register("searchValue", {
    onChange: (e) => handleFilterMembers(e, data),
  });

  //Check in via input submission
  function handleSubmitCheckInSearch(e) {
    e.preventDefault();
    e.stopPropagation();
    handleFilterMembers(e, data);
    if (filteredMembers.length === 1) {
      handleCheckInMember(filteredMembers[0]);
    } else {
      //Error if more than one result
      setToast({
        title: "Invalid Input",
        description: e.target[0].value,
        isOpen: true,
      });
    }
  }

  //Check in via search results click
  function handleClickCheckInMember(e, row) {
    e.stopPropagation();
    e.preventDefault();
    handleCheckInMember(row);
  }

  function handleCheckInMember(member) {
    try {
      //Check in then revalidate data
      checkInMember({
        variables: {
          memberId: member.id,
        },
      }).then(() => mutate());
      setToast({
        title: "Checked In Member",
        description: member.userId,
        isOpen: true,
      });
      //reset search
      setIsOpen(false);
      resetField("searchValue");
      setFilteredMembers([]);
    } catch (err) {
      setToast({
        title: "Unknown Error Occurred",
        description: err.message,
        isOpen: true,
      });
    }
  }

  function handleFilterMembers(e, data) {
    const input = e.target[0]?.value.toLowerCase() || e.target.value.toLowerCase();
    const filteredMembers = data.members.filter((member) => {
      //create array of values to filter
      const memberValues = [
        member.firstName,
        member.lastName,
        member.firstName + " " + member.lastName,
        member.userId,
        member.birthday,
        member.contact.email,
        member.contact.phoneNumber,
      ];
      //return members with values that include input

      let count = 0;

      for (let i = 0; i < memberValues.length; i++) {
        if (count >= 9) break; //limit to only 10 results
        if (memberValues[i] && memberValues[i].toLowerCase().includes(input)) {
          count++;
          return member;
        }
      }
    });
    setFilteredMembers(filteredMembers);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        setFilteredMembers([]);
        resetField("searchValue");
      }}
    >
      <DialogContent className='inset-y-1/4 inset-x-1/2 -translate-x-1/2 max-h-96 h-[500px] w-1/2 p-8 space-y-4'>
        <Stack direction='row' className='justify-between items-center'>
          <form onSubmit={(e) => handleSubmit(handleSubmitCheckInSearch(e))}>
            <Searchbar
              onChange={onChange}
              autoFocus={true}
              intent='primary'
              rounded='false'
              name='searchValue'
              placeholder='Search Members'
              {...register("searchValue")}
            />
          </form>
          <DialogClose />
        </Stack>

        <SearchTable
          filteredMembers={filteredMembers}
          handleClickCheckInMember={handleClickCheckInMember}
        />
      </DialogContent>
    </Dialog>
  );
}

function SearchTable({ filteredMembers, handleClickCheckInMember }) {
  return (
    <div className='h-full'>
      <ScrollArea.Root className='overflow-hidden'>
        <ScrollArea.Viewport className='w-full'>
          <Stack className='w-full text-sm'>
            <Table
              headers={[
                "First Name",
                "Last Name",
                "User Id",
                "Birthday",
                "Email",
                "Phone Number",
                "Plan",
                "Status",
              ]}
              rows={filteredMembers}
              onClick={(e, row) => {
                handleClickCheckInMember(e, row);
              }}
              render={(row) => {
                return (
                  <React.Fragment>
                    <TableRowCell>{row.firstName}</TableRowCell>
                    <TableRowCell>{row.lastName}</TableRowCell>
                    <TableRowCell>{row.userId}</TableRowCell>
                    <TableRowCell>{row.birthday}</TableRowCell>
                    <TableRowCell>{row.contact.email}</TableRowCell>
                    <TableRowCell>{row.contact.phoneNumber}</TableRowCell>
                    <TableRowCell>{row.membership.plan.planName}</TableRowCell>
                    <TableRowCell>{row.membership.status}</TableRowCell>
                  </React.Fragment>
                );
              }}
            />
            {/* @@@ Add pagination? */}
          </Stack>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className='flex select-none touch-none w-2 bg-gray-200 opacity-50'
          orientation='vertical'
        >
          <ScrollArea.Thumb data-state='' className='flex-1 relative bg-black' />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
}

const GET_ALL_MEMBERS = gql`
  query {
    members {
      id
      userId
      firstName
      lastName
      gender
      birthday
      notes
      contact {
        id
        streetAddress
        city
        state
        zipcode
        country
        email
        phoneNumber
      }
      membership {
        id
        signUpDate
        membershipEnds
        status
        plan {
          id
          planName
          annualFee
          monthlyFee
          contractLength
        }
      }
      checkIns {
        checkInDate
      }
    }
  }
`;

const CHECKIN_MEMBER = gql`
  mutation ($memberId: String!) {
    createCheckIn(memberId: $memberId) {
      memberId
    }
  }
`;
