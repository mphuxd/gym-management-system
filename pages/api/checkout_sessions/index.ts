import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ message: "Method not allowed" });
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      currency: "USD",
      mode: "subscription",
      metadata: { planId: req.body.planId },
      line_items: [
        {
          price: req.body.lookup_key,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: { allowed_countries: ["US"] },
      allow_promotion_codes: true,
      success_url: `${req.headers.origin}/signup/success/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/signup`,
    };

    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

    res.redirect(303, checkoutSession.url);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
