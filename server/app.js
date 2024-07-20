//app.js

const { ApolloServer, gql } = require('apollo-server');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
// const { gql } = require('apollo-server');
const port = 8080


const server = new ApolloServer({ typeDefs, resolvers });


server
    .listen({ port })
    .then(({ url }) => console.log(`Server running at ${url}`));