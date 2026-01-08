import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { getContent } from '@/actions/content-actions';

export const metadata: Metadata = {
    title: 'About Us | Aurevon Wealth Group',
    description: 'Learn about our history, our values, and the expert team dedicated to managing and growing your wealth.',
};

export default async function AboutPage() {
    const aboutContent = await getContent('about_us');

    return (
        <div className="w-full overflow-hidden">
            {/* Header */}
            <section className="bg-primary text-primary-foreground py-16 md:py-24 relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent rounded-full blur-[100px] -mr-64 -mt-64" />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 md:mb-8 leading-tight">About <span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-8">Aurevon</span></h1>
                    <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto whitespace-pre-wrap leading-relaxed">
                        {aboutContent || "Driven by integrity, insight, and a relentless pursuit of financial excellence for our distinguished clientele."}
                    </p>
                </div>
            </section>

            {/* Story / Values */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 text-base md:text-lg text-muted-foreground leading-relaxed">
                        <p>
                            Founded with a vision to bring institutional-grade investment strategies to private clients, Aurevon Wealth Group has established itself as a beacon of trust and expertise in the financial landscape.
                        </p>
                        <p>
                            Our philosophy is simple: we put our clients first. By operating as a fiduciary, we ensure that every decision we make is aligned with your best interests, free from conflicts of interest often found in traditional banking.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-20">
                        <Card className="text-center p-6 border-none shadow-premium hover:shadow-premium-hover transition-all duration-300 group">
                            <div className="w-1.5 h-12 bg-accent absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                            <CardContent className="pt-6">
                                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display">Integrity</h3>
                                <p className="text-sm md:text-base text-muted-foreground">We hold ourselves to the highest ethical standards in every interaction, ensuring absolute trust.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-6 border-none shadow-premium hover:shadow-premium-hover transition-all duration-300 group">
                            <div className="w-1.5 h-12 bg-accent absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                            <CardContent className="pt-6">
                                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display">Innovation</h3>
                                <p className="text-sm md:text-base text-muted-foreground">Leveraging advanced technology and proprietary data to uncover unique market opportunities.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-6 border-none shadow-premium hover:shadow-premium-hover transition-all duration-300 group sm:col-span-2 md:col-span-1">
                            <div className="w-1.5 h-12 bg-accent absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                            <CardContent className="pt-6">
                                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display">Transparency</h3>
                                <p className="text-sm md:text-base text-muted-foreground">Unwavering clarity in communication regarding fees, strategies, and performance reporting.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
