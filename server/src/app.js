
import { ApolloServer } from 'apollo-server';
// const { startStandaloneServer } = require('apollo-server-standalone');
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { context } from './context.js';

// async function startServer() {
//     const server = new ApolloServer({
//         typeDefs,
//         resolvers,
//     });

//     const { url } = await startStandaloneServer(server, {
//         listen: { port: 4000 },
//     });

//     console.log(`🚀 Server ready at: ${url}`);
// }

// startServer();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => context
});


server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
