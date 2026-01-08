"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { registerInvestor } from '@/actions/investor-workflow';
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");

        const res = await registerInvestor(formData);

        if (res.success) {
            setSuccess(true);
        } else {
            setError(res.error || "Something went wrong.");
        }
        setLoading(false);
    }

    if (success) {
        return (
            <div className="min-h-[100svh] bg-background flex items-center justify-center p-4 md:p-8">
                <Card className="max-w-md w-full text-center p-8 md:p-10 border-none shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500" />
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                    </div>
                    <CardHeader className="px-0">
                        <CardTitle className="text-3xl font-display text-primary">Application Received</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-base text-muted-foreground mb-8 leading-relaxed">
                        Thank you for your interest in Aurevon Wealth Group. Our advisory committee is reviewing your application for exclusivity.
                        Login credentials will be dispatched to your email upon approval.
                    </CardDescription>
                    <Link href="/" className="inline-flex items-center justify-center rounded-xl text-lg font-bold transition-all bg-primary text-white hover:bg-primary/90 h-14 px-8 w-full shadow-lg shadow-primary/20">
                        Return to Home
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[100svh] bg-gray-50/50 flex flex-col items-center justify-center p-4 md:p-8">
            <Link href="/" className="mb-8 flex items-center gap-2 text-primary/60 hover:text-primary transition-colors group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-semibold uppercase tracking-wider">Back to website</span>
            </Link>

            <Card className="max-w-lg w-full border-none shadow-2xl overflow-hidden rounded-3xl">
                <div className="bg-primary p-8 text-center relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[120px] pointer-events-none" />
                    <h1 className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-3">Premium Access</h1>
                    <CardTitle className="text-3xl md:text-4xl font-display text-white mb-2">Investor Registration</CardTitle>
                    <CardDescription className="text-gray-400 max-w-[280px] mx-auto">
                        Initiate your journey with our exclusive global network of sophisticated investors.
                    </CardDescription>
                </div>

                <CardContent className="p-8 md:p-10 bg-white">
                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-bold text-primary/80 uppercase tracking-wide">Full Name</label>
                            <Input id="name" name="name" placeholder="Johnathan Doe" required className="h-14 border-gray-200 focus:border-accent focus:ring-accent rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold text-primary/80 uppercase tracking-wide">Email Address</label>
                            <Input id="email" name="email" type="email" placeholder="john@aurevon.luxury" required className="h-14 border-gray-200 focus:border-accent focus:ring-accent rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="investmentValue" className="text-sm font-bold text-primary/80 uppercase tracking-wide">Investment Capability (USD)</label>
                            <Input id="investmentValue" name="investmentValue" type="number" placeholder="500000" required className="h-14 border-gray-200 focus:border-accent focus:ring-accent rounded-xl" />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 rounded-xl text-sm text-red-600 font-medium border border-red-100 italic">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold rounded-xl shadow-xl shadow-primary/20 transition-all border-none" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Synchronizing...
                                </>
                            ) : (
                                "Request Invitation"
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest leading-loose">
                            By joining, you agree to our <br />
                            <Link href="/privacy" className="text-accent font-bold hover:underline">Privacy Charter</Link> and <Link href="/disclaimer" className="text-accent font-bold hover:underline">Investment Terms</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
