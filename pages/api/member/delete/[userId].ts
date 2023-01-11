/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
// eslint-disable-next-line import/extensions
import prisma from '@/lib/prisma';

function checkMembershipIsExpired(memberEndDate) {
  const currDate = new Date();
  const currDateString = currDate.toDateString();
  return currDateString > memberEndDate;
}

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { user } = await getSession(req, res);
      if (!user) res.status(401).json({ message: 'Unauthorized' });

      const { userId } = req.query;
      const userIdString = userId.toString();

      const member = await prisma.member.findUnique({
        where: { userId: userIdString },
      });

      if (!member) {
        throw new Error('Member not found.');
      }

      const membership = await prisma.member
        .findUnique({ where: { userId: userIdString } })
        .membership();

      if (!membership) {
        throw new Error('Membership not found.');
      }

      const membershipIsExpired = checkMembershipIsExpired(
        membership.membershipEnds
      );

      if (!membershipIsExpired) {
        res.status(403).json({
          statusCode: 403,
          message: `Member: ${userIdString} was not deleted. Cannot delete member with an active membership. Cancel the membership and wait until it ends before deleting a member.`,
        });
      } else {
        const deleted = await prisma.member.delete({
          where: { userId: userIdString },
        });
        if (deleted) {
          console.log('Member deleted');
          res.status(200).json({
            statusCode: 200,
            message: `Member: ${userIdString} was successfully deleted`,
          });
        } else {
          console.log('Member Not Deleted');
          res.status(200).json({
            statusCode: 200,
            message: `Member: ${userIdString} was not deleted`,
          });
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  }
);

// @@@ On delete, delete all related models & stripe data
