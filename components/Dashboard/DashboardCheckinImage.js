import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { AvatarIcon } from "@radix-ui/react-icons";
import { DialogBackdrop } from "../Dialog";

async function getImage(id) {
  const imageSrcRes = await fetch(`/api/member/getS3Image/${id}`);
  const imageSrcData = await imageSrcRes.json();
  return imageSrcData;
}

function DashboardCheckinImage({ checkedInMember }) {
  const memberRef = useRef(checkedInMember);
  const [image, setImage] = useState(null);
  const [openWebcam, setOpenWebcam] = useState(false);

  if (!image || checkedInMember !== memberRef.current) {
    getImage(checkedInMember.id).then((src) => {
      if (src.statusCode === 200) setImage(src.imageUrl);
      else setImage(null);
    });
    memberRef.current = checkedInMember;
  }

  const videoConstraints = {
    width: 300,
    height: 350,
    facingMode: "user",
  };

  return (
    <div>
      <div className='relative'>
        {image ? (
          <Image
            src={image}
            width={300}
            height={350}
            alt='Member Image'
            priority
            className='w-1/5 min-w-[300px] h-[350px]'
          />
        ) : (
          <div className='w-[300px] h-[350px] bg-gray-200'></div>
        )}
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
                <div className='p-4 bg-white flex flex-row justify-between'>
                  <button
                    onClick={async () => {
                      const imageSrc = getScreenshot();
                      const { image } = await fetch(
                        `/api/member/uploadImage/${checkedInMember.id}`,
                        {
                          method: "POST",
                          body: JSON.stringify(imageSrc),
                        }
                      );
                      setOpenWebcam(() => false);
                    }}
                  >
                    Capture photo
                  </button>
                  <button onClick={() => setOpenWebcam(false)}>Close</button>
                </div>
              )}
            </Webcam>
          </div>
          <DialogBackdrop />
        </React.Fragment>
      )}
    </div>
  );
}

export default DashboardCheckinImage;
