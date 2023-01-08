import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { Grid, Screen, Separator, Stack } from "@/components";

export const getServerSideProps = withPageAuthRequired();

async function getSession(sessionId) {
  const response = await fetch(`/api/member/getCheckoutSession/${sessionId}`);
  const data = await response.json();
  return data;
}

export default function SignUpSuccess() {
  const router = useRouter();
  let [sessionId, setSessionId] = useState("");
  let [checkoutSession, setCheckoutSession] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setSessionId(query.get("session_id"));
    } else {
      router.push("/signup/error");
    }
    if (sessionId) getSession(sessionId).then((data) => setCheckoutSession(data));
  }, [sessionId, router]);

  return (
    <Screen>
      <Grid className='gap-8 mx-auto p-8 relative'>
        <Stack className='col-start-2 col-span-5 gap-8'>
          <Stack>
            <h3 className='text-4xl mb-4 '>Thank you!</h3>
            <p>Your membership subscription was received and successfully created.</p>
            <p>
              {checkoutSession &&
                `A confirmation email will be sent to ${checkoutSession.checkoutSession.customer_details.email} shortly.`}
            </p>
            <p>Please allow up to 10 minutes for the email to arrive in your inbox.</p>
          </Stack>
          <Separator className='' />
          <Stack>
            <h3 className='text-4xl mb-4'>Next Steps</h3>
            <p>Please click on the link below to finish setting up the membership account.</p>
            <ul className='list-inside mb-4'>
              <li className='list-disc'>
                Take a photo and upload a photo of the member using the computer’s webcam.
              </li>
              <li className='list-disc'>
                Assign the member a card Id and physical membership card.
              </li>
              <li className='list-disc'>Check in the member for the first time.</li>
            </ul>
            {checkoutSession && (
              <Link
                href={`/members/details/${checkoutSession.membership.member.id}`}
                className='block w-fit bg-blue-600 text-white text-left py-2 pl-3 pr-6'
              >
                Complete Member Profile
              </Link>
            )}
          </Stack>
          <Separator />
          {checkoutSession && (
            <Stack>
              <h3 className='text-4xl mb-4'>Order Summary</h3>
              <h4 className='font-bold'>
                Evolve Gym Membership - {checkoutSession.membership.plan.planName} Plan
              </h4>
              <ul className='flex flex-col w-96 mt-3 gap-y-1'>
                <li className='w-full flex justify-between'>
                  <span className='w-1/2'>Invoice Id</span>
                  <span className='w-1/2'>{checkoutSession.checkoutSession.invoice}</span>
                </li>
                <li className='w-full flex justify-between'>
                  <span className='w-1/2'>Member</span>
                  <span className='w-1/2'>
                    {checkoutSession.checkoutSession.customer_details.name}
                  </span>
                </li>
                <li className='w-full flex justify-between'>
                  <span className='w-1/2'>Plan</span>
                  <span className='w-1/2'>{checkoutSession.membership.plan.planName}</span>
                </li>
                <li className='w-full flex justify-between'>
                  <span className='w-1/2'>Total</span>
                  <span className='w-1/2'>
                    ${(checkoutSession.checkoutSession.amount_total / 100).toFixed(2)}
                  </span>
                </li>
                <li className='w-full flex justify-between'>
                  <span className='w-1/2'>Order Date</span>
                  <span className='w-1/2'>
                    {new Date(checkoutSession.membership.signUpDate).toLocaleDateString()}
                  </span>
                </li>
                <li className='w-full flex justify-between'>
                  <span className='w-1/2'>Membership Ends</span>
                  <span className='w-1/2'>
                    {new Date(checkoutSession.membership.membershipEnds).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            </Stack>
          )}
        </Stack>
        <div className='col-span-5 relative'>
          <Image
            fill='contain'
            className='opacity-10 col-span-5'
            alt='Evolve Logo'
            src='/images/logo/evolve.svg'
          />
        </div>
      </Grid>
    </Screen>
  );
}
