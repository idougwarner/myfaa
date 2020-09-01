import { ApolloServer } from 'apollo-server-express';

import { schema } from '@server/graphql';
import { createLoaders } from '@server/data-loaders';

export function createApolloServer(context = {}) {
  return new ApolloServer({
    schema,
    debug: true,
    context: {
      loaders: createLoaders(),
      ...context
    }
  });
}
