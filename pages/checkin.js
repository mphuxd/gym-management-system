import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import fetcher from '@/lib/useSWRFetcher';
import { Screen, Stack } from '@/components';
import { CheckInSidepanel, CheckInMember } from '@/modules';

export const getServerSideProps = withPageAuthRequired();

export default function CheckIn() {
  const { data: checkInHistory, mutate } = useSWR(
    '/api/checkin/getAllCheckIns',
    fetcher
  );
  if (!checkInHistory) return null;
  // @@@ Create Loading Skeleton
  return (
    <Screen>
      <Stack direction="row" className="w-full">
        <CheckInSidepanel checkInHistory={checkInHistory} />
        <CheckInMember checkInHistory={checkInHistory} mutate={mutate} />
      </Stack>
    </Screen>
  );
}
