import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getContent } from '@/actions/content-actions';

export const metadata: Metadata = {
    title: 'Contact Us | Aurevon Wealth Group',
    description: 'Get in touch with our advisory team to start your journey towards financial freedom.',
};

export default async function ContactPage() {
    const contactContent = await getContent('contact_us');

    return (
        <div className="w-full overflow-x-hidden">
            <section className="bg-primary text-primary-foreground py-16 md:py-24 relative">
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] -mr-32 -mb-32" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 md:mb-8 leading-tight">Contact <span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-8">Us</span></h1>
                    <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto whitespace-pre-wrap leading-relaxed">
                        {contactContent || "We are here to answer your questions and guide your financial future with precision."}
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary mb-6">Get in Touch</h2>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                Whether you are looking for a comprehensive portfolio review or have specific investment queries, our team is ready to assist you.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <Card className="border-none shadow-premium hover:shadow-premium-hover transition-all duration-300">
                                <CardContent className="flex items-start gap-5 pt-6">
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg mb-1">Headquarters</h4>
                                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">123 Financial District, Tower A<br />Mumbai, Maharashtra 400051</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-premium hover:shadow-premium-hover transition-all duration-300">
                                <CardContent className="flex items-center gap-5 pt-6">
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg mb-1">Phone</h4>
                                        <p className="text-muted-foreground text-sm md:text-base">+91 22 1234 5678</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-premium hover:shadow-premium-hover transition-all duration-300">
                                <CardContent className="flex items-center gap-5 pt-6">
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg mb-1">Email</h4>
                                        <p className="text-muted-foreground text-sm md:text-base">contact@aurevon.com</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-premium border border-gray-100 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-[100px] pointer-events-none" />
                        <h3 className="text-2xl font-bold text-primary mb-8 font-display">Send a Message</h3>
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-semibold text-primary/80">First Name</label>
                                    <Input id="firstName" placeholder="John" className="h-12 bg-gray-50/50" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-semibold text-primary/80">Last Name</label>
                                    <Input id="lastName" placeholder="Doe" className="h-12 bg-gray-50/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-primary/80">Email Address</label>
                                <Input id="email" type="email" placeholder="john@example.com" className="h-12 bg-gray-50/50" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-primary/80">Message</label>
                                <textarea
                                    id="message"
                                    className="flex min-h-[140px] w-full rounded-xl border border-input bg-gray-50/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                                    placeholder="How can our experts help you today?"
                                ></textarea>
                            </div>

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold rounded-xl mt-4 shadow-lg shadow-primary/20">
                                Send Inquiry
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
