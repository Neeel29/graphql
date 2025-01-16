import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//Server setup
const server = new ApolloServer({
    // typeDefs and resolvers are required
    
})

const { url } = await startStandaloneServer(server, {
    port: 4000,
});

console.log(`🚀 Server ready at ${url}`);
