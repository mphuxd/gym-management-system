import React from 'react';
import Webcam from 'react-webcam';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon, CameraIcon } from '@radix-ui/react-icons';
import { Stack, Dialog, DialogClose } from '@/components';

export default function DialogWebcam({
  openWebcam,
  setOpenWebcam,
  mutate,
  memberId,
}) {
  const videoConstraints = {
    width: 300,
    height: 350,
    facingMode: 'user',
  };
  return (
    <Dialog open={openWebcam} onOpenChange={setOpenWebcam}>
      <DialogPrimitive.Content className="absolute inset-1/2 -translate-x-1/2 -translate-y-3/4 h-fit w-1/2 bg-gray12 rounded-sm z-50">
        <Stack direction="row" className="p-2 justify-end items-end w-full">
          <DialogClose className="text-white" />
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
                <WebcamTakePhotoButton
                  getScreenshot={getScreenshot}
                  memberId={memberId}
                  mutate={mutate}
                  setOpenWebcam={setOpenWebcam}
                />
              </Stack>
            )}
          </Webcam>
        </Stack>
      </DialogPrimitive.Content>
    </Dialog>
  );
}

function WebcamTakePhotoButton({
  getScreenshot,
  memberId,
  mutate,
  setOpenWebcam,
}) {
  return (
    <button
      type="button"
      className="rounded-full w-12 h-12 mx-auto bg-white hover:outline hover:outline-2 hover:outline-primary hover:bg-gray4 active:bg-gray6 active:outline-gray10"
      onClick={async () => {
        const imageSrc = getScreenshot();
        await fetch(`/api/member/image/${memberId}`, {
          method: 'POST',
          body: JSON.stringify(imageSrc),
        }).then(() => mutate());
        setOpenWebcam(() => false);
      }}
    >
      <CameraIcon className="text-black mx-auto" height={24} width={24} />
    </button>
  );
}
