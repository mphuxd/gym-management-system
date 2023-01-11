import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
// eslint-disable-next-line import/extensions
import prisma from '@/lib/prisma';

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { user } = await getSession(req, res);
      if (!user) res.status(401).json({ message: 'Unauthorized' });

      const history = await prisma.checkIn.findMany({
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

      if (!history)
        res
          .status(500)
          .json({ statusCode: 500, message: 'History not found.' });

      res.status(200).json({ statusCode: 200, history });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  }
);
