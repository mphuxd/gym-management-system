/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Stripe from 'stripe';
// eslint-disable-next-line import/extensions
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01',
});

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { user } = await getSession(req, res);
      if (!user) res.status(401).json({ message: 'Unauthorized' });

      const { memberId: id } = req.query;
      const idString = id as string;

      const membership = await prisma.member
        .findUnique({ where: { id: idString } })
        .membership();

      const stripeSubscriptionID = membership.stripeSubscriptionId;

      if (!stripeSubscriptionID) {
        throw new Error('Stripe Subscription Id not found');
      }
      console.log('Subscription Id found');

      await stripe.subscriptions.del(stripeSubscriptionID);
      console.log('Subscription cancelled.');

      res.status(200).json({
        result: `Subscription: ${stripeSubscriptionID} successfully cancelled`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  }
);
