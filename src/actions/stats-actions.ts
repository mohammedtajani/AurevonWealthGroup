'use server';

import { prisma } from '@/lib/prisma';

export async function getDashboardStats() {
    try {
        const [investorCount, userCount, postCount] = await prisma.$transaction([
            prisma.investor.count(),
            prisma.user.count(),
            prisma.post.count(),
        ]);

        return {
            investorCount,
            userCount,
            postCount,
            // Example: Calculate growth or other metrics here
            growth: '+12%', // placeholder
        };
    } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
        return {
            investorCount: 0,
            userCount: 0,
            postCount: 0,
            growth: '0%',
        };
    }
}
