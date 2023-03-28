import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button, Stack, Screen, Grid } from '@/components';

export const getServerSideProps = withPageAuthRequired();

export default function SignUpError() {
  return (
    <Screen background="primary">
      <Grid
        columns={12}
        className="relative mx-auto min-h-screen-no-header w-full max-w-screen-max gap-8 p-8"
      >
        <Stack className="col-span-5 col-start-2 h-full gap-12">
          <Stack>
            <h1 className="mb-4 text-3xl leading-normal">
              Your order was not processed.
            </h1>
            <p>
              Your membership subscription was not processed due to an internal
              server error.
            </p>
            <p className="">Please wait and try again later.</p>

            <Button
              className="mt-4"
              as="link"
              intent="primary"
              size="large"
              href="/signup"
            >
              Sign Up New Member
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Screen>
  );
}
