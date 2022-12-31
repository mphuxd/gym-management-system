import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = getSession(req, res);
    const { sessionId } = req.query;
    const sessionIdString = sessionId.toString();

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionIdString);
    const customerId = checkoutSession.customer;

    const member = await prisma.membership
      .findUnique({ where: { customerId: customerId } })
      .member();

    res.status(200).json({ statusCode: 200, customerId: customerId });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
});
