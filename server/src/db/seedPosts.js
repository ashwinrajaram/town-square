import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Delete all existing posts
    await prisma.post.deleteMany();

    // Create 20 mock posts
    const posts = Array.from({ length: 20 }).map((_, index) => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
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
