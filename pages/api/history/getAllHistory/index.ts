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

    const history = await prisma.history.findMany();
    res.status(200).json({ statusCode: 200, history: history });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
});

// @@@ Unused. Delete or implement display user action history.
