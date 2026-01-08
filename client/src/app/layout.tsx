import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
});

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Aurevon Wealth Group | Premium Wealth Management',
        template: '%s | Aurevon Wealth Group',
    },
    description: 'Aurevon Wealth Group provides bespoke investment advisory, corporate finance, and wealth preservation strategies for high-net-worth individuals.',
    keywords: ['Wealth Management', 'Investment Advisory', 'Financial Planning', 'India', 'Corporate Finance', 'Aurevon'],
    authors: [{ name: 'Aurevon Wealth Group' }],
    creator: 'Aurevon Wealth Group',
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://aurevon.com',
        title: 'Aurevon Wealth Group',
        description: 'Premium Wealth Management and Investment Advisory.',
        siteName: 'Aurevon Wealth Group',
        images: [
            {
                url: 'https://aurevon.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Aurevon Wealth Group'
            }
        ]
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground font-sans min-h-screen flex flex-col`}>
                <Navbar />
                <main className="flex-1 flex flex-col">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
