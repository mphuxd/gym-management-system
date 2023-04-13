import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toastAtom } from '@/atoms';
import {
  Dialog,
  DialogClose,
  DialogContent,
  Searchbar,
  Stack,
} from '@/components';
import { CheckInMemberSearchDialogTable } from '@/modules';

interface FormValues {
  searchValue?: string;
}

export default function CheckInMemberSearchDialog({
  data,
  mutate,
  isOpen,
  setIsOpen,
  searchQuery,
  searchMemberResults,
  handleFilterForMember,
  handleCheckInMember,
  searchWarning,
  setSearchWarning,
}) {
  const [filteredMembers, setFilteredMembers] = useState(searchMemberResults);
  const { register, handleSubmit, resetField, getValues } = useForm({
    defaultValues: {
      searchValue: searchQuery,
    },
  });
  const [, setToast] = useAtom(toastAtom);

  const { onChange } = register('searchValue', {
    onChange: () => {
      setSearchWarning('');
      const searchValue = getValues('searchValue');
      const result = handleFilterForMember(searchValue, data);
      setFilteredMembers(result);
      setSearchWarning(result.length === 0);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData, e) => {
    try {
      e.preventDefault();
      const results = handleFilterForMember(getValues('searchValue'), data);
      const member = await handleCheckInMember(results);
      mutate();
      setToast({
        title: 'Checked In Member',
        description: `${member.firstName} ${member.lastName}`,
        isOpen: true,
        intent: 'success',
      });
      setIsOpen(false);
      resetField('searchValue');
      setFilteredMembers([]);
    } catch (err) {
      setToast({
        title: 'Error Occurred',
        description: err.message,
        isOpen: true,
        intent: 'error',
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        setFilteredMembers([]);
        setSearchWarning(false);
        resetField('searchValue');
      }}
    >
      <DialogContent
        tabIndex={-1}
        rounded={false}
        className="inset-0 m-auto h-fit w-fit bg-white p-8"
      >
        <Stack direction="row" className="items-center justify-between">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Searchbar
              onChange={onChange}
              autoFocus
              size="large"
              intent="secondary"
              name="searchValue"
              placeholder="Search Members"
              required
              {...register('searchValue')}
            />
          </form>
          <DialogClose />
        </Stack>
        <CheckInMemberSearchDialogTable
          mutate={mutate}
          setIsOpen={setIsOpen}
          searchWarning={searchWarning}
          filteredMembers={filteredMembers}
        />
      </DialogContent>
    </Dialog>
  );
}
