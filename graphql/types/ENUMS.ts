import { enumType } from "nexus";

export const Role = enumType({
  name: "Role",
  members: ["USER", "ADMIN", "EMPLOYEE"],
});

export const Status = enumType({
  name: "Status",
  members: ["INACTIVE", "ACTIVE", "LATE", "CANCELLED", "BANNED"],
});

export const Length = enumType({
  name: "Length",
  members: ["DAY", "MONTH", "YEAR"],
});
