//trigger stripe event
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  try {
    const { userId } = req.query;
    const userIdString = userId.toString();
    const membership = await prisma.member
      .findUnique({ where: { userId: userIdString } })
      .membership();
    const subscription = membership.stripeSubscriptionId;

    if (!subscription) {
      throw new Error("Subscription Id does not exist");
    } else {
      console.log("Subscription found");
      const deleted = await stripe.subscriptions.del(subscription);
      if (deleted) {
        console.log("Subscription deleted");
        const updateStatus = await prisma.membership.update({
          where: { stripeSubscriptionId: subscription },
          data: { status: "CANCELLED" },
        });
        res.end(`Subscription: ${subscription} successfully deleted`);
      } else {
        console.log("Subscription Not Deleted");
        res.end(`Subscription: ${subscription} was not deleted`);
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
});
