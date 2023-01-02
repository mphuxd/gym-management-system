import { objectType, extendType, nonNull, stringArg, inputObjectType, mutationField } from "nexus";

export const Member = objectType({
  name: "Member",
  definition(t) {
    t.string("id");
    t.nullable.string("userId");
    t.string("firstName");
    t.nullable.string("middleName");
    t.string("lastName");
    t.nullable.string("image");
    t.nullable.boolean("gender");
    t.nullable.string("birthday");
    t.nullable.string("notes");
    t.nullable.field("membership", {
      type: "Membership",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.member
          .findUnique({
            where: { id: _parent.id },
          })
          .membership();
      },
    });
    t.nullable.string("membershipId");
    t.field("contact", {
      type: "Contact",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.member
          .findUnique({
            where: { id: _parent.id },
          })
          .contact();
      },
    });
    t.string("contactId");
    t.nullable.field("user", {
      type: "User",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.member
          .findUnique({
            where: { id: _parent.id },
          })
          .user();
      },
    });
    t.list.field("CheckIns", {
      type: "CheckIn",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.member
          .findUnique({
            where: { id: _parent.id },
          })
          .checkIns();
      },
    });
    t.datetime("updatedAt");
    t.datetime("createdAt");
  },
});

export const membersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("members", {
      type: "Member",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.member.findMany();
      },
    });
  },
});

export const oneMemberQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("member", {
      type: "Member",
      args: {
        id: stringArg(),
        userId: stringArg(),
        phoneNumber: stringArg(),
        birthday: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        let result = null;

        if (args.id) {
          result = await ctx.prisma.member.findUnique({
            where: { id: args.id },
          });
        }

        if (args.userId) {
          result = await ctx.prisma.member.findUnique({
            where: { userId: args.userId },
          });
        }

        if (args.phoneNumber) {
          result = await ctx.prisma.member.findMany({
            where: {
              contact: {
                phoneNumber: args.phoneNumber,
              },
            },
          });
        }

        if (args.birthday) {
          result = await ctx.prisma.member.findMany({
            where: {
              birthday: args.birthday,
            },
          });
        }

        return result;
      },
    });
  },
});

export const updateMemberDetails = mutationField("updateMember", {
  type: "Member",
  args: {
    // 1
    id: nonNull(stringArg()),
    userId: nonNull(stringArg()),
    firstName: nonNull(stringArg()),
    lastName: nonNull(stringArg()),
    notes: stringArg(),
  },
  async resolve(_parent, args, ctx) {
    let search = await ctx.prisma.member.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!search) {
      throw new Error("Could not find member with id " + args.id);
    }

    const result = await ctx.prisma.member.update({
      where: { id: args.id },
      data: {
        userId: args.userId,
        firstName: args.firstName,
        lastName: args.lastName,
        notes: args.notes,
      },
    });
    return result;
  },
});

export const MemberCreateInput = inputObjectType({
  name: "MemberCreateInput",
  definition(t) {
    t.string("id");
    t.string("userId");
    t.string("firstName");
    t.nullable.string("middleName");
    t.string("lastName");
    t.nullable.string("image");
    t.nullable.boolean("gender");
    t.nullable.string("birthday");
    t.nullable.string("notes");
    t.nullable.field("membership", { type: "MembershipCreateInput" });
    t.string("membershipId");
    t.field("contact", { type: "ContactCreateInput" });
    t.string("contactId");
    t.nullable.field("user", { type: "UserCreateInput" });
    t.nonNull.list.nonNull.field("checkIn", { type: "CheckInCreateInput" });
    t.datetime("updatedAt");
    t.datetime("createdAt");
  },
});
