// /graphql/types/User.ts
import { objectType, extendType, inputObjectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.datetime("emailVerified");
    t.field("role", { type: "Role" });
    t.field("member", {
      type: "Member",
      async resolve(parent, _, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .member();
      },
    });
    t.string("memberId");
    t.list.field("sessions", { type: "Session" });
    t.datetime("updatedAt");
    t.list.field("history", {
      type: "History",
      async resolve(parent, _, ctx) {
        return await ctx.prisma.history.findMany({
          where: { userId: parent.id },
        });
      },
    });
    t.field("notes", {
      type: "Notes",
      async resolve(parent, _, ctx) {
        return await ctx.prisma.notes.findUnique({
          where: { userId: parent.id },
        });
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user.findMany();
      },
    });
  },
});

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.datetime("emailVerified");
    t.field("role", { type: "Role" });
    t.field("member", { type: "MemberCreateInput" });
    t.string("memberId");
    t.list.field("sessions", { type: "SessionCreateInput" });
    t.datetime("updatedAt");
    t.list.field("history", { type: "HistoryCreateInput" });
    t.list.field("notes", { type: "NotesCreateInput" });
  },
});
