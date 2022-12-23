import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import fetcher from "@/lib/useSWRFetcher";
import { CheckInSidepanel, CheckInMember } from "@/modules";

export const getServerSideProps = withPageAuthRequired();

export default function CheckIn() {
  let {
    data: checkInHistory,
    error: checkInHistoryError,
    mutate,
  } = useSWR("/api/checkin/getAllCheckIns", fetcher);
  if (!checkInHistory) return console.log("loading");
  // @@@ Create Loading Skeleton
  return (
    <div className='flex flex-row bg-gray-100 min-h-screen-calc'>
      <CheckInSidepanel checkInHistory={checkInHistory} />
      <CheckInMember checkInHistory={checkInHistory} mutate={mutate} />
    </div>
  );
}
