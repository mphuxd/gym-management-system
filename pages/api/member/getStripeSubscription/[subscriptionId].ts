//trigger stripe event
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { subscriptionId } = req.query;
    const subscriptionIdString = subscriptionId.toString();
    const subscription = await stripe.subscriptions.retrieve(subscriptionIdString);
    res.status(200).json({ statusCode: 200, subscriptionId: subscriptionIdString, subscription });
  } catch (err) {
    console.log(err);
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
