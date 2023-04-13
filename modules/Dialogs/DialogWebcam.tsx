// import React from 'react';
// import Webcam from 'react-webcam';
// import * as DialogPrimitive from '@radix-ui/react-dialog';
// import { CameraIcon } from '@radix-ui/react-icons';
// import { Stack, Dialog, DialogClose } from '@/components';

// export default function DialogWebcam({
//   openWebcam,
//   setOpenWebcam,
//   mutate,
//   memberId,
// }) {
//   const videoConstraints = {
//     width: 300,
//     height: 350,
//     facingMode: 'user',
//   };
//   return (
//     <Dialog open={openWebcam} onOpenChange={setOpenWebcam}>
//       <DialogPrimitive.Content className="absolute inset-1/2 z-50 h-fit w-1/2 -translate-x-1/2 -translate-y-3/4 rounded-sm bg-gray12">
//         <Stack direction="row" className="w-full items-end justify-end p-2">
//           <DialogClose className="text-white" />
//         </Stack>
//         <Stack className="mx-auto w-full bg-black">
//           <Webcam
//             className="mx-auto"
//             audio={false}
//             height={350}
//             screenshotFormat="image/jpeg"
//             width={300}
//             videoConstraints={videoConstraints}
//           >
//             {({ getScreenshot }) => (
//               <Stack
//                 direction="row"
//                 className="h-20 w-full justify-between bg-gray12 p-4 text-white"
//               >
//                 <WebcamTakePhotoButton
//                   getScreenshot={getScreenshot}
//                   memberId={memberId}
//                   mutate={mutate}
//                   setOpenWebcam={setOpenWebcam}
//                 />
//               </Stack>
//             )}
//           </Webcam>
//         </Stack>
//       </DialogPrimitive.Content>
//     </Dialog>
//   );
// }

// function WebcamTakePhotoButton({
//   getScreenshot,
//   memberId,
//   mutate,
//   setOpenWebcam,
// }) {
//   return (
//     <button
//       type="button"
//       className="mx-auto h-12 w-12 rounded-full bg-white hover:bg-gray4 hover:outline hover:outline-2 hover:outline-primary active:bg-gray6 active:outline-gray10"
//       onClick={async () => {
//         const imageSrc = getScreenshot();
//         await fetch(`/api/member/image/${memberId}`, {
//           method: 'POST',
//           body: JSON.stringify(imageSrc),
//         }).then(() => mutate());
//         setOpenWebcam(() => false);
//       }}
//     >
//       <CameraIcon className="mx-auto text-black" height={24} width={24} />
//     </button>
//   );
// }

// const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: "user"
// };

// const WebcamCapture = () => {
//   const webcamRef = React.useRef(null);
//   const capture = React.useCallback(
//     () => {
//       const imageSrc = webcamRef.current.getScreenshot();
//     },
//     [webcamRef]
//   );
//   return (
//     <>
//       <Webcam
//         audio={false}
//         height={720}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={1280}
//         videoConstraints={videoConstraints}
//       />
//       <button onClick={capture}>Capture photo</button>
//     </>
//   );
// };

import React from 'react';
import Webcam from 'react-webcam';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CameraIcon } from '@radix-ui/react-icons';
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

  const webcamRef = React.useRef(null);
  const getScreenshot = React.useCallback(
    () => webcamRef.current.getScreenshot(),
    [webcamRef]
  );

  return (
    <Dialog open={openWebcam} onOpenChange={setOpenWebcam}>
      <DialogPrimitive.Content className="absolute inset-1/2 z-50 h-fit w-1/2 -translate-x-1/2 -translate-y-3/4 rounded-sm bg-gray12">
        <Stack direction="row" className="w-full items-end justify-end p-2">
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
            ref={webcamRef}
          />
          <Stack
            direction="row"
            className="h-20 w-full justify-between bg-gray12 p-4 text-white"
          >
            <WebcamTakePhotoButton
              getScreenshot={getScreenshot}
              memberId={memberId}
              mutate={mutate}
              setOpenWebcam={setOpenWebcam}
            />
          </Stack>
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
      className="mx-auto h-12 w-12 rounded-full bg-white hover:bg-gray4 hover:outline hover:outline-2 hover:outline-primary active:bg-gray6 active:outline-gray10"
      onClick={async () => {
        const imageSrc = getScreenshot();
        await fetch(`/api/member/image/${memberId}`, {
          method: 'POST',
          body: JSON.stringify(imageSrc),
        }).then(() => mutate());
        setOpenWebcam(() => false);
      }}
    >
      <CameraIcon className="mx-auto text-black" height={24} width={24} />
    </button>
  );
}
