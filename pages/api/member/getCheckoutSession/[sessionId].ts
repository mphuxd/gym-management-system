//trigger stripe event
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { sessionId } = req.query;
    const sessionIdString = sessionId.toString();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionIdString);
    const customerId = checkoutSession.customer;

    const membership = await prisma.membership.findUnique({
      where: { customerId: customerId },
      include: { plan: true, member: true },
    });

    res.status(200).json({ statusCode: 200, customerId, membership, checkoutSession });
  } catch (err) {
    console.log(err);
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
