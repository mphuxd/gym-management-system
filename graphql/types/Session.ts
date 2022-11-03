import { objectType } from "nexus";

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
