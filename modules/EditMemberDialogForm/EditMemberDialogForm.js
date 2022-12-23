import React from "react";
import { useAtom } from "jotai";
import { toastAtom } from "@/atoms";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Label from "@radix-ui/react-label";
import {
  Button,
  FormField,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  Stack,
} from "@/components";

const schema = yup
  .object({
    firstName: yup.string().required().trim(),
    lastName: yup.string().required().trim(),
    userId: yup.string().matches("^[0-9]*$").length(12).required().trim(),
    notes: yup.string().trim(),
  })
  .required();

export default function EditMemberDialogForm({ member, open, setOpen, mutate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [toast, setToast] = useAtom(toastAtom);

  function onSubmit(submitData) {
    try {
      fetch("/api/member/editMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: member.id,
          firstName: submitData.firstName,
          lastName: submitData.lastName,
          userId: submitData.userId,
          notes: submitData.notes,
        }),
      }).then(() => mutate());
      setToast({
        title: "Successful Edit",
        description: member.id,
        isOpen: true,
      });
    } catch (err) {
      console.log(err);
      setToast({
        title: "Edit Failed",
        description: err.message,
        isOpen: true,
      });
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='inset-1/2 -translate-x-1/2 -translate-y-3/4 h-fit w-fit'>
        <Stack className='space-y-8'>
          <Stack direction='row' className='justify-between items-center'>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogClose />
          </Stack>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Stack direction='row' className='gap-x-4'>
              <FormField>
                <Label.Root htmlFor='input-firstName'>First Name</Label.Root>
                <input
                  id='input-firstName'
                  defaultValue={member.firstName}
                  type='text'
                  className='input-field'
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <span>This field is required</span>}
              </FormField>
              <FormField>
                <Label.Root htmlFor='input-lastName'>Last Name</Label.Root>
                <input
                  id='input-lastName'
                  defaultValue={member.lastName}
                  type='text'
                  className='input-field'
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && <span>{errors.lastName?.message}</span>}
              </FormField>
            </Stack>
            <FormField>
              <Label.Root htmlFor='input-memberId'>Member Id</Label.Root>
              <input
                id='input-memberId'
                defaultValue={member.userId}
                type='text'
                className='input-field'
                {...register("userId", { required: true })}
              />
              {errors.userId && <span>{errors.userId?.message}</span>}
            </FormField>
            <FormField>
              <Label.Root htmlFor='input-memberNotes'>Notes</Label.Root>
              <textarea
                id='input-memberNotes'
                defaultValue={member.notes}
                type='text'
                className='h-32 input-field'
                {...register("notes")}
              />
            </FormField>

            <Button
              as='input'
              label='Submit'
              type='submit'
              variant='primary'
              className='border-blue-500'
            />
          </form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
