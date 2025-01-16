import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Types
import { typeDefs, resolvers } from "./schema.js";

//Server setup
const server = new ApolloServer({
    // typeDefs -- definitions of types of data
    typeDefs,
    // Resolvers -- functions that return data for each type
    resolvers
})

const { url } = await startStandaloneServer(server, {
    port: 4000,
});

console.log(`🚀 Server ready at ${url}`);
