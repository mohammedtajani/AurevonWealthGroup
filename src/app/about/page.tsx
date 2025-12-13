import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'About Us | Aurevon Wealth Group',
    description: 'Learn about our history, our values, and the expert team dedicated to managing and growing your wealth.',
};

export default function AboutPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-primary text-primary-foreground py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">About Aurevon</h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Driven by integrity, insight, and a relentless pursuit of financial excellence.
                    </p>
                </div>
            </section>

            {/* Story / Values */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-8 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            Founded with a vision to bring institutional-grade investment strategies to private clients, Aurevon Wealth Group has established itself as a beacon of trust and expertise in the financial landscape.
                        </p>
                        <p>
                            Our philosophy is simple: we put our clients first. By operating as a fiduciary, we ensure that every decision we make is aligned with your best interests, free from conflicts of interest often found in traditional banking.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        <Card className="text-center p-6 border-t-4 border-t-accent shadow-md">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-primary mb-3">Integrity</h3>
                                <p className="text-sm text-muted-foreground">We hold ourselves to the highest ethical standards in every interaction.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-6 border-t-4 border-t-accent shadow-md">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-primary mb-3">Innovation</h3>
                                <p className="text-sm text-muted-foreground">Leveraging technology and data to uncover unique market opportunities.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-6 border-t-4 border-t-accent shadow-md">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-primary mb-3">Transparency</h3>
                                <p className="text-sm text-muted-foreground">Clear communication about fees, strategies, and performance.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
