import { objectType, inputObjectType } from "nexus";

export const Session = objectType({
  name: "Session",
  definition(t) {
    t.string("id");
    t.string("sessionToken");
    t.datetime("expires");
    t.field("user", { type: "User" });
    t.string("userId");
  },
});

export const SessionCreateInput = inputObjectType({
  name: "SessionCreateInput",
  definition(t) {
    t.string("id");
    t.string("sessionToken");
    t.datetime("expires");
    t.field("user", { type: "UserCreateInput" });
    t.string("userId");
  },
});
