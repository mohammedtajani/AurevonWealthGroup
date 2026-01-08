'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const InvestorSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    status: z.enum(['Active', 'Pending', 'Inactive']),
    investmentValue: z.string().optional(),
});

export async function getInvestors() {
    try {
        const investors = await prisma.investor.findMany({
            orderBy: { createdAt: 'desc' },
        });
        // Serialize dates if needed, but Server Actions can return JSON serializable data.
        // Prisma dates are objects, Next.js handles them fine usually, but let's be safe if sending to client components directly.
        return investors;
    } catch (error) {
        console.error('Failed to fetch investors:', error);
        throw new Error('Failed to fetch investors');
    }
}

export async function createInvestor(formData: FormData) {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        status: formData.get('status'),
        investmentValue: formData.get('investmentValue'),
    };

    const validatedFields = InvestorSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Investor.',
        };
    }

    const { name, email, status, investmentValue } = validatedFields.data;

    try {
        await prisma.investor.create({
            data: {
                name,
                email,
                // @ts-ignore - Enum mismatch might occur if Zod doesn't perfectly match Prisma generated types yet
                status: status as any,
                investmentValue,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Investor.',
        };
    }

    revalidatePath('/admin/investors');
    return { message: 'Success' };
}

export async function updateInvestor(id: string, formData: FormData) {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        status: formData.get('status'),
        investmentValue: formData.get('investmentValue'),
    };

    const validatedFields = InvestorSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Investor.',
        };
    }

    const { name, email, status, investmentValue } = validatedFields.data;

    try {
        await prisma.investor.update({
            where: { id },
            data: {
                name,
                email,
                status: status as any,
                investmentValue,
            },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Update Investor.' };
    }

    revalidatePath('/admin/investors');
    return { message: 'Updated Investor' };
}

export async function deleteInvestor(id: string) {
    try {
        await prisma.investor.delete({
            where: { id },
        });
        revalidatePath('/admin/investors');
        return { message: 'Deleted Investor' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Investor.' };
    }
}
