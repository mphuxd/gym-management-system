// /graphql/schema.ts
import { join } from "path";
import * as types from "./types";
import { GraphQLScalarType } from "graphql";
import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, makeSchema } from "nexus";

const dateTimeScalar = new GraphQLScalarType(DateTimeResolver);

export const schema = makeSchema({
  //an array which will include all of the different object types.
  types: [types, asNexusMethod(dateTimeScalar, "datetime")],
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
