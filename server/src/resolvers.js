import postResolvers from './resolvers/post.js';

const resolvers = {
    Query: {
        ...postResolvers.Query,
    },
    Mutation: {
        ...postResolvers.Mutation,
    },
};

export default resolvers;