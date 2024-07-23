
import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { closeClients } from './utils/prismaClient.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: false,
    cache: "bounded",
});


server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

// Handle graceful shutdown
const shutdown = async () => {
    console.log('Shutting down server...');
    await closeClients();
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);