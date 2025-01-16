import db from "./_db.js";

// Data Types: int, float, string, boolean, ID
export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        deleteGame(id: ID!): [Game]
        addGame(game: AddGameInput): Game
    }
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
`

export const resolvers = {
    Query: {
        reviews: () => db.reviews,
        review: (_, args) =>  db.reviews.find(review => review.id === args.id),
        games: () => db.games,
        game: (_, args) => db.games.find(game => game.id === args.id),
        authors: () => db.authors,
        author: (_, args) => db.authors.find(author => author.id === args.id),
    },
    Game: {
        reviews: (parent) => db.reviews.filter(review => review.game_id === parent.id),
    },
    Author: {
        reviews: (parent) => db.reviews.filter(review => review.author_id === parent.id),
    },
    Review: {
        game: (parent) => db.games.find(game => game.id === parent.game_id),
        author: (parent) => db.authors.find(author => author.id === parent.author_id), 
    },
    Mutation: {
        deleteGame: (_, args) => {
            db.games = db.games.filter(game => game.id !== args.id)
            return db.games
        },
        addGame: (_, args) => {
            let game = {...args.game, id: String(db.games.length + 1)}
            db.games.push(game)
            return game
        }
    }
}