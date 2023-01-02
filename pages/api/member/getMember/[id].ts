import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "@/lib/prisma";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user } = await getSession(req, res);
    if (!user) res.status(401).json({ message: "Unauthorized" });

    const { id } = req.query;
    const idString = id.toString();
    const member = await prisma.member.findUnique({
      where: { id: idString },
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
});
