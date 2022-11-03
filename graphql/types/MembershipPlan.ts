import { objectType } from "nexus";

export const MembershipPlan = objectType({
  name: "MembershipPlan",
  definition(t) {
    t.string("id");
    t.string("planName");
    t.int("planId");
    t.int("annualFee");
    t.int("monthlyFee");
    t.field("contractLength", { type: "Length" });
    t.list.field("membership", {
      type: "Membership",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.membershipPlan
          .findUnique({
            where: { id: _parent.id },
          })
          .membership();
      },
    });
  },
});
