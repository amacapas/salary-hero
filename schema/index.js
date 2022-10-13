import { GraphQLSchema, GraphQLObjectType } from "graphql";
import queries from "./queries/index.js";
import mutations from "./mutations/index.js";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      ...queries,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      ...mutations,
    }),
  }),
});

export default schema;
