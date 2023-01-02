import { objectType, extendType, nonNull, stringArg, inputObjectType } from "nexus";

export const CheckIn = objectType({
  name: "CheckIn",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.datetime("checkInDate");
    t.nonNull.field("member", {
      type: "Member",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.contact
          .findUnique({
            where: { id: _parent.id },
          })
          .member();
      },
    });
    t.nonNull.string("memberId");
  },
});

export const CheckInCreateInput = inputObjectType({
  name: "CheckInCreateInput",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.datetime("checkInDate");
    t.nonNull.field("member", { type: "MemberCreateInput" });
    t.nonNull.string("memberId");
  },
});

export const GetLastCheckinMember = extendType({
  type: "Query",
  definition(t) {
    t.field("lastCheckInMember", {
      type: "Member",
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`);
        }
        const memberId = await (await ctx.prisma.checkIn.findFirst({ take: -1 })).memberId;

        return await ctx.prisma.member.findUnique({ where: { id: memberId } });
      },
    });
  },
});

export const CreateCheckInMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCheckIn", {
      type: CheckIn,
      args: {
        memberId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`);
        }
        const newCheckIn = {
          memberId: args.memberId,
        };
        return await ctx.prisma.checkIn.create({
          data: newCheckIn,
        });
      },
    });
  },
});