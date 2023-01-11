// /graphql/context.ts
import { PrismaClient } from '@prisma/client';
import { Claims } from '@auth0/nextjs-auth0';

export type Context = {
  user?: Claims;
  accessToken?: string;
  prisma: PrismaClient;
};
