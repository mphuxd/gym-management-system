import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST" && webhookSecret) {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }
    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        if (session) {
          try {
            createMember(session);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            if (error! instanceof Error) console.log(error);
            console.log(`❌ Error message: ${errorMessage}`);
            res.status(400).send(`Webhook Error: ${errorMessage}`);
            throw new Error(error);
          }
        }
        res.status(200).json({ message: `New member has been created successfully!` });
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

async function createMember(session) {
  await prisma.member.create({
    data: {
      firstName: session.customer_details.name.split(" ")[0],
      lastName: session.customer_details.name.split(" ")[1],
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
          status: "ACTIVE",
          plan: {
            connect: { planId: Number(session.metadata.planId) },
          },
        },
      },
    },
  });
}

function getEndDate() {
  let date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date
}

export default cors(webhookHandler as any);
