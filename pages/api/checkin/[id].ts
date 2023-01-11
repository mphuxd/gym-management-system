import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
// eslint-disable-next-line import/extensions
import prisma from '@/lib/prisma';

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { user } = await getSession(req, res);
      if (!user) res.status(401).json({ message: 'Unauthorized' });

      if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed' });
      }

      const { id } = req.query;
      const idString = id.toString();

      const checkIn = await prisma.checkIn.create({
        data: {
          memberId: idString,
        },
      });

      res.status(200).json({ statusCode: 200, checkIn });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
    return null;
  }
);
