import React, { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Grid, Screen, Separator, Stack } from '@/components';

export const getServerSideProps = withPageAuthRequired();

async function getSession(sessionId) {
  const response = await fetch(`/api/member/getCheckoutSession/${sessionId}`);
  const data = await response.json();
  return data;
}

export default function SignUpSuccess() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');
  const [checkoutSession, setCheckoutSession] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setSessionId(query.get('session_id'));
    } else {
      router.push('/signup/error');
    }
    if (sessionId)
      getSession(sessionId).then((data) => setCheckoutSession(data));
  }, [sessionId, router]);

  return (
    <Screen background="primary">
      <Grid className="relative mx-auto max-w-screen-max gap-8 p-8">
        <Stack className="col-span-5 col-start-1 gap-10 lg:col-start-2">
          <Stack>
            <h1 className="mb-4 text-3xl leading-normal">Thank you!</h1>
            <h2>
              Your membership subscription was received and successfully
              created.
            </h2>
            <p>
              {checkoutSession &&
                `A confirmation email will be sent to ${checkoutSession.checkoutSession.customer_details.email} shortly.`}
            </p>
            <p>
              Please allow up to 10 minutes for the email to arrive in your
              inbox.
            </p>
          </Stack>
          <Separator className="bg-border-strong-dark" />
          <Stack>
            <h3 className="mb-4 text-3xl leading-normal">Next Steps</h3>
            <p className="mb-4">
              Click on the link below to finish setting up the membership
              account.
            </p>
            <ul className="mb-4 list-inside">
              <li className="list-disc">
                Take a photo and upload a photo of the member using the
                computer’s webcam.
              </li>
              <li className="list-disc">
                Assign the member a card Id and physical membership card.
              </li>
              <li className="list-disc">
                Check in the member for the first time.
              </li>
            </ul>
            {checkoutSession && (
              <Button
                as="link"
                className="mt-2"
                intent="primary"
                size="large"
                href={`/members/details/${checkoutSession.membership.member.id}`}
              >
                Complete Member Profile
              </Button>
            )}
          </Stack>
          <Separator className="bg-border-strong-dark" />
          {checkoutSession && (
            <Stack>
              <h3 className="mb-4 text-3xl leading-normal">Order Summary</h3>
              <h4 className="font-bold">
                Evolve Gym Membership -{' '}
                {checkoutSession.membership.plan.planName} Plan
              </h4>
              <ul className="mt-3 flex w-96 flex-col gap-y-1">
                <li className="flex w-full justify-between">
                  <span className="w-1/2">Invoice Id</span>
                  <span className="w-1/2">
                    {checkoutSession.checkoutSession.invoice}
                  </span>
                </li>
                <li className="flex w-full justify-between">
                  <span className="w-1/2">Member</span>
                  <span className="w-1/2">
                    {checkoutSession.checkoutSession.customer_details.name}
                  </span>
                </li>
                <li className="flex w-full justify-between">
                  <span className="w-1/2">Plan</span>
                  <span className="w-1/2">
                    {checkoutSession.membership.plan.planName}
                  </span>
                </li>
                <li className="flex w-full justify-between">
                  <span className="w-1/2">Total</span>
                  <span className="w-1/2">
                    $
                    {(
                      checkoutSession.checkoutSession.amount_total / 100
                    ).toFixed(2)}
                  </span>
                </li>
                <li className="flex w-full justify-between">
                  <span className="w-1/2">Order Date</span>
                  <span className="w-1/2">
                    {new Date(
                      checkoutSession.membership.signUpDate
                    ).toLocaleDateString()}
                  </span>
                </li>
                <li className="flex w-full justify-between">
                  <span className="w-1/2">Membership Ends</span>
                  <span className="w-1/2">
                    {new Date(
                      checkoutSession.membership.membershipEnds
                    ).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            </Stack>
          )}
        </Stack>
        <div className="relative col-span-5">
          <Image
            fill="contain"
            className="col-span-5 opacity-10"
            alt="Evolve Logo"
            src="/images/logo/evolve.svg"
          />
        </div>
      </Grid>
    </Screen>
  );
}
