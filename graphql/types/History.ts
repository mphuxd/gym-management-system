import { objectType, inputObjectType, extendType, nonNull, stringArg } from "nexus";

export const History = objectType({
  name: "History",
  definition(t) {
    t.string("id");
    t.field("performedBy", {
      type: "User",
      async resolve(parent, _, ctx) {
        return await ctx.prisma.history
          .findUnique({
            where: { id: parent.id },
          })
          .performedBy();
      },
    });
    t.datetime("createdAt");
    t.nonNull.string("description");
    t.nonNull.string("userId");
  },
});

export const GetAllHistory = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("history", {
      type: "History",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.history.findMany({
          include: {
            performedBy: true,
          },
        });
      },
    });
  },
});

export const HistoryCreateInput = inputObjectType({
  name: "HistoryCreateInput",
  definition(t) {
    t.string("id");
    t.field("performedBy", { type: "UserCreateInput" });
    t.datetime("createdAt");
    t.nonNull.string("userId");
    t.nonNull.string("description");
  },
});

export const CreateCheckinMemberHistory = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createHistory", {
      type: "History",
      args: {
        userId: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.history.create({
          data: {
            userId: args.userId,
            description: args.description,
          },
        });
      },
    });
  },
});
