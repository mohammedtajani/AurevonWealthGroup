"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { Loader2 } from 'lucide-react';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Generate breadcrumbs from pathname needs to be before session check if used in return? 
    // Actually safe to put these computation after session check or before.
    // Putting it near usage or top level.

    if (!session) return null;

    const breadcrumbs = pathname
        .split('/')
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

    const displayBreadcrumbs = breadcrumbs.length > 1 ? breadcrumbs.slice(1) : ['Overview'];

    return (
        <div className="min-h-screen bg-secondary/30">
            <AdminSidebar />
            <main className="ml-64 min-h-screen flex flex-col">
                <header className="h-16 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-primary">Admin Portal</span>
                        {displayBreadcrumbs.map((crumb, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span>/</span>
                                <span className={index === displayBreadcrumbs.length - 1 ? "text-foreground font-medium" : ""}>
                                    {crumb}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-foreground leading-none">{session.user?.name || 'Admin User'}</p>
                            <p className="text-xs text-muted-foreground">{session.user?.email || 'admin@aurevon.com'}</p>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold border border-accent/20 ring-2 ring-background">
                            {session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                    </div>
                </header>
                <div className="p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedLayout>{children}</ProtectedLayout>
    );
}
