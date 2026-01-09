"use client";

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, TrendingUp } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Magnetic from '@/components/ui/magnetic';
import ParallaxSection from '@/components/ui/parallax-section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <ParallaxSection
        className="h-[100svh] min-h-[600px] text-white"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
      >
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight leading-tight"
          >
            Wealth Management <br className="hidden md:block" />
            <span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-8">Redefined</span> for the Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-xl text-gray-200 max-w-2xl"
          >
            Aurevon Wealth Group provides premium investment advisory and strategic financial planning for high-net-worth individuals and corporations worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Magnetic>
              <Link href="/services" className={buttonVariants({ size: "lg", className: "bg-accent text-primary font-semibold hover:bg-accent/90 h-14 px-8 text-lg w-full sm:w-auto" })}>
                Explore Services
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className={buttonVariants({ size: "lg", variant: "outline", className: "border-white text-white bg-transparent hover:bg-white hover:text-primary h-14 px-8 text-lg w-full sm:w-auto backdrop-blur-sm" })}>
                Contact Us
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-primary leading-tight">
                Unwavering Commitment <br className="hidden lg:block" /> to <span className="text-accent">Excellence</span>
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  At Aurevon, we believe that true wealth management goes beyond simple asset allocation. It requires a holistic understanding of your life's goals, risk tolerance, and legacy aspirations.
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Our approach combines rigorous quantitative analysis with deep market insights to construct portfolios that are resilient, diversified, and tailored to your unique needs.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/about" className={buttonVariants({ variant: "link", className: "text-primary p-0 h-auto font-semibold hover:text-accent group text-lg" })}>
                  Read our philosophy <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full order-1 md:order-2">
              <div className="absolute -inset-4 bg-accent/10 rounded-xl -z-10 transform rotate-2 md:rotate-3"></div>
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                alt="Bespoke Meeting"
                fill
                className="rounded-lg shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
        {/* Decorative background element for premium feel on mobile */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary mb-4">Our Expertise</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Comprehensive financial solutions designed to help you navigate complex markets with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <TrendingUp size={28} />
                </div>
                <CardTitle className="text-xl md:text-2xl">Investment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Active portfolio management using data-driven strategies to maximize returns while minimizing risk exposure in volatile markets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 group md:translate-y-4">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <ShieldCheck size={28} />
                </div>
                <CardTitle className="text-xl md:text-2xl">Wealth Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Strategies focused on capital protection, tax optimization, and estate planning to secure your legacy for generations to come.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <BarChart3 size={28} />
                </div>
                <CardTitle className="text-xl md:text-2xl">Corporate Advisory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Tailored financial advice for businesses, including merger & acquisition support and institutional treasury management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
