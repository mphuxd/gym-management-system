import React, { useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { gql, useQuery, useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Link from 'next/link';
import { toastAtom } from '@/atoms';
import {
  Button,
  CardSimple,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  FormField,
  Grid,
  Screen,
  Stack,
} from '@/components';

export const getServerSideProps = withPageAuthRequired();

export default function Home() {
  const { user } = useUser();
  return (
    user && (
      <Screen>
        <Grid className="mx-auto max-w-[1920px] auto-rows-min gap-8 px-8">
          <h1 className="col-span-10 mb-8 mt-12 text-4xl">
            Welcome, {user.nickname}
          </h1>
          <Grid columns={4} className="col-span-12 gap-x-8">
            <Link href="/checkin">
              <CardSimple
                heading="Check In Members"
                description="Verify member subscriptions and gym access."
              />
            </Link>
            <Link href="/analytics">
              <CardSimple
                heading="Analytics"
                description="View reports and monitor important metrics"
              />
            </Link>
            <Link href="/schedule">
              <CardSimple
                heading="Upcoming"
                description="See upcoming member classes, important events, and more."
              />
            </Link>
          </Grid>
          <Grid columns={4} className="col-span-12 gap-x-8">
            <Stack className="p-4 hover:bg-slate4 focus:bg-slate5 active:bg-slate5">
              <h3 className="mb-2 font-semibold">Quick Navigation</h3>
              <ul className="space-y-0.5">
                <li>
                  <Link className="hover:underline" href="/members">
                    Members
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/signup">
                    Sign Up New Member
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/classes">
                    Classes
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/employee-schedule">
                    Employee Schedule
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/sales">
                    Point of Sales
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/settings">
                    Settings
                  </Link>
                </li>
              </ul>
            </Stack>
            <Stack className="col-span-2 gap-y-8">
              <DashboardNotes />
              <Stack className=" p-4 ">
                <h3 className="mb-2 font-semibold">Contacts</h3>
                <Stack direction="row" className="gap-x-8">
                  <Stack>
                    <span>Evolve Gym</span>
                    <span>1111 Hilltop Way</span>
                    <span>San Jose, CA 95111</span>
                    <span>evolvesj@evolve.com</span>
                  </Stack>
                  <Stack>
                    <span>Manager</span>
                    <span>John Jones</span>
                    <span>johnjones@evolve.com</span>
                    <span>14084445566</span>
                  </Stack>
                  <Stack>
                    <span>Assistant Manager</span>
                    <span>John Jones</span>
                    <span>johnjones@evolve.com</span>
                    <span>14084445566</span>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Screen>
    )
  );
}

const GET_NOTE = gql`
  query GetNote {
    notes {
      id
      note
      createdAt
      updatedAt
      userId
      updatedBy {
        id
        username
        email
      }
    }
  }
`;

function DashboardNotes() {
  const [open, setOpen] = useState(false);
  const { data, error, refetch } = useQuery(GET_NOTE);
  if (error) return null;
  return (
    data && (
      <ScrollArea.Root
        className="focusable relative h-40 w-full overflow-hidden p-4 hover:cursor-pointer hover:bg-layer-hover active:bg-layer-active"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setOpen(true);
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <ScrollArea.Viewport>
          <Stack>
            <h3 className="mb-2 font-semibold">Notes</h3>
            <div className="whitespace-pre-wrap">{data.notes.note}</div>
            <Stack className="mt-4">
              <span>
                Edited {new Date(data.notes.updatedAt).toLocaleString()}
              </span>
              <span>By {data.notes.updatedBy.username}</span>
            </Stack>
          </Stack>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="bg-gray-200 flex w-2 px-[1px]"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="bg-gray-400 relative w-1 flex-grow rounded-lg" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-black" />
        <DashboardNotesDialog
          open={open}
          setOpen={setOpen}
          note={data.notes}
          refetch={refetch}
        />
      </ScrollArea.Root>
    )
  );
}

const UPDATE_NOTE = gql`
  mutation ($id: String!, $userId: String!, $note: String) {
    updateNote(id: $id, userId: $userId, note: $note) {
      id
      userId
      note
    }
  }
`;

function DashboardNotesDialog({ open, setOpen, note, refetch }) {
  const [updateNote] = useMutation(UPDATE_NOTE);
  const [, setToast] = useAtom(toastAtom);

  const schema = yup
    .object({
      note: yup.string().trim(),
    })
    .required();
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(submitData) {
    try {
      updateNote({
        variables: {
          id: note.id,
          userId: note.userId,
          note: submitData.note,
        },
      }).then(() => refetch());
      // @@@ get active userId
      setToast({
        title: 'Successful Edit',
        description: note.id,
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
        tabIndex={-1}
        rounded={false}
        className="inset-1/2 h-fit w-1/3 -translate-x-1/2 -translate-y-3/4 space-y-4 p-8"
      >
        <Stack direction="row" className="items-center justify-between">
          <DialogTitle>Edit Note</DialogTitle>
          <DialogClose
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
        </Stack>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id="note"
            as="textarea"
            type="text"
            className="h-48"
            defaultValue={note.note}
            register={register}
          />
          <div className="flex flex-row justify-end">
            <Button
              className="ml-auto"
              type="submit"
              intent="primary"
              size="large"
              length="medium"
            >
              Save Note
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
