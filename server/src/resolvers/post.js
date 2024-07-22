import { generateMockPosts } from "../../../client/src/utils/mockData.js";



const postResolvers = {
    Query: {
        posts: async (_, __, { prisma }) => {
            return await prisma.post.findMany();
        }
    },
    Mutation: {
        updatePostOrders: (_, { postOrders }) => {

            console.log(postOrders);

            // Presist in DB
            postOrders.forEach(({ id, order }) => {
                console.log(id, order);
                const post = posts.find((post) => post.id === id);

                if (post) {
                    post.order = order;
                }
            });

            posts.sort((a, b) => a.order - b.order);
            return posts;
        }
    },
};

export default postResolvers;