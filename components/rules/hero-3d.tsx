"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Globe } from "lucide-react";

export function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    // const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    return (
        <div ref={containerRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden perspective-1000">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 text-center space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-magma/30 bg-magma/10 text-magma text-xs font-mono tracking-widest uppercase mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magma opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-magma"></span>
                    </span>
                    System_Update_2.0
                </div>

                <h1 className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
                    TRADING<br />
                    <span className="text-stroke-magma text-transparent" style={{ WebkitTextStroke: "1px #EA580C" }}>PROTOCOLS</span>
                </h1>

                <div className="flex items-center justify-center gap-8 text-white/40 font-mono text-sm">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>SECURE_ENV</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>LOW_LATENCY</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>GLOBAL_ACCESS</span>
                    </div>
                </div>
            </motion.div>

            {/* Floating 3D Elements */}
            <motion.div
                animate={{
                    rotateY: [0, 360],
                    rotateX: [10, -10, 10],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -z-10 w-[600px] h-[600px] border border-white/5 rounded-full"
            />
            <motion.div
                animate={{
                    rotateY: [360, 0],
                    rotateX: [-10, 10, -10],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -z-10 w-[400px] h-[400px] border border-magma/10 rounded-full"
            />
        </div>
    );
}
