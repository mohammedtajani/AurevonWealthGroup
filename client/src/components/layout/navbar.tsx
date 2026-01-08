"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b",
                scrolled
                    ? "bg-primary/95 backdrop-blur-md py-3 border-white/10 shadow-lg"
                    : "bg-transparent py-5 border-transparent"
            )}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter font-display uppercase text-accent z-50">
                    Aurevon
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Magnetic key={item.name}>
                            <Link
                                href={item.href}
                                className="text-sm font-medium text-white/80 transition-colors hover:text-accent"
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
                    className="md:hidden relative z-50 p-2 text-white hover:text-accent transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isOpen ? "close" : "open"}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-full sm:w-[350px] bg-primary z-40 md:hidden flex flex-col shadow-2xl"
                        >
                            <div className="flex flex-col h-full pt-24 px-8 pb-12">
                                <div className="space-y-6 flex-1">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className="text-3xl font-display font-bold text-white hover:text-accent transition-colors flex items-center justify-between group"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                                <motion.span
                                                    className="w-10 h-[1px] bg-accent origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                                />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-8 border-t border-white/10"
                                >
                                    <Link
                                        href="/login"
                                        className={cn(
                                            buttonVariants({ variant: "outline", size: "lg" }),
                                            "w-full border-accent text-accent hover:bg-accent hover:text-white text-xl py-6"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Client Login
                                    </Link>
                                    <p className="text-muted-foreground text-center mt-8 text-sm">
                                        &copy; {new Date().getFullYear()} Aurevon Wealth Group
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
