import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";

let schemaWithResolvers = loadSchemaSync(
    process.cwd() + "/src/schema/schema.graphql", {
    loaders: [new GraphQLFileLoader()],
}
);


schemaWithResolvers = addResolversToSchema({
    schema: schemaWithResolvers,
    resolvers: resolvers
});

export const schema = schemaWithResolvers;