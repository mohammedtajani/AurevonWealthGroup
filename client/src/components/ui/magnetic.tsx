"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    // Motion values for x and y
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth movement (Magnetic effect spec: ease=0.12 roughly maps to these spring settings)
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        // Center of the element
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Distance from center
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Spec: "Follow cursor within 150px radius, max translateX/Y = 18px"
        // We dampen the movement by a factor (e.g., / 5) to keep it subtle
        // and clamp it if needed, but the natural dampen usually works well.
        // Let's explicitly check radius if strict adherence is needed, 
        // or just apply the force field globally on hover. 
        // The snippet implies "follow cursor *within* radius", so we verify distance.

        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 150) {
            // Max translation 18px
            const maxTrans = 18;
            const moveX = (distanceX / 150) * maxTrans; // Linear mapping for simplicity
            const moveY = (distanceY / 150) * maxTrans;

            x.set(moveX);
            y.set(moveY);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-block" // Ensure it wraps content tightly
            whileHover={{ scale: 1.03 }} // Spec: scale up to 1.03 on hover
        >
            {children}
        </motion.div>
    );
}
