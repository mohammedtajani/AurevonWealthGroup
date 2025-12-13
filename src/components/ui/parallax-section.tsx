"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
    children?: React.ReactNode;
    backgroundImage?: string;
    className?: string;
}

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export default function ParallaxSection({
    children,
    backgroundImage,
    className
}: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });

    // 3 Layers spec: Background (slow), Mid (normal/content), Foreground (fast/floating)
    // We'll apply these to pseudo-elements or children if we had specific content.
    // For this wrapper, we just handle the background parallax.

    const yBg = useParallax(scrollYProgress, 50); // Background moves slower

    return (
        <section ref={ref} className={`relative flex items-center justify-center overflow-hidden ${className}`}>
            {/* Background Layer */}
            {backgroundImage && (
                <motion.div
                    style={{ y: yBg }}
                    className="absolute inset-0 z-0 h-[120%] w-full"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* Overlay for contrast */}
                </motion.div>
            )}

            <div className="relative z-10 container mx-auto px-4">
                {children}
            </div>
        </section>
    );
}
