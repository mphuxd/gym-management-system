/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'micro-cors';
import { buffer } from 'micro';
import Stripe from 'stripe';
// eslint-disable-next-line import/extensions
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01',
});

const webhookSecret: string =
  process.env.STRIPE_WEBHOOK_SECRET_CANCEL_SUBSCRIPTION!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ message: 'Method not allowed' });
    }

    if (!webhookSecret) {
      return res.status(403).json({ message: `You must provide the secret` });
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      webhookSecret
    );
    console.log('✅ Success:', event.id);

    switch (event.type) {
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.membership.update({
          where: {
            stripeSubscriptionId: subscription.id as string,
          },
          data: {
            status: 'CANCELLED',
            membershipEnds: new Date(subscription.current_period_end * 1000),
          },
        });
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    res.status(500).send(`Webhook Error: ${errorMessage}`);
  }
  return null;
}

export default cors(webhookHandler as any);
