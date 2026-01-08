"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getContent(key: string) {
    try {
        const content = await prisma.siteContent.findUnique({
            where: { key },
        });
        return content?.content || "";
    } catch (error) {
        console.error("Error fetching site content:", error);
        return "";
    }
}

export async function updateContent(key: string, content: string) {
    try {
        await prisma.siteContent.upsert({
            where: { key },
            update: { content },
            create: { key, content },
        });
        revalidatePath("/admin/content");
        revalidatePath("/about"); // Revalidate client pages
        revalidatePath("/contact");
        return { success: true };
    } catch (error) {
        console.error("Error updating site content:", error);
        return { success: false, error: "Failed to update content" };
    }
}
