'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials. Please contact support if this persists.');
            } else {
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Side - Visual & Brand */}
            <div className="hidden lg:flex w-1/2 relative bg-primary text-primary-foreground flex-col justify-between p-12">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                        alt="Background"
                        fill
                        className="object-cover opacity-20 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/95" />
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center text-accent hover:text-accent/80 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl font-display font-bold mb-6">Administrator Portal</h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Secure access for Aurevon Wealth Group advisors and managers. Monitor portfolio performance, manage investor relations, and access proprietary analytics.
                        </p>
                    </motion.div>
                </div>

                <div className="relative z-10 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Aurevon Wealth Group. Confidential.
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-sm space-y-8"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-display font-bold text-foreground">Welcome Back</h2>
                        <p className="mt-2 text-muted-foreground">Please sign in to your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground" htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@aurevon.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 border-input/50 focus:border-accent transition-colors bg-white/50 backdrop-blur-sm"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-11 border-input/50 focus:border-accent transition-colors bg-white/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-sm text-red-600 dark:text-red-400"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-base font-medium"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
