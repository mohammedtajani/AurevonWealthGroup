'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function getPosts() {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true, email: true } } }
    });
}

export async function createPost(formData: FormData) {
    const session = await auth();
    if (!session || !session.user?.email) throw new Error('Unauthorized');

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const status = formData.get('status') as string || 'DRAFT';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const author = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!author) throw new Error('User not found');

    await prisma.post.create({
        data: {
            title,
            content,
            status,
            slug: `${slug}-${Date.now()}`, // Ensure uniqueness
            published: status === 'PUBLISHED',
            authorId: author.id,
        },
    });

    revalidatePath('/admin/posts');
}

export async function updatePost(id: string, formData: FormData) {
    const session = await auth();
    if (!session || !session.user?.email) throw new Error('Unauthorized');

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const status = formData.get('status') as string;

    await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
            status,
            published: status === 'PUBLISHED',
        },
    });

    revalidatePath('/admin/posts');
}

export async function getPost(id: string) {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    return await prisma.post.findUnique({
        where: { id },
    });
}

export async function deletePost(id: string) {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    await prisma.post.delete({ where: { id } });
    revalidatePath('/admin/posts');
}
