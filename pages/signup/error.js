import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { Separator, Stack, Screen, Grid } from "@/components";

export const getServerSideProps = withPageAuthRequired();

export default function SignUpError() {
  return (
    <Screen>
      <Grid className='w-full gap-8 mx-auto p-8 relative'>
        <Stack className='col-start-2 col-span-5 gap-8'>
          <Stack>
            <h3 className='text-4xl mb-4 '>Sorry, your order was not processed.</h3>
            <p>Your membership subscription was not processed due to an internal server error.</p>
            <p>Please wait and try again later.</p>
          </Stack>
          <Separator />
          <Link href='/signup' className='bg-blue-600 text-white text-left py-2 pl-3 pr-6 w-fit'>
            Sign Up New Member
          </Link>
        </Stack>
        <div className='col-span-5 relative'>
          <Image
            fill='contain'
            className='opacity-10 col-span-5'
            alt='Evolve Logo'
            src='/images/logo/evolve.svg'
          ></Image>
        </div>
      </Grid>
    </Screen>
  );
}
