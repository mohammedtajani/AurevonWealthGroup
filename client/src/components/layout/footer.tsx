import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-16 md:py-24 border-t border-white/5 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-display text-accent tracking-tight">Aurevon</h3>
                        <p className="text-base text-gray-400 leading-relaxed max-w-xs">
                            Leading wealth management and investment advisory services tailored for the modern institutional and private investor.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white font-display">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
                            <li><Link href="/blog" className="hover:text-accent transition-colors">Insights</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white font-display">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Charter</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-accent transition-colors">Risk Disclaimer</Link></li>
                            <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Business</Link></li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold mb-4 text-white font-display">Consult an Expert</h4>
                        <div className="space-y-3">
                            <p className="text-sm text-gray-400">advisory@aurevon.com</p>
                            <p className="text-sm text-gray-400">+91 22 1234 5678</p>
                            <Link href="/contact" className={buttonVariants({ variant: "default", className: "mt-4 bg-accent hover:bg-accent/90 text-white w-full h-12 rounded-xl font-bold transition-all shadow-lg shadow-accent/20" })}>
                                Schedule Call
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} Aurevon Wealth Group. Global Asset Management.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-accent transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-accent transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-accent transition-colors">Bloomberg</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
