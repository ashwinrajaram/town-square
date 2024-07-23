import { prisma } from '../utils/prismaClient.js';
import withRetry from '../utils/withRetry.js';



const postResolvers = {
    Query: {
        posts: async (_, { skip, take }) => {
            return withRetry(async () => {
                try {
                    await prisma.$connect();
                    const [posts, totalCount] = await Promise.all([
                        prisma.post.findMany({
                            orderBy: { order: 'asc' },
                            skip,
                            take
                        }),
                        prisma.post.count()
                    ]);
                    return {
                        posts,
                        totalCount
                    };
                } catch (error) {
                    console.error('Error fetching posts:', error);
                    throw new Error('Failed to fetch posts');
                } finally {
                    await prisma.$disconnect();
                }
            });
        }
    },
    Mutation: {
        updatePostOrders: async (_, { postOrders, skip, take }) => {
            return withRetry(async () => {
                try {
                    await prisma.$connect();
                    await prisma.$transaction(async (prisma) => {
                        const updatePromises = postOrders.map(({ id, order }) =>
                            prisma.post.update({
                                where: { id },
                                data: { order },
                            })
                        );

                        await Promise.all(updatePromises);
                    });

                    const [updatedPosts, totalCount] = await Promise.all([
                        prisma.post.findMany({
                            orderBy: { order: 'asc' },
                            skip,
                            take
                        }),
                        prisma.post.count()
                    ]);

                    return {
                        posts: updatedPosts,
                        totalCount
                    };
                } catch (error) {
                    console.error('Error updating post orders:', error);
                    throw new Error('Failed to update post orders');
                } finally {
                    await prisma.$disconnect();
                }
            });
        }
    }
};

export default postResolvers;
