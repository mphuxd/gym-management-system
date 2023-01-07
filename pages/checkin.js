import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import fetcher from "@/lib/useSWRFetcher";
import { Stack } from "@/components";
import { CheckInSidepanel, CheckInMember } from "@/modules";

export const getServerSideProps = withPageAuthRequired();

export default function CheckIn() {
  let {
    data: checkInHistory,
    error: checkInHistoryError,
    mutate,
  } = useSWR("/api/checkin/getAllCheckIns", fetcher);
  if (!checkInHistory) return;
  // @@@ Create Loading Skeleton
  return (
    <Stack direction='row' className='bg-slate2 min-h-screen-calc'>
      <CheckInSidepanel checkInHistory={checkInHistory} />
      <CheckInMember checkInHistory={checkInHistory} mutate={mutate} />
    </Stack>
  );
}
