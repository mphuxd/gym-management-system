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

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ message: "Method not allowed" });
    }

    const {
      id,
      userId,
      firstName,
      lastName,
      notes,
      email,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipcode,
    } = req.body;

    const member = await prisma.member.update({
      where: { id: id },
      data: {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        notes: notes,
        contact: {
          update: {
            email: email,
            phoneNumber: phoneNumber,
            streetAddress: streetAddress,
            city: city,
            state: state,
            zipcode: zipcode,
          },
        },
      },
      include: {
        membership: {
          include: { plan: true },
        },
        contact: true,
        checkIns: true,
      },
    });

    console.log(member);
    res.status(200).json({ statusCode: 200, member: member });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
});
