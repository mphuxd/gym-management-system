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

      const membership = await prisma.membership.findUnique({
        where: {
          customerId: req.body.customerId,
        },
        include: {
          member: true,
        },
      });

      res.redirect(
        303,
        `${req.headers.origin}/members/details/${membership.member.id}`
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
    return null;
  }
);

// @@@ Delete - unused API endpoint
