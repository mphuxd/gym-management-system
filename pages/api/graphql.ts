import Cors from "micro-cors";
import { ApolloServer } from "@apollo/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/graphql/schema";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { Claims, getSession } from "@auth0/nextjs-auth0";

const cors = Cors();

export type Context = {
  user?: Claims;
  accessToken?: string;
  prisma: PrismaClient;
};

const server = new ApolloServer<Context>({ schema });

export default cors(
  startServerAndCreateNextHandler(server, {
    context: async (req: NextApiRequest, res: NextApiResponse) => {
      const session = getSession(req, res);
      if (!session) {
        return { prisma };
      }
      const { user, accessToken } = session;
      return {
        user,
        accessToken,
        prisma,
      };
    },
  })
);
