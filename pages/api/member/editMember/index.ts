import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  if (req.method === "POST") {
    try {
      const input = req.body;

      const member = await prisma.member.update({
        where: { id: input.id },
        data: {
          userId: input.userId,
          firstName: input.firstName,
          lastName: input.lastName,
          notes: input.notes,
        },
        include: {
          membership: {
            include: { plan: true },
          },
          contact: true,
          checkIns: true,
        },
      });

      res.status(200).json({ statusCode: 200, member: member });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
});
