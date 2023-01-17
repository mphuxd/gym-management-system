import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Separator, Stack, Screen, Grid } from '@/components';

export const getServerSideProps = withPageAuthRequired();

export default function SignUpError() {
  return (
    <Screen>
      <Grid
        columns={12}
        className="w-full gap-8 mx-auto p-8 relative min-h-screen-calc"
      >
        <Stack className="col-start-2 col-span-5 gap-12 h-full">
          <Stack className="">
            <h3 className="text-4xl mb-4 leading-normal">
              Your order was not processed.
            </h3>
            <p>
              Your membership subscription was not processed due to an internal
              server error.
            </p>
            <p className="">Please wait and try again later.</p>
          </Stack>
          <Separator />
          <Stack>
            <h3 className="text-4xl mb-4 leading-normal">Try Again.</h3>
            <p className="mb-4">
              Click the link below to try signing up a new member again.
            </p>
            <Button as="div" intent="primary" rounded={false} size="large">
              <Link href="/signup" className="">
                Sign Up New Member
              </Link>
            </Button>
          </Stack>
        </Stack>
        <div className="col-span-5 relative h-full">
          <Image
            fill="contain"
            className="opacity-10 col-span-5"
            alt="Evolve Logo"
            src="/images/logo/evolve.svg"
          />
        </div>
      </Grid>
    </Screen>
  );
}
