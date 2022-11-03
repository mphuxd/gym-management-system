import { objectType } from "nexus";

export const Membership = objectType({
  name: "Membership",
  definition(t) {
    t.string("id");
    t.datetime("signUpDate");
    t.string("signUpLocation");
    t.string("signedUpBy");
    t.string("membershipEnds");
    t.field("status", { type: "Status" });
    t.field("plan", {
      type: "MembershipPlan",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.membership
          .findUnique({
            where: { id: _parent.id },
          })
          .plan();
      },
    });
    t.field("member", {
      type: "Member",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.membership
          .findUnique({
            where: { id: _parent.id },
          })
          .member();
      },
    });
    t.string("membershipPlanId");
  },
});
