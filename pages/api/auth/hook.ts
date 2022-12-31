import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, username, secret } = req.body;

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ message: "Method not allowed" });
    }

    if (secret !== process.env.AUTH0_HOOK_SECRET) {
      return res.status(403).json({ message: `You must provide the secret` });
    }

    if (email && username) {
      await prisma.user.create({
        data: { email, username },
      });
      return res.status(200).json({
        message: `${username} with email: ${email} has been created successfully!`,
      });
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
};

export default handler;

// Migrates select data from AUTH0 to DB on user sign up.
