import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { DashboardModuleLabel, DashboardNotesDialog } from "/components";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Dialog from "@radix-ui/react-dialog";

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
  const { data, loading, error, startPolling } = useQuery(GET_NOTE);
  startPolling(1000);
  if (error) console.log(error);
  return (
    <div
      id='action-notes'
      className='basis-full 2xl:basis-1/3 flex flex-col gap-y-4 hover:bg-gray-100 '
    >
      <DashboardModuleLabel label='Notes' />
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {data && (
          <>
            <ScrollArea.Root className='relative'>
              <ScrollArea.Viewport className=''>
                <div className='flex flex-col'>
                  <div className='whitespace-pre-wrap '>{data.notes.note}</div>
                  <div className='mt-4 flex flex-col'>
                    <span>Edited {new Date(data.notes.updatedAt).toLocaleString()}</span>
                    <span>By {data.notes.updatedBy.username}</span>
                  </div>
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation='horizontal'>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Scrollbar orientation='vertical'>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner />
              <Dialog.Trigger className='absolute inset-0 h-full w-full' disabled={false} />
            </ScrollArea.Root>

            <Dialog.Portal>
              <Dialog.Overlay className='fixed bg-black opacity-30 inset-0' />
              <Dialog.Content className='absolute inset-1/2 -translate-x-1/2  -translate-y-3/4 h-fit w-1/3 bg-white'>
                {data && <DashboardNotesDialog setOpen={setOpen} note={data.notes} />}
              </Dialog.Content>
            </Dialog.Portal>
          </>
        )}
      </Dialog.Root>
    </div>
  );
}

export default DashboardNotes;

// @@@ style
