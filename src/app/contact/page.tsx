import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | Aurevon Wealth Group',
    description: 'Get in touch with our advisory team to start your journey towards financial freedom.',
};

export default function ContactPage() {
    return (
        <div className="w-full">
            <section className="bg-primary text-primary-foreground py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Contact Us</h1>
                    <p className="text-lg text-gray-300">We are here to answer your questions and guide your financial future.</p>
                </div>
            </section>

            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold font-display text-primary mb-6">Get in Touch</h2>
                            <p className="text-muted-foreground mb-8">
                                Whether you are looking for a comprehensive portfolio review or have specific investment queries, our team is ready to assist.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-accent mt-1" />
                                <div>
                                    <h4 className="font-semibold text-primary">Headquarters</h4>
                                    <p className="text-muted-foreground">123 Financial District, Tower A<br />Mumbai, Maharashtra 400051</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-accent" />
                                <div>
                                    <h4 className="font-semibold text-primary">Phone</h4>
                                    <p className="text-muted-foreground">+91 22 1234 5678</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-accent" />
                                <div>
                                    <h4 className="font-semibold text-primary">Email</h4>
                                    <p className="text-muted-foreground">contact@aurevon.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-primary mb-6">Send a Message</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea
                                    id="message"
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                                Submit Inquiry
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
