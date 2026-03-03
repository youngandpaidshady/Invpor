"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/sections/pricing-section";
import { ComparisonTable } from "@/components/comparison-table";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import { Trophy, Target, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ChallengesPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Film grain overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            <Navbar />

            {/* Light leaks */}
            <div
                className="fixed top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse at 50% 10%, rgba(199,162,87,0.1) 0%, transparent 50%)",
                    transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                }}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 z-10">
                {/* Massive background text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
                    <span
                        className="text-[18vw] font-black text-white/[0.015] leading-none tracking-tighter"
                        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                    >
                        FUNDED
                    </span>
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs text-white/50 uppercase tracking-[0.2em] font-mono">
                            <Trophy className="w-4 h-4 text-[#C7A257]" />
                            Choose Your Path
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8"
                    >
                        <span className="block">PROVE YOUR</span>
                        <span
                            className="block text-transparent bg-clip-text"
                            style={{
                                backgroundImage: "linear-gradient(135deg, #C7A257 0%, #F0D78C 50%, #C7A257 100%)",
                                WebkitBackgroundClip: "text",
                            }}
                        >
                            SKILLS
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg lg:text-xl text-white/40 max-w-2xl mx-auto mb-16 font-light leading-relaxed"
                    >
                        Select the evaluation model that fits your trading style. From our classic 2-Step challenge to Instant Funding.
                    </motion.p>

                    {/* Challenge Types */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            {
                                icon: Target,
                                title: "2-Step",
                                desc: "The industry standard. Show consistency over two phases.",
                                color: "#3b82f6",
                                popular: false
                            },
                            {
                                icon: Zap,
                                title: "1-Step",
                                desc: "Fast-track your funding with a single evaluation phase.",
                                color: "#C7A257",
                                popular: true
                            },
                            {
                                icon: Trophy,
                                title: "Instant",
                                desc: "Skip the evaluation and start earning immediately.",
                                color: "#a855f7",
                                popular: false
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className={`relative p-8 bg-white/[0.02] border ${feature.popular ? 'border-[#C7A257]/50' : 'border-white/10'} hover:border-white/20 transition-all group`}
                            >
                                {feature.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="px-3 py-1 bg-[#C7A257] text-white text-xs font-mono uppercase tracking-wider">
                                            Popular
                                        </span>
                                    </div>
                                )}
                                <feature.icon
                                    className="w-10 h-10 mb-4 mx-auto transition-transform group-hover:scale-110"
                                    style={{ color: feature.color }}
                                />
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-sm text-white/40 font-light">{feature.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-12"
                    >
                        <Link
                            href="/pricing"
                            className="shimmer-button inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C7A257] text-black text-sm font-bold font-mono uppercase tracking-[0.15em] rounded-lg shadow-[0_0_20px_rgba(199,162,87,0.2)] hover:shadow-[0_0_30px_rgba(199,162,87,0.4)] transition-all active:scale-95"
                        >
                            <span className="relative z-10">Get Funded</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
            </section>

            {/* Stats */}
            <section className="border-b border-white/10 py-16 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-4 gap-8 text-center">
                        {[
                            { value: "90%", label: "Profit Split" },
                            { value: "$200K", label: "Max Funding" },
                            { value: "24H", label: "Payout Speed" },
                            { value: "47", label: "Funded Today" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl lg:text-5xl font-mono font-light text-white/90 mb-1">{stat.value}</div>
                                <div className="text-xs text-white/30 uppercase tracking-wider font-mono">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <PricingSection />
            <ComparisonTable />
            <FAQSection />
            <CTASection />

            <Footer />
        </main>
    );
}
