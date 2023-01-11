import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
// eslint-disable-next-line import/extensions
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { sessionId } = req.query;
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      sessionId as string
    );
    const customerId = checkoutSession.customer as string;

    const membership = await prisma.membership.findUnique({
      where: { customerId },
      include: { plan: true, member: true },
    });

    res
      .status(200)
      .json({ statusCode: 200, customerId, membership, checkoutSession });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
