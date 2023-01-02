import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user } = await getSession(req, res);
    if (!user) res.status(401).json({ message: "Unauthorized" });

    const { subscriptionId } = req.query;
    const subscriptionIdString = subscriptionId.toString();
    const subscription = await stripe.subscriptions.retrieve(subscriptionIdString);

    res.status(200).json({ statusCode: 200, subscriptionId: subscriptionIdString, subscription });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
});
