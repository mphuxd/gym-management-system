import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  booleanArg,
  inputObjectType,
  arg,
} from "nexus";

export const Member = objectType({
  name: "Member",
  definition(t) {
    t.string("id");
    t.string("userId");
    t.string("firstName");
    t.string("middleName");
    t.string("lastName");
    t.string("image");
    t.boolean("gender");
    t.string("birthday");
    t.string("notes");
    t.field("membership", {
      type: "Membership",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.member
          .findUnique({
            where: { id: _parent.id },
          })
          .membership();
      },
    });
    t.string("membershipId");
    t.field("user", {
      type: "User",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.member
          .findUnique({
            where: { id: _parent.id },
          })
          .user();
      },
    });
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
    t.datetime("updatedAt");
  },
});

export const CreateMemberMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createMember", {
      type: Member,
      args: {
        userId: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        middleName: stringArg(),
        lastName: nonNull(stringArg()),
        image: stringArg(),
        gender: booleanArg(),
        birthday: nonNull(stringArg()),
        notes: stringArg(),
        membership: arg({ type: nonNull(MembershipCreateInput) }),
        contact: arg({ type: nonNull(ContactCreateInput) }),
      },

      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        const newMember = {
          userId: args.userId,
          firstName: args.firstName,
          middleName: args.middleName,
          lastName: args.lastName,
          image: args.image,
          gender: args.gender,
          birthday: args.birthday,
          notes: args.notes,
          membership: args.membership,
          contact: args.contact,
        };

        return await ctx.prisma.member.create({
          data: newMember,
        });
      },
    });
  },
});

const MembershipCreateInput = inputObjectType({
  name: "MembershipCreateInput",
  definition(t) {
    t.string("id");
    t.datetime("signUpDate");
    t.string("signUpLocation");
    t.string("signedUpBy");
    t.string("membershipEnds");
    t.field("status", { type: "Status" });
    t.field("plan", { type: MembershipPlanCreateInput });
    t.field("member", { type: MemberCreateInput });
    t.string("membershipPlanId");
  },
});

const ContactCreateInput = inputObjectType({
  name: "ContactCreateInput",
  definition(t) {
    t.string("id");
    t.string("streetAddress");
    t.string("city");
    t.string("state");
    t.string("zipcode");
    t.string("country");
    t.string("phoneNumber");
    t.string("email");
    t.field("member", { type: MemberCreateInput });
  },
});

const MembershipPlanCreateInput = inputObjectType({
  name: "MembershipPlanCreateInput",
  definition(t) {
    t.string("planName");
    t.int("planId");
    t.int("monthlyFee");
    t.int("annualFee");
    t.field("contractLength", { type: "Length" });
    t.list.field("membership", { type: MembershipCreateInput });
  },
});

const MemberCreateInput = inputObjectType({
  name: "MemberCreateInput",
  definition(t) {
    t.string("id");
    t.string("userId");
    t.string("firstName");
    t.string("middleName");
    t.string("lastName");
    t.string("image");
    t.boolean("gender");
    t.string("birthday");
    t.string("notes");
    t.field("membership", { type: MembershipCreateInput });
    t.string("membershipId");
    t.field("user", { type: UserCreateInput });
    t.field("contact", { type: ContactCreateInput });
    t.string("contactId");
    t.datetime("updatedAt");
  },
});

const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.datetime("emailVerified");
    t.field("role", { type: "Role" });
    t.field("member", { type: MemberCreateInput });
    t.string("memberId");
    t.list.field("sessions", { type: SessionCreateInput });
    t.datetime("updatedAt");
  },
});

const SessionCreateInput = inputObjectType({
  name: "SessionCreateInput",
  definition(t) {
    t.string("id");
    t.string("sessionToken");
    t.datetime("expires");
    t.field("user", { type: UserCreateInput });
    t.string("userId");
  },
});

