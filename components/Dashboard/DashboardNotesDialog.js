import React from "react";
import { useForm } from "react-hook-form";
import { FormField, Button } from "/components";
import { useMutation, gql } from "@apollo/client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import { toastAtom } from "../../atoms";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
// import { useUser, getAccessToken } from "@auth0/nextjs-auth0";

const UPDATE_NOTE = gql`
  mutation ($id: String!, $userId: String!, $note: String) {
    updateNote(id: $id, userId: $userId, note: $note) {
      id
      userId
      note
    }
  }
`;

function DashboardNotesDialog({ note, setOpen }) {
  // const { user } = useUser();
  const [updateNote] = useMutation(UPDATE_NOTE);
  const [toast, setToast] = useAtom(toastAtom);

  const schema = yup
    .object({
      note: yup.string().trim(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(submitData) {
    try {
      updateNote({
        variables: {
          id: note.id,
          userId: note.userId,
          note: submitData.note,
        },
      });
      setToast({
        title: "Successful Edit",
        description: note.id,
        isOpen: true,
      });
      // @@@ create history
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
    <div className='flex flex-col p-8 space-y-8'>
      <div className='flex flex-row justify-between items-center'>
        <Dialog.Title className='font-bold text-lg'>Edit Note</Dialog.Title>
        <Dialog.Close className=''>X</Dialog.Close>
      </div>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label.Root htmlFor='input-notes'>Notes</Label.Root>
          <textarea
            id='input-notes'
            defaultValue={note.note}
            type='text'
            className='h-80 input-field'
            {...register("note")}
          />
        </FormField>
        <Button
          as='input'
          label='Save'
          type='submit'
          variant='primary'
          className='border-blue-500'
        />
      </form>
    </div>
  );
}

// @@@ check user method
// @@@ standardize generic dialogs

export default DashboardNotesDialog;
