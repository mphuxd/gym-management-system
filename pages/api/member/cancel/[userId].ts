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

    const { userId } = req.query;
    const userIdString = userId.toString();

    const membership = await prisma.member
      .findUnique({ where: { userId: userIdString } })
      .membership();

    const subscription = membership.stripeSubscriptionId;

    if (!subscription) {
      throw new Error("Stripe Subscription Id not found");
    }
    console.log("Subscription Id found");

    const deleted = await stripe.subscriptions.del(subscription);
    console.log("Subscription cancelled.");

    const updateStatus = await prisma.membership.update({
      where: { stripeSubscriptionId: subscription },
      data: { status: "CANCELLED" },
    });

    console.log("Member subscription status updated");

    res.end(`Subscription: ${subscription} successfully cancelled`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
});
