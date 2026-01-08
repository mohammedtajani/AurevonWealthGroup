import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-12 border-t border-white/10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-display text-accent">Aurevon</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Leading wealth management and investment advisory services tailored for the modern investor.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Company</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
                        <li><Link href="/services" className="hover:text-accent">Services</Link></li>
                        <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Legal</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
                        <li><Link href="/disclaimer" className="hover:text-accent">Disclaimer</Link></li>
                    </ul>
                </div>

                {/* CTA */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Get in Touch</h4>
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">info@aurevon.com</p>
                        <p className="text-sm text-muted-foreground">+91 000 000 0000</p>
                        <Link href="/contact" className={buttonVariants({ variant: "outline", className: "mt-4 border-accent text-accent hover:bg-accent hover:text-white w-full" })}>
                            Schedule Call
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Aurevon Wealth Group. All rights reserved.
            </div>
        </footer>
    );
}
