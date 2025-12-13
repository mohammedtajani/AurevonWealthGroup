import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@aurevon.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log('Seed successful: ', { user });

    const posts = [
        {
            title: 'Global Market Outlook Q4 2025',
            slug: 'global-market-outlook-q4-2025',
            status: 'PUBLISHED',
            content: 'The global markets are showing resilience despite inflationary pressures. Our analysts predict a steady growth in emerging sectors...',
            published: true,
        },
        {
            title: 'Understanding High-Yield Bonds',
            slug: 'understanding-high-yield-bonds',
            status: 'DRAFT',
            content: 'High-yield bonds offer attractive returns but come with increased risk. In this guide, we break down the fundamentals...',
            published: false,
        },
        {
            title: 'Tax Strategies for the New Fiscal Year',
            slug: 'tax-strategies-new-fiscal-year',
            status: 'PUBLISHED',
            content: 'Optimizing your tax liability is crucial for wealth preservation. Here are five strategies to consider before the year ends...',
            published: true,
        },
        {
            title: 'Tech Sector: Bubble or Boom?',
            slug: 'tech-sector-bubble-or-boom',
            status: 'DRAFT',
            content: 'With AI driving the latest rally, many investors are asking if valuations are sustainable. We verify the underlying metrics...',
            published: false,
        },
        {
            title: 'Why Diversification Matters',
            slug: 'why-diversification-matters',
            status: 'PUBLISHED',
            content: 'Putting all your eggs in one basket is never a good idea. Learn how distinct asset classes correlate during market downturns...',
            published: true,
        },
    ];

    for (const post of posts) {
        await prisma.post.upsert({
            where: { slug: post.slug },
            update: {},
            create: {
                ...post,
                authorId: user.id,
            },
        });
    }

    console.log(`Seeded ${posts.length} posts.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
