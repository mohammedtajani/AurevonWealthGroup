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
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <ParallaxSection
        className="h-screen min-h-[800px] text-white"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
      >
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-tight"
          >
            Wealth Management <br className="hidden md:block" />
            <span className="text-accent">Redefined for the Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl"
          >
            Aurevon Wealth Group provides premium investment advisory and strategic financial planning for high-net-worth individuals and corporations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Magnetic>
              <Link href="/services" className={buttonVariants({ size: "lg", className: "bg-accent text-primary font-semibold hover:bg-accent/90 h-14 px-8 text-lg w-full sm:w-auto" })}>
                Explore Services
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className={buttonVariants({ size: "lg", variant: "outline", className: "border-white text-primary hover:bg-white hover:text-primary h-14 px-8 text-lg w-full sm:w-auto" })}>
                Contact Us
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Philosophy Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
                Unwavering Commitment to <span className="text-accent">Excellence</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At Aurevon, we believe that true wealth management goes beyond simple asset allocation. It requires a holistic understanding of your life's goals, risk tolerance, and legacy aspirations.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our approach combines rigorous quantitative analysis with deep market insights to construct portfolios that are resilient, diversified, and tailored to your unique needs.
              </p>
              <div className="pt-4">
                <Link href="/about" className={buttonVariants({ variant: "link", className: "text-primary p-0 h-auto font-semibold hover:text-accent group" })}>
                  Read our philosophy <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] w-full">
              <div className="absolute -inset-4 bg-accent/10 rounded-xl -z-10 transform rotate-2"></div>
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                alt="Meeting"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary mb-4">Our Expertise</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive financial solutions designed to help you navigate complex markets with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4 text-accent">
                  <TrendingUp size={24} />
                </div>
                <CardTitle>Investment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Active portfolio management using data-driven strategies to maximize returns while minimizing risk exposure.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4 text-accent">
                  <ShieldCheck size={24} />
                </div>
                <CardTitle>Wealth Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Strategies focused on capital protection, tax optimization, and estate planning to secure your legacy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4 text-accent">
                  <BarChart3 size={24} />
                </div>
                <CardTitle>Corporate Advisory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tailored financial advice for businesses, including merger & acquisition support and treasury management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
