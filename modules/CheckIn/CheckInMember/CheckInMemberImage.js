import React, { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import fetcher from '@/lib/useSWRFetcher';
import { DialogWebcam } from '@/modules/Dialogs';

export default function CheckinMemberImage({ checkedInMember }) {
  const { data: image, mutate } = useSWR(
    [
      `/api/member/image/${checkedInMember.id}`,
      {
        method: 'GET',
      },
    ],
    fetcher
  );
  const [openWebcam, setOpenWebcam] = useState(false);

  return (
    <>
      <div className="relative">
        <Image
          src={image?.imageUrl || '/images/image-placeholder.png'}
          width={300}
          height={350}
          alt={`${checkedInMember.firstName} ${checkedInMember.lastName}`}
          priority
          className="h-[200px] w-[180px]"
        />
        <div className="opacity-0 hover:opacity-100 absolute h-full w-full inset-0 p-4">
          <button
            type="button"
            onClick={() => setOpenWebcam(true)}
            className="bg-white p-2"
          >
            Edit Image
          </button>
        </div>
      </div>
      <DialogWebcam
        memberId={checkedInMember.id}
        openWebcam={openWebcam}
        setOpenWebcam={setOpenWebcam}
        mutate={mutate}
      />
    </>
  );
}
