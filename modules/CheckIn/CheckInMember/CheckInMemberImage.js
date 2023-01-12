import React, { useState } from 'react';
import Image from 'next/image';
import Webcam from 'react-webcam';
import useSWR from 'swr';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon, CameraIcon } from '@radix-ui/react-icons';
import fetcher from '@/lib/useSWRFetcher';
import { Stack, Dialog } from '@/components';

const videoConstraints = {
  width: 300,
  height: 350,
  facingMode: 'user',
};

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
    <div>
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

      <Dialog open={openWebcam} onOpenChange={setOpenWebcam}>
        <DialogPrimitive.Content className="absolute inset-1/2 -translate-x-1/2 -translate-y-3/4 h-fit w-1/2 bg-gray12 rounded-sm z-50">
          <Stack direction="row" className="p-2 justify-end items-end w-full">
            <DialogPrimitive.Close>
              <Cross2Icon
                className="text-white rounded-sm hover:bg-gray11 hover:text-gray3 active:text-gray5"
                height={20}
                width={20}
              />
            </DialogPrimitive.Close>
          </Stack>
          <Stack className="mx-auto w-full bg-black">
            <Webcam
              className="mx-auto"
              audio={false}
              height={350}
              screenshotFormat="image/jpeg"
              width={300}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <Stack
                  direction="row"
                  className="h-20 p-4 bg-gray12 justify-between w-full text-white"
                >
                  <button
                    type="button"
                    className="rounded-full w-12 h-12 mx-auto bg-white hover:outline hover:outline-2 hover:outline-gray8 hover:bg-gray4 active:bg-gray6 active:outline-gray10"
                    onClick={async () => {
                      const imageSrc = getScreenshot();
                      await fetch(`/api/member/image/${checkedInMember.id}`, {
                        method: 'POST',
                        body: JSON.stringify(imageSrc),
                      }).then(() => mutate());
                      setOpenWebcam(() => false);
                    }}
                  >
                    <CameraIcon
                      className="text-black mx-auto"
                      height={24}
                      width={24}
                    />
                  </button>
                </Stack>
              )}
            </Webcam>
          </Stack>
        </DialogPrimitive.Content>
      </Dialog>
    </div>
  );
}
