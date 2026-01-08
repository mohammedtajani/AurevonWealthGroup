import { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, ShieldCheck, BarChart3, PieChart, Users, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Our Services | Aurevon Wealth Group',
    description: 'Explore our comprehensive wealth management, investment advisory, and corporate financial services.',
};

const services = [
    {
        title: 'Investment Management',
        description: 'Active portfolio management utilizing data-driven strategies to maximize returns while strictly adhering to your bespoke risk parameters.',
        icon: TrendingUp
    },
    {
        title: 'Wealth Preservation',
        description: 'Holistic strategies focused on capital protection, tax efficiency, and estate planning to secure your family legacy for generations.',
        icon: ShieldCheck
    },
    {
        title: 'Corporate Advisory',
        description: 'Strategic financial advice for businesses, including merger & acquisition support, capital raising, and institutional treasury.',
        icon: BarChart3
    },
    {
        title: 'Retirement Planning',
        description: 'Customized roadmaps ensuring long-term financial independence and lifestyle continuity throughout your post-retirement years.',
        icon: PieChart
    },
    {
        title: 'Family Office Services',
        description: 'Bespoke solutions for ultra-high-net-worth families, covering philanthropy, governance, and intergenerational wealth transfer.',
        icon: Users
    },
    {
        title: 'Global Markets Access',
        description: 'Diversify your wealth globally with direct access to international equity, debt, and exclusive alternative investment markets.',
        icon: Globe
    }
];

export default function ServicesPage() {
    return (
        <div className="w-full overflow-hidden">
            {/* Header */}
            <section className="bg-primary text-primary-foreground py-16 md:py-24 relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">Our <span className="text-accent">Services</span></h1>
                    <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Excellence across the financial spectrum, tailored precisely to your unique ambitions and future vision.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="border-none shadow-premium hover:shadow-premium-hover transition-all duration-500 hover:-translate-y-2 group group-hover:bg-primary/5">
                                <CardHeader className="pb-4">
                                    <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                                        <service.icon size={28} />
                                    </div>
                                    <CardTitle className="text-2xl font-display text-primary">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
