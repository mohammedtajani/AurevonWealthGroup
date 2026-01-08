"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { generatePassword } from "@/lib/utils"; // We'll need to create this util or just do it inline

const prisma = new PrismaClient();

// Helper to generate random password
function generateRandomPassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export async function registerInvestor(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const value = formData.get("investmentValue") as string;

    try {
        await prisma.investor.create({
            data: {
                name,
                email,
                investmentValue: value,
                status: "Pending",
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Registration failed:", error);
        return { success: false, error: "Registration failed. Email might already be in use." };
    }
}

export async function approveInvestor(investorId: string) {
    try {
        // 1. Fetch Investor
        const investor = await prisma.investor.findUnique({ where: { id: investorId } });
        if (!investor) throw new Error("Investor not found");

        // 2. Generate Credentials
        const password = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create User Account
        const user = await prisma.user.create({
            data: {
                name: investor.name,
                email: investor.email,
                password: hashedPassword,
                role: "INVESTOR",
            },
        });

        // 4. Update Investor Record
        await prisma.investor.update({
            where: { id: investorId },
            data: {
                status: "Active",
                userId: user.id,
            },
        });

        // 5. Simulate Email Sending
        console.log("---------------------------------------------------");
        console.log(`📧 EMAIL SENT TO: ${investor.email}`);
        console.log(`Subject: Welcome to Aurevon Wealth Group`);
        console.log(`Message: Your account has been approved.`);
        console.log(`Username: ${investor.email}`);
        console.log(`Password: ${password}`);
        console.log("---------------------------------------------------");

        revalidatePath("/admin/investors");
        return { success: true, password }; // Return password to show in admin UI if needed (optional)
    } catch (error) {
        console.error("Approval failed:", error);
        return { success: false, error: "Failed to approve investor." };
    }
}

export async function rejectInvestor(investorId: string) {
    try {
        await prisma.investor.update({
            where: { id: investorId },
            data: { status: "Rejected" },
        });
        revalidatePath("/admin/investors");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to reject investor." };
    }
}
