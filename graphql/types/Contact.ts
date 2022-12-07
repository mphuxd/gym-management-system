import { objectType, inputObjectType } from "nexus";

export const Contact = objectType({
  name: "Contact",
  definition(t) {
    t.string("id");
    t.string("streetAddress");
    t.string("city");
    t.string("state");
    t.string("zipcode");
    t.string("country");
    t.string("phoneNumber");
    t.string("email");
    t.field("member", {
      type: "Member",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.contact
          .findUnique({
            where: { id: _parent.id },
          })
          .member();
      },
    });
  },
});

export const ContactCreateInput = inputObjectType({
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
    t.field("member", { type: "MemberCreateInput" });
  },
});
