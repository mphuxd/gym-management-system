import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { FormField } from "/components";
import { useMutation, gql } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toastAtom } from "../../atoms";
import { useAtom } from "jotai";
import { Button } from "../Button";

const UPDATE_MEMBER = gql`
  mutation (
    $id: String!
    $userId: String!
    $firstName: String!
    $lastName: String!
    $notes: String
  ) {
    updateMember(
      id: $id
      userId: $userId
      firstName: $firstName
      lastName: $lastName
      notes: $notes
    ) {
      id
      userId
      firstName
      lastName
      notes
    }
  }
`;

async function getMember(id) {
  const response = await fetch(`/api/member/getMember/${id}`);
  const data = await response.json();
  return data.member;
}

function DashboardCheckinEditDetailsForm({ member, setOpen, setCheckedInMemberDispatcher }) {
  const [updateMember] = useMutation(UPDATE_MEMBER);
  const [toast, setToast] = useAtom(toastAtom);

  const schema = yup
    .object({
      firstName: yup.string().required().trim(),
      lastName: yup.string().required().trim(),
      userId: yup.string().matches("^[0-9]*$").length(12).required().trim(),
      notes: yup.string().trim(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(submitData) {
    try {
      updateMember({
        variables: {
          id: member.id,
          firstName: submitData.firstName,
          lastName: submitData.lastName,
          userId: submitData.userId,
          notes: submitData.notes,
        },
      })
        .then(() => {
          return getMember(member.id);
        })
        .then((member) => {
          setCheckedInMemberDispatcher({ type: "editMember", member: member });
        });
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

  //if bad mutation, leave input and form open with a new dialog with error message
  //validate input before sending it, dont trust any input from front-end anyway
  return (
    <div className='flex flex-col p-8 space-y-8'>
      <div className='flex flex-row justify-between items-center'>
        <Dialog.Title className='font-bold text-lg'>Edit Member</Dialog.Title>
        <Dialog.Close className=''>X</Dialog.Close>
      </div>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row gap-x-4'>
          <FormField>
            <Label.Root htmlFor='input-firstName'>First Name</Label.Root>
            {/* use controller and create a component. add validation */}
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
        </div>
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
    </div>
  );
}

export default DashboardCheckinEditDetailsForm;
