import { PrismaClient } from '@prisma/client';

// reuse the client for non production
export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
    // log: ['query', 'info', 'warn', 'error'],
})

export const closeClients = async () => {
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
};