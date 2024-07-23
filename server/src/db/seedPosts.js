import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Delete all existing posts
    await prisma.post.deleteMany();

    // Create mock posts based on length
    const posts = Array.from({ length: 300 }).map((_, index) => ({
        title: faker.word.words(5),
        content: faker.word.words({ count: { min: 6, max: 11 } }),
        order: index + 1,
    }));

    for (const post of posts) {
        await prisma.post.create({
            data: post,
        });
    }

    console.log('Seed data created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
