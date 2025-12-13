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
        description: 'Active portfolio management utilizing data-driven strategies to maximize returns while strictly adhering to your risk parameters.',
        icon: TrendingUp
    },
    {
        title: 'Wealth Preservation',
        description: 'Holistic strategies focused on capital protection, tax efficiency, and estate planning to secure your legacy for generations.',
        icon: ShieldCheck
    },
    {
        title: 'Corporate Advisory',
        description: 'Strategic financial advice for businesses, including merger & acquisition support, capital raising, and treasury management.',
        icon: BarChart3
    },
    {
        title: 'Retirement Planning',
        description: 'Customized roadmaps ensuring financial independence and lifestyle continuity post-retirement.',
        icon: PieChart
    },
    {
        title: 'Family Office Services',
        description: 'Bespoke solutions for ultra-high-net-worth families, covering philanthropy, governance, and intergenerational wealth transfer.',
        icon: Users
    },
    {
        title: 'Global Markets Access',
        description: 'Diversify your portfolio with direct access to international equity, debt, and alternative investment markets.',
        icon: Globe
    }
];

export default function ServicesPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-primary text-primary-foreground py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Our Services</h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Expertise across the financial spectrum, tailored to your unique ambitions.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4 text-accent">
                                        <service.icon size={24} />
                                    </div>
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
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
