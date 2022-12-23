import React, { useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import useSWR from "swr";
import fetcher from "/lib/useSWRFetcher";
import { Overlay, Stack } from "@/components";

const videoConstraints = {
  width: 300,
  height: 350,
  facingMode: "user",
};

export default function CheckinMemberImage({ checkedInMember }) {
  const { data: image, mutate } = useSWR(`/api/member/getS3Image/${checkedInMember.id}`, fetcher);
  const [openWebcam, setOpenWebcam] = useState(false);

  return (
    <div>
      <div className='relative'>
        <Image
          src={image?.imageUrl || "/images/image-placeholder.png"}
          width={300}
          height={350}
          alt={`${checkedInMember.firstName} ${checkedInMember.lastName}`}
          priority
          className='h-[200px] w-[180px]'
        />
        <div className='opacity-0 hover:opacity-100 absolute h-full w-full inset-0 p-4'>
          <button onClick={() => setOpenWebcam(true)} className='bg-white p-2'>
            Edit Image
          </button>
        </div>
      </div>
      {openWebcam && (
        <React.Fragment>
          <div className='fixed z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            <Webcam
              audio={false}
              height={350}
              screenshotFormat='image/jpeg'
              width={300}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <Stack direction='row' className='p-4 bg-white justify-between'>
                  <button
                    onClick={async () => {
                      const imageSrc = getScreenshot();
                      const { image } = await fetch(
                        `/api/member/uploadImage/${checkedInMember.id}`,
                        {
                          method: "POST",
                          body: JSON.stringify(imageSrc),
                        }
                      ).then(() => mutate());
                      setOpenWebcam(() => false);
                    }}
                  >
                    Capture photo
                  </button>
                  <button onClick={() => setOpenWebcam(false)}>Close</button>
                </Stack>
              )}
            </Webcam>
          </div>
          <Overlay />
        </React.Fragment>
      )}
    </div>
  );
}
