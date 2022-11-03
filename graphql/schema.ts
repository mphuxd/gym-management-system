// /graphql/schema.ts
import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types";

import { asNexusMethod } from "nexus";
import { DateTimeResolver } from "graphql-scalars";

const DateTime = asNexusMethod(DateTimeResolver, "datetime");
export default DateTime;


export const schema = makeSchema({
  //an array which will include all of the different object types.
  types: [types, DateTime],
  outputs: {
    //types will be generated in a file located in the node_modules directory
    typegen: join(process.cwd(), "node_modules", "@types", "nexus-typegen", "index.d.ts"),
    //schema will be generated in the /graphql directory.
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts"),
  },
});
