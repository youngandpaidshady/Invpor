"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/sections/cta-section";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ChevronRight, Trophy, Users, Zap, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const scalingTiers = [
    {
        level: 1,
        balance: "$10,000",
        requirement: "10% profit",
        profitSplit: "80%",
        active: true
    },
    {
        level: 2,
        balance: "$25,000",
        requirement: "10% profit",
        profitSplit: "85%",
        active: false
    },
    {
        level: 3,
        balance: "$50,000",
        requirement: "10% profit",
        profitSplit: "85%",
        active: false
    },
    {
        level: 4,
        balance: "$100,000",
        requirement: "10% profit",
        profitSplit: "90%",
        active: false
    },
    {
        level: 5,
        balance: "$200,000",
        requirement: "10% profit",
        profitSplit: "90%",
        active: false
    },
];

export default function ScalingPage() {
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
                className="fixed top-0 right-0 w-[60%] h-[50%] pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.08) 0%, transparent 50%)",
                    transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                }}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 z-10">
                {/* Massive background text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
                    <span
                        className="text-[20vw] font-black text-white/[0.015] leading-none tracking-tighter"
                        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                    >
                        SCALE
                    </span>
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs text-white/50 uppercase tracking-[0.2em] font-mono">
                                <TrendingUp className="w-4 h-4 text-[#ff6b35]" />
                                Growth System
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8"
                        >
                            <span className="block">GROW YOUR</span>
                            <span
                                className="block text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                                    WebkitBackgroundClip: "text",
                                }}
                            >
                                CAPITAL
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg lg:text-xl text-white/40 max-w-xl leading-relaxed mb-10 font-light"
                        >
                            Our scaling program rewards consistent performance. Increase your capital up to $200,000 and unlock profit splits up to 90%.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-6"
                        >
                            {[
                                { value: "$200K", label: "Max Scale" },
                                { value: "90%", label: "Max Split" },
                                { value: "5 Levels", label: "To Climb" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl font-mono font-light text-white/90">{stat.value}</div>
                                    <div className="text-xs text-white/30 uppercase tracking-wider font-mono">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
            </section>

            {/* Scaling Tiers */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl lg:text-4xl font-black mb-16 tracking-tight"
                    >
                        SCALING<br />
                        <span className="text-[#ff6b35]">PROGRESSION</span>
                    </motion.h2>

                    <div className="space-y-4">
                        {scalingTiers.map((tier, index) => (
                            <motion.div
                                key={tier.level}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-white/[0.02] border ${tier.active ? 'border-[#ff6b35]/40' : 'border-white/10'} p-6 lg:p-8 hover:border-white/20 transition-all group`}
                            >
                                {/* Active indicator */}
                                {tier.active && (
                                    <div className="absolute -left-px top-0 bottom-0 w-1 bg-[#ff6b35]" />
                                )}

                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-16 h-16 ${tier.active ? 'bg-[#ff6b35]/20 text-[#ff6b35]' : 'bg-white/5 text-white/40'} font-mono text-2xl font-bold flex items-center justify-center`}>
                                            {tier.level}
                                        </div>
                                        <div>
                                            <div className="text-3xl font-black mb-1">{tier.balance}</div>
                                            <div className="text-sm text-white/40 font-mono">Account Balance</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-8 lg:gap-12">
                                        <div>
                                            <div className="text-xs text-white/30 uppercase tracking-wider font-mono mb-1">Requirement</div>
                                            <div className="text-white/80 font-mono">{tier.requirement}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-white/30 uppercase tracking-wider font-mono mb-1">Profit Split</div>
                                            <div className="text-[#ff6b35] font-mono font-bold">{tier.profitSplit}</div>
                                        </div>
                                        <div className="flex items-center">
                                            {tier.active ? (
                                                <span className="px-4 py-2 bg-[#ff6b35] text-white text-xs font-mono uppercase tracking-wider">
                                                    Current
                                                </span>
                                            ) : (
                                                <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white/40 transition-colors" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 border-y border-white/10 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: DollarSign,
                                title: "Higher Profit Splits",
                                description: "Scale your profit split from 80% to 90% as you level up."
                            },
                            {
                                icon: Trophy,
                                title: "No Limits",
                                description: "Scale as fast as your performance allows. No time restrictions."
                            },
                            {
                                icon: Zap,
                                title: "Automatic Scaling",
                                description: "Reach 10% profit and your account scales automatically."
                            }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.02] border border-white/10 p-8"
                            >
                                <benefit.icon className="w-10 h-10 text-[#ff6b35] mb-6" />
                                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                                <p className="text-white/40 font-light leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl lg:text-4xl font-black mb-16 tracking-tight text-center"
                    >
                        HOW IT<br />
                        <span className="text-[#ff6b35]">WORKS</span>
                    </motion.h2>

                    <div className="max-w-3xl mx-auto space-y-0">
                        {[
                            "Trade consistently and reach 10% profit",
                            "Request a payout at any time during your progress",
                            "Your account balance scales to the next tier automatically",
                            "Enjoy higher profit splits and continue trading"
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-6 py-6 border-b border-white/5 last:border-0"
                            >
                                <div className="w-8 h-8 bg-[#ff6b35]/20 text-[#ff6b35] font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div className="flex items-center gap-3 flex-1">
                                    <p className="text-lg text-white/80 font-light">{step}</p>
                                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/challenges"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02]"
                        >
                            <span className="relative z-10">Start Your Journey</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <CTASection />
            <Footer />
        </main>
    );
}
