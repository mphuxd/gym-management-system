// pages/api/auth/hook
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, username, secret } = req.body;

  if (req.method !== "POST") {
    return res.status(403).json({ message: "Method not allowed" });
  }

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret` });
  }

  if (email && username) {
    await prisma.user.create({
      data: { email, username },
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export default handler;

// Migrates select data from AUTH0 to our DB on user sign up.
// Validates the request is a POST request
// Validates the AUTH0_HOOK_SECRET from the request body is correct
// Validates that an email was provided in the request body
// Once a user signs up to your application, the user's information will be synced to the database
