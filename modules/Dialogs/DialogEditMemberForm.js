import React from 'react';
import { useAtom } from 'jotai';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { toastAtom } from '@/atoms';
import {
  Button,
  FormField,
  FormSelect,
  FormSelectItem,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  Stack,
} from '@/components';
import STATES from '@/lib/states';

const schema = yup
  .object({
    firstName: yup.string().required().trim(),
    lastName: yup.string().required().trim(),
    userId: yup.string().matches('^[0-9]*$').length(12).required().trim(),
    notes: yup.string().trim(),
    email: yup.string().email().trim(),
    phoneNumber: yup.string().trim(),
    streetAddress: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().length(2).trim(),
    zipcode: yup.string().length(5).trim(),
  })
  .required();

export default function DialogEditMemberForm({
  member,
  open,
  setOpen,
  mutate,
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      state: member.contact.state,
    },
  });
  // eslint-disable-next-line no-unused-vars
  const [toast, setToast] = useAtom(toastAtom);

  function onSubmit(submitData) {
    try {
      fetch('/api/member/editMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: member.id,
          firstName: submitData.firstName,
          lastName: submitData.lastName,
          userId: submitData.userId,
          notes: submitData.notes,
          email: submitData.email,
          phoneNumber: submitData.phoneNumber,
          streetAddress: submitData.streetAddress,
          city: submitData.city,
          state: submitData.state,
          zipcode: submitData.zipcode,
        }),
      }).then(() => mutate());
      setToast({
        title: 'Successful Edit',
        description: member.id,
        isOpen: true,
        intent: 'success',
      });
    } catch (err) {
      setToast({
        title: 'Edit Failed',
        description: err.message,
        isOpen: true,
        intent: 'error',
      });
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        rounded={false}
        className="inset-0 m-auto h-3/4 w-fit outline-none"
      >
        <form
          className="relative flex h-full flex-col gap-y-4 overflow-hidden outline-none"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ScrollArea.Root className="h-full">
            <ScrollArea.Viewport className="h-full w-full pb-20">
              <Stack className="h-full space-y-8 p-8">
                <Stack direction="row" className="items-center justify-between">
                  <DialogTitle>Edit Member</DialogTitle>
                  <DialogClose />
                </Stack>
                <Stack direction="row" className="gap-x-4">
                  <FormField
                    id="firstName"
                    label="First Name"
                    type="text"
                    defaultValue={member.firstName}
                    error={errors.firstName}
                    errorMessage="This field is required"
                    register={register}
                    required
                  />
                  <FormField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    defaultValue={member.lastName}
                    error={errors.lastName}
                    errorMessage="This field is required"
                    register={register}
                    required
                  />
                </Stack>
                <FormField
                  id="userId"
                  label="Member Id"
                  type="text"
                  defaultValue={member.userId}
                  error={errors.userId}
                  errorMessage={errors.userId?.message}
                  register={register}
                  required
                />
                <FormField
                  id="notes"
                  as="textarea"
                  label="Notes"
                  type="text"
                  className="h-32"
                  defaultValue={member.notes}
                  register={register}
                />
                <FormField
                  id="email"
                  label="Email"
                  type="text"
                  defaultValue={member.contact.email}
                  error={errors.email}
                  errorMessage={errors.email?.message}
                  register={register}
                  required
                />
                <FormField
                  id="phoneNumber"
                  label="Phone Number"
                  type="text"
                  defaultValue={member.contact.phoneNumber}
                  error={errors.phoneNumber}
                  errorMessage={errors.phoneNumber?.message}
                  register={register}
                  required
                />
                <FormField
                  id="streetAddress"
                  label="Street Address"
                  type="text"
                  defaultValue={member.contact.streetAddress}
                  error={errors.streetAddress}
                  errorMessage={errors.streetAddress?.message}
                  register={register}
                  required
                />
                <FormField
                  id="city"
                  label="City"
                  type="text"
                  defaultValue={member.contact.city}
                  error={errors.city}
                  errorMessage={errors.city?.message}
                  register={register}
                  required
                />
                <FormSelect
                  id="state"
                  label="State"
                  name="state"
                  placeholder="Select state"
                  defaultValue={member.contact.state}
                  onValueChange={(value) => setValue('state', value)}
                  error={errors.state}
                  errorMessage={errors.state?.message}
                >
                  {STATES.map((state) => (
                    <FormSelectItem
                      key={state.abbreviation}
                      value={state.abbreviation}
                    >
                      {state.name}
                    </FormSelectItem>
                  ))}
                </FormSelect>
                <Stack direction="row" className="gap-x-2">
                  <FormField
                    id="zipcode"
                    label="Zipcode"
                    type="text"
                    defaultValue={member.contact.zipcode}
                    error={errors.zipcode}
                    errorMessage={errors.zipcode?.message}
                    register={register}
                    required
                  />
                </Stack>
              </Stack>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="relative flex w-2 rounded-lg"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative w-1 flex-grow bg-gray9" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-black" />
          </ScrollArea.Root>
          <Stack
            direction="row"
            className="absolute inset-y-[90%] z-10 h-20 w-full justify-end gap-x-2 bg-layer-alt px-8 shadow-custom"
          >
            <Button
              as="button"
              label="Cancel"
              intent="ghost"
              size="large"
              length="medium"
              className="mt-4 h-fit"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              as="input"
              type="submit"
              label="Update Member"
              intent="primary"
              size="large"
              length="medium"
              className="mt-4 h-fit"
            />
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
