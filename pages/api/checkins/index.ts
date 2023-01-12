import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
// eslint-disable-next-line import/extensions
import prisma from '@/lib/prisma';

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { user } = await getSession(req, res);
      if (!user) res.status(401).json({ message: 'Unauthorized' });

      if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ message: 'Method not allowed' });
      }

      const checkins = await prisma.checkIn.findMany({
        include: {
          member: {
            include: {
              contact: true,
              membership: {
                include: {
                  plan: true,
                },
              },
              checkIns: true,
            },
          },
        },
      });

      if (!checkins)
        res
          .status(500)
          .json({ statusCode: 500, message: 'Check ins not found.' });

      res.status(200).json({ statusCode: 200, checkins });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }

    return null;
  }
);
