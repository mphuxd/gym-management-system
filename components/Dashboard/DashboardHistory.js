import React, { useRef } from "react";
import { DashboardModuleLabel } from "/components";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_HISTORY = gql`
  query {
    history {
      performedBy {
        id
        username
        email
        role
      }
      description
      createdAt
    }
  }
`;

function DashboardHistory() {
  const { data, loading, error, startPolling } = useQuery(GET_ALL_HISTORY);
  startPolling(1000);
  const HISTORY = useRef(null);

  if (error) console.log(error);
  if (loading) return <div>Loading</div>;
  if (data) {
    console.log(data);
    HISTORY.current = Array.from(data.history).reverse();
  }

  return (
    <div id='action-history' className='basis-full 2xl:basis-1/3 gap-y-4 flex flex-col'>
      <DashboardModuleLabel label='History' />
      <ScrollArea.Root className='overflow-hidden'>
        {data && (
          <ScrollArea.Viewport className='w-full h-full'>
            <div className='flex flex-col w-full text-sm'>
              {HISTORY &&
                HISTORY.current.map((event, idx) => {
                  if (idx <= 25) {
                    return (
                      <div className='flex flex-row justify-between' key={idx}>
                        <span>{event.description}</span>
                        <span>{new Date(event.createdAt).toLocaleString()}</span>
                      </div>
                    );
                  }
                })}
            </div>
          </ScrollArea.Viewport>
        )}
        <ScrollArea.Scrollbar
          className='flex select-none touch-none w-2 bg-gray-200 opacity-50'
          orientation='vertical'
        >
          <ScrollArea.Thumb data-state='' className='flex-1 relative bg-black' />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
}

//@@@ make table with action, description, and time
//consider hover tooltip
//For check-ins, onclick should display member profile

export default DashboardHistory;
