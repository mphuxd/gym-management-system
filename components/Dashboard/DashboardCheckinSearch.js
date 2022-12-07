import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toastAtom } from "../../atoms";
import { useAtom } from "jotai";
import { Searchbar } from "/components";

function DashboardCheckinSearch({ setCheckedInMemberDispatcher }) {
  let { data, loading, error, refetch } = useQuery(GET_ALL_MEMBERS);
  const [checkInMember] = useMutation(CHECKIN_MEMBER);
  const [createCheckInMemberHistory] = useMutation(CREATE_CHECKIN_MEMBER_HISTORY);

  const { register, handleSubmit, resetField } = useForm();
  const [toast, setToast] = useAtom(toastAtom);

  function onCheckInSearchSubmit(submitData) {
    const filteredMembers = validateInputAndFilterMembers(data, submitData);
    if (filteredMembers) {
      try {
        checkInMember({
          variables: {
            memberId: filteredMembers[0].id,
          },
        });
        createCheckInMemberHistory({
          variables: {
            userId: "clb0baeu10000uv98r8t2hb99",
            description: "Checked In Member",
          },
        });
        setCheckedInMemberDispatcher({ type: "checkInMember", member: filteredMembers[0] });
        setToast({
          title: "Checked In Member",
          description: submitData.searchValue,
          isOpen: true,
        });
      } catch (err) {
        setToast({
          title: "Member not found",
          description: err.message,
          isOpen: true,
        });
      }
    } else {
      setToast({
        title: "Invalid Input",
        description: submitData.searchValue,
        isOpen: true,
      });
    }
    resetField("searchValue");
  }

  return (
    <form onSubmit={handleSubmit(onCheckInSearchSubmit)}>
      <Searchbar name='searchValue' placeholder='Search' {...register("searchValue")} />
    </form>
  );
}

export default DashboardCheckinSearch;

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
        streetAddress
        city
        state
        zipcode
        country
        email
        phoneNumber
      }
      membership {
        signUpDate
        membershipEnds
        status
        plan {
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

const CREATE_CHECKIN_MEMBER_HISTORY = gql`
  mutation ($userId: String!, $description: String!) {
    createHistory(userId: $userId, description: $description) {
      userId
      description
    }
  }
`;

function validateInputAndFilterMembers(data, submitData) {
  let members = null;

  // userId, phoneNumber, or birthday
  const numericInput = submitData.searchValue.replace(/\D/g, "");

  //userId is numeric and fits expected userId length
  if (numericInput.length === 12) {
    members = data.members.filter((member) => {
      if (member.userId) {
        return member.userId === numericInput;
      }
    });
  }

  //birthday is numeric and fits expected birthday length
  if (numericInput.length === 8) {
    members = data.members.filter((member) => {
      if (member.birthday) {
        return member.birthday.replace(/\D/g, "") === numericInput;
      }
    });
  }

  //phone number is numeric and fits expected phoneNumber length
  if (numericInput.length === 11) {
    members = data.members.filter((member) => {
      return member.contact.phoneNumber.replace(/\D/g, "") === numericInput;
    });
  }

  return members;
}
