import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  if (req.method === "POST") {
    try {
      console.log(req.body);

      const membership = await prisma.membership.findUnique({
        where: {
          customerId: req.body.customerId,
        },
        include: {
          member: true,
        },
      });

      res.redirect(303, `${req.headers.origin}/members/details/${membership.member.id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
});
