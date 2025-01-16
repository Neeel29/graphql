import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//Database
import db from "./_db.js";

// Types
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        reviews: () => db.reviews,
        review: (_, args, context, info) => {
            return db.reviews.find(review => review.id === args.id);
        },
        games: () => db.games,
        game: (_, args, context, info) => {
            return db.games.find(game => game.id === args.id);
        },
        authors: () => db.authors,
        author: (_, args, context, info) => {
            return db.authors.find(author => author.id === args.id);
        },
    },
}

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
