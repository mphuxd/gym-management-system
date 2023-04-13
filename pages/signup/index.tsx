import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { CardSubscription, Grid, Screen, Stack } from '@/components';

export const getServerSideProps = withPageAuthRequired();

export default function SignUp() {
  return (
    <Screen background="alt">
      <Grid
        as="section"
        className="mx-auto max-w-screen-max auto-rows-min justify-center gap-y-0 p-8"
      >
        <div className="col-span-full">
          <h1 className="mb-8 text-lg font-semibold ">Sign Up New Member</h1>
          <p className="mb-8">
            Select a plan, or{' '}
            <Link className="underline" href="/">
              manually sign up a new member.
            </Link>
          </p>
        </div>
        <Stack direction="row" className="col-span-full gap-x-8">
          <CardSubscription
            planName="Standard"
            price="$15.00 / month*"
            planLookUpKey="price_1M2NTUByvJkIkjZn5gEQDS8i"
            planIdValue="1"
            features={[
              'Gym Access',
              'Unlimited group classes',
              'Personal training sessions',
            ]}
            footnotes="*One Year contract, $69 cancellation fee."
          />
          <CardSubscription
            planName="Gold"
            price="$25.00 / month*"
            planLookUpKey="price_1M2NTxByvJkIkjZn9IRkoopV"
            planIdValue="2"
            features={[
              'Includes basic plan features',
              'Daily guest pass',
              'Access to gold member lounge',
            ]}
            footnotes="*No contract, cancel any time for free."
          />
          <CardSubscription
            planName="Unlimited"
            price="$40.00 / month*"
            planLookUpKey="price_1M2NUYByvJkIkjZn66ovpP5V"
            planIdValue="3"
            features={[
              'Includes gold plan features',
              'Access to all Evolve Gyms',
              'Partner Rewards & Discounts',
            ]}
            footnotes="*One Year contract, $69 cancellation fee."
          />
        </Stack>
      </Grid>
    </Screen>
  );
}
