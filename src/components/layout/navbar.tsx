"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";
import { Button, buttonVariants } from "@/components/ui/button";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" }, // Implied from "Investment Advisory"
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-primary/95 backdrop-blur-sm text-primary-foreground">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter font-display uppercase text-accent">
                    Aurevon
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Magnetic key={item.name}>
                            <Link
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-accent"
                            >
                                {item.name}
                            </Link>
                        </Magnetic>
                    ))}
                    <Magnetic>
                        <Link href="/login" className={buttonVariants({ variant: "outline", className: "ml-4 border-accent text-accent hover:bg-accent hover:text-white" })}>
                            Client Login
                        </Link>
                    </Magnetic>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-primary-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-primary border-t border-white/10">
                    <div className="flex flex-col space-y-4 p-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-lg font-medium text-white hover:text-accent"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link href="/login" className={buttonVariants({ variant: "outline", className: "w-full border-accent text-accent" })}>
                            Client Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
