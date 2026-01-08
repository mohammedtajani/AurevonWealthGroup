module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/client/src/actions/investor-workflow.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4006c7ec037c5d76359a1b61eddf554335d09cb129":"approveInvestor","40153de3690f4dae6302f08242581475b8d7a6615b":"registerInvestor","402c1cfcf1267a80e353a6ebd19d78f54baed183eb":"rejectInvestor"},"",""] */ __turbopack_context__.s([
    "approveInvestor",
    ()=>approveInvestor,
    "registerInvestor",
    ()=>registerInvestor,
    "rejectInvestor",
    ()=>rejectInvestor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// Helper to generate random password locally
function generateRandomPassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    for(let i = 0, n = charset.length; i < length; ++i){
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
async function registerInvestor(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const value = formData.get("investmentValue");
    try {
        await prisma.investor.create({
            data: {
                name,
                email,
                investmentValue: value,
                status: "Pending"
            }
        });
        return {
            success: true
        };
    } catch (error) {
        console.error("Registration failed:", error);
        return {
            success: false,
            error: "Registration failed. Email might already be in use."
        };
    }
}
async function approveInvestor(investorId) {
    try {
        // 1. Fetch Investor
        const investor = await prisma.investor.findUnique({
            where: {
                id: investorId
            }
        });
        if (!investor) throw new Error("Investor not found");
        // 2. Generate Credentials
        const password = generateRandomPassword();
        const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hash(password, 10);
        // 3. Create User Account
        const user = await prisma.user.create({
            data: {
                name: investor.name,
                email: investor.email,
                password: hashedPassword,
                role: "INVESTOR"
            }
        });
        // 4. Update Investor Record
        await prisma.investor.update({
            where: {
                id: investorId
            },
            data: {
                status: "Active",
                userId: user.id
            }
        });
        // 5. Simulate Email Sending
        console.log("---------------------------------------------------");
        console.log(`📧 EMAIL SENT TO: ${investor.email}`);
        console.log(`Subject: Welcome to Aurevon Wealth Group`);
        console.log(`Message: Your account has been approved.`);
        console.log(`Username: ${investor.email}`);
        console.log(`Password: ${password}`);
        console.log("---------------------------------------------------");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/investors");
        return {
            success: true,
            password
        }; // Return password to show in admin UI if needed (optional)
    } catch (error) {
        console.error("Approval failed:", error);
        return {
            success: false,
            error: "Failed to approve investor."
        };
    }
}
async function rejectInvestor(investorId) {
    try {
        await prisma.investor.update({
            where: {
                id: investorId
            },
            data: {
                status: "Rejected"
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/investors");
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to reject investor."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    registerInvestor,
    approveInvestor,
    rejectInvestor
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerInvestor, "40153de3690f4dae6302f08242581475b8d7a6615b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(approveInvestor, "4006c7ec037c5d76359a1b61eddf554335d09cb129", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(rejectInvestor, "402c1cfcf1267a80e353a6ebd19d78f54baed183eb", null);
}),
"[project]/client/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/client/src/actions/investor-workflow.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$actions$2f$investor$2d$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/actions/investor-workflow.ts [app-rsc] (ecmascript)");
;
}),
"[project]/client/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/client/src/actions/investor-workflow.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40153de3690f4dae6302f08242581475b8d7a6615b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$actions$2f$investor$2d$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerInvestor"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$client$2f$src$2f$actions$2f$investor$2d$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/client/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => "[project]/client/src/actions/investor-workflow.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$actions$2f$investor$2d$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/actions/investor-workflow.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__beca4c4f._.js.map