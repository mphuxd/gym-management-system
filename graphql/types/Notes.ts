import { objectType, inputObjectType, extendType, nonNull, stringArg } from "nexus";

export const Notes = objectType({
  name: "Notes",
  definition(t) {
    t.string("id");
    t.string("note");
    t.datetime("createdAt");
    t.datetime("updatedAt");
    t.field("updatedBy", {
      type: "User",
      async resolve(parent, _, ctx) {
        return await ctx.prisma.notes
          .findUnique({
            where: { id: parent.id },
          })
          .updatedBy();
      },
    });
    t.string("userId");
  },
});

export const GetNote = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("notes", {
      type: "Notes",
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.notes.findFirst();
      },
    });
  },
});

export const UpdateNote = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateNote", {
      type: "Notes",
      args: {
        id: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        note: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        let search = await ctx.prisma.notes.findUnique({
          where: { id: args.id },
        });

        if (!search) {
          throw new Error("Could not find note");
        }

        const result = await ctx.prisma.notes.update({
          where: { id: args.id },
          data: {
            userId: args.userId,
            note: args.note,
            updatedAt: new Date(),
          },
        });
        return result;
      },
    });
  },
});

export const NotesCreateInput = inputObjectType({
  name: "NotesCreateInput",
  definition(t) {
    t.string("id");
    t.string("note");
    t.datetime("createdAt");
    t.datetime("updatedAt");
    t.field("updatedBy", { type: "UserCreateInput" });
    t.string("userId");
  },
});
