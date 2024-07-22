import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "",
        },
    },
    log: ['query', 'info', 'warn', 'error'],
    // connectionLimit: 20,
})

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
        posts: async () => {
            return withRetry(async () => {
                try {
                    await prisma.$connect()
                    const posts = await prisma.post.findMany({
                        orderBy: { order: 'asc' }
                    })
                    return posts
                } catch (error) {
                    console.error('Error fetching posts:', error)
                    throw new Error('Failed to fetch posts')
                } finally {
                    await prisma.$disconnect()
                }
            })
        }
    },
    Mutation: {
        updatePostOrders: async (_, { postOrders }) => {
            console.log(postOrders);

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

                const updatedPosts = await prisma.post.findMany({
                    orderBy: { order: 'asc' }
                });

                console.log(updatedPosts);
                return updatedPosts;
            } catch (error) {
                console.error('Error updating post orders:', error);
                throw new Error('Failed to update post orders');
            }
        }
    },
}

export default postResolvers