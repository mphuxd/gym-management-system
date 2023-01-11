// /graphql/schema.ts
import { join } from 'path';
import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod, makeSchema } from 'nexus';
// eslint-disable-next-line import/extensions
import * as types from './types';

const dateTimeScalar = new GraphQLScalarType(DateTimeResolver);
// const DateTime = asNexusMethod(dateTimeScalar, "datetime");

export const schema = makeSchema({
  // an array which will include all of the different object types.
  types: [asNexusMethod(dateTimeScalar, 'datetime'), types],
  outputs: {
    // types will be generated in a file located in the node_modules directory
    typegen: join(
      process.cwd(),
      'node_modules',
      '@types',
      'nexus-typegen',
      'index.d.ts'
    ),
    // schema will be generated in the /graphql directory.
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  // import the exported Context type, defined in /graphql/context.ts file.
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
});
