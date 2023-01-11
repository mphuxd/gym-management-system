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

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

function getEndDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date;
}

async function createMember(session) {
  await prisma.member.create({
    data: {
      firstName: session.customer_details.name.split(' ')[0],
      lastName: session.customer_details.name.split(' ')[1],
      contact: {
        create: {
          city: session.customer_details.address.city,
          country: session.customer_details.address.country,
          streetAddress: session.customer_details.address.line1,
          zipcode: session.customer_details.address.postal_code,
          state: session.customer_details.address.state,
          email: session.customer_details.email,
          phoneNumber: session.customer_details.phone,
        },
      },
      membership: {
        create: {
          customerId: session.customer,
          stripeSubscriptionId: session.subscription,
          membershipEnds: getEndDate(),
          status: 'ACTIVE',
          plan: {
            connect: { planId: Number(session.metadata.planId) },
          },
        },
      },
    },
  });
}

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

    const session = event.data.object;
    switch (event.type) {
      case 'checkout.session.completed':
        if (session) createMember(session);
        res
          .status(200)
          .json({ message: `New member has been created successfully!` });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        throw new Error(`Unhandled event type ${event.type}`);
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
