import { prisma } from '../utils/prismaClient.js'


// move this to utility folder
async function withRetry(operation, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation()
        } catch (error) {
            if (attempt === maxRetries) throw error
            console.warn(`Attempt ${attempt} failed. Retrying...`)
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
        }
    }
}

const postResolvers = {
    Query: {
        posts: async (_, { skip, take }) => {
            return withRetry(async () => {
                try {
                    await prisma.$connect()
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
                    console.error('Error fetching posts:', error)
                    throw new Error('Failed to fetch posts')
                } finally {
                    await prisma.$disconnect()
                }
            })
        }
    },
    //  use With Retry and disconnect client, return paginated posts.
    Mutation: {
        updatePostOrders: async (_, { postOrders, skip, take }) => {
            console.log("request recieved", postOrders);
            try {
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
            }
        }
    }
}

export default postResolvers