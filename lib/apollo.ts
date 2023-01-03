// /lib/apollo.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  //graphql endpoint
  uri: "/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Contact: {
        keyFields: ["id"],
      },
      Membership: {
        keyFields: ["id"],
      },
      MembershipPlan: {
        keyFields: ["id"],
      },
    },
  }),
});

export default apolloClient;
