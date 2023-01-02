import { ApolloServer } from "@apollo/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/graphql/schema";
import prisma from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import NextCors from "nextjs-cors";
import { Context } from "@/graphql/context";

const server = new ApolloServer<Context>({ schema });

const startServer = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
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
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  await startServer(req, res);
}
