import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { toastAtom } from '@/atoms';
import {
  Dialog,
  DialogClose,
  DialogContent,
  Searchbar,
  Stack,
} from '@/components';
import { CheckInMemberSearchDialogTable } from '@/modules';

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
  // eslint-disable-next-line no-unused-vars
  const [toast, setToast] = useAtom(toastAtom);
  const [filteredMembers, setFilteredMembers] = useState(searchMemberResults);
  const { register, handleSubmit, resetField, getValues } = useForm({
    defaultValues: {
      searchValue: searchQuery,
    },
  });

  const { onChange } = register('searchValue', {
    onChange: () => {
      setSearchWarning('');
      const searchValue = getValues('searchValue');
      const result = handleFilterForMember(searchValue, data);
      setFilteredMembers(result);
      setSearchWarning(result.length === 0);
    },
  });

  async function onSubmit(e) {
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
  }

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
        rounded={false}
        className="inset-y-1/4 inset-x-1/2 -translate-x-1/2 h-[480] w-1/2 p-8"
      >
        <Stack direction="row" className="justify-between items-center">
          <form onSubmit={(e) => handleSubmit(onSubmit(e))}>
            <Searchbar
              onChange={onChange}
              size="large"
              autoFocus
              intent="neutral"
              rounded="false"
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
