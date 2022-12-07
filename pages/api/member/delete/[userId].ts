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
    const member = await prisma.member.findUnique({ where: { userId: userIdString } });
    const membership = await prisma.member
      .findUnique({ where: { userId: userIdString } })
      .membership();

    if (!member) {
      throw new Error("Member not found.");
    }
    console.log("Member found");

    const membershipIsExpired = checkMembershipIsExpired(membership.membershipEnds);

    if (!membershipIsExpired) {
      res.status(200).json({
        statusCode: 200,
        message: `Member: ${userIdString} was not deleted. Cannot delete member with an active membership. Cancel the membership and wait until it ends before deleting a member.`,
      });
    } else {
      const deleted = await prisma.member.delete({ where: { userId: userIdString } });
      if (deleted) {
        console.log("Member deleted");
        res
          .status(200)
          .json({ statusCode: 200, message: `Member: ${userIdString} was successfully deleted` });
      } else {
        console.log("Member Not Deleted");
        res
          .status(200)
          .json({ statusCode: 200, message: `Member: ${userIdString} was not deleted` });
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
});

function checkMembershipIsExpired(memberEndDate) {
  let currDate = new Date();
  const currDateString = currDate.toDateString();
  //check if membership is expired. returns false if still active
  return currDateString > memberEndDate;
}

//edit schema so deleting member deletes all related models contacts & memberships
