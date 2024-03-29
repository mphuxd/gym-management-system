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
        <div className=" absolute inset-0 h-full w-full p-4">
          <button
            tabIndex={0}
            type="button"
            onClick={() => setOpenWebcam(true)}
            className="bg-white p-2 opacity-0 hover:opacity-100 focus:opacity-100"
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
