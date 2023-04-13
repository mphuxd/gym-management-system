import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAtom } from 'jotai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toastAtom } from '@/atoms';
import { Searchbar } from '@/components';
import { CheckInMemberSearchDialog } from '@/modules';
import useSearchForMember from '@/hooks/useSearchForMember';

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

type FormValues = {
  searchValue?: string;
};

export default function CheckInMemberSearch({ mutate }) {
  const { data } = useQuery(GET_ALL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');

  const [checkInMember] = useMutation(CHECKIN_MEMBER);

  const { register, handleSubmit, reset, getValues } = useForm<FormValues>();
  const [searchMemberResults, handleFilterForMember] = useSearchForMember();

  const [searchWarning, setSearchWarning] = useState<string | boolean>('');
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [, setToast] = useAtom(toastAtom);

  const handleCheckInMember = async (result) => {
    if (result.length === 0) {
      setSearchWarning(true);
      throw new Error('No member found.');
    }
    if (result.length === 1) {
      const member = result[0];
      await checkInMember({ variables: { memberId: member.id } });
      return member;
    }
    if (result.length > 1) {
      throw new Error('Multiple Members found.');
    }
    return true;
  };

  const onSubmit: SubmitHandler<FormValues> = async (formValues, e) => {
    e.preventDefault();
    try {
      const input = getValues('searchValue');
      setSearchQuery(input);
      const results = handleFilterForMember(input, data);
      const member = await handleCheckInMember(results);
      mutate();
      setToast({
        title: 'Checked In Member',
        description: `${member.firstName} ${member.lastName}`,
        isOpen: true,
        intent: 'success',
      });
    } catch (err) {
      setIsOpenDialog(true);
    } finally {
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Searchbar
          intent="primary"
          placeholder="Search Members"
          size="large"
          required
          name="searchValue"
          {...register('searchValue')}
        />
      </form>
      {isOpenDialog && (
        <CheckInMemberSearchDialog
          data={data}
          mutate={mutate}
          isOpen={isOpenDialog}
          setIsOpen={setIsOpenDialog}
          searchQuery={searchQuery}
          searchMemberResults={searchMemberResults}
          handleFilterForMember={handleFilterForMember}
          handleCheckInMember={handleCheckInMember}
          searchWarning={searchWarning}
          setSearchWarning={setSearchWarning}
        />
      )}
    </div>
  );
}
