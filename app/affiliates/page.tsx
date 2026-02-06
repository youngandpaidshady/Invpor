"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import {
    DollarSign,
    Users,
    Link as LinkIcon,
    BarChart3,
    ArrowRight,
    Trophy,
    Gift,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const commissionTiers = [
    { tier: "Starter", commission: "15%", referrals: "1-10" },
    { tier: "Pro", commission: "20%", referrals: "11-50" },
    { tier: "Elite", commission: "25%", referrals: "51-100" },
    { tier: "Legend", commission: "30%", referrals: "100+" },
];

export default function AffiliatesPage() {
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
                    background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.1) 0%, transparent 50%)",
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
                        EARN
                    </span>
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs text-white/50 uppercase tracking-[0.2em] font-mono">
                                    <DollarSign className="w-4 h-4 text-[#ff6b35]" />
                                    Partner Program
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-[12vw] lg:text-[6vw] font-black leading-[0.85] tracking-tighter mb-8"
                            >
                                <span className="block">EARN UP TO</span>
                                <span
                                    className="block text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                                        WebkitBackgroundClip: "text",
                                    }}
                                >
                                    30%
                                </span>
                                <span className="block text-5xl lg:text-6xl">COMMISSION</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-lg lg:text-xl text-white/40 max-w-xl leading-relaxed mb-10 font-light"
                            >
                                Join our affiliate program and earn recurring commissions for every trader you refer. Lifetime attribution, weekly payouts.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    href="/signup"
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02]"
                                >
                                    <span className="relative z-10">Become an Affiliate</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { value: "$2.5M+", label: "Paid to affiliates", icon: DollarSign },
                                { value: "500+", label: "Active partners", icon: Users },
                                { value: "Weekly", label: "Payouts", icon: Zap },
                                { value: "Lifetime", label: "Attribution", icon: Trophy },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/10 p-6">
                                    <stat.icon className="w-6 h-6 text-[#ff6b35] mb-4" />
                                    <div className="text-2xl font-mono font-light text-white/90 mb-1">{stat.value}</div>
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

            {/* Commission Tiers */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl lg:text-4xl font-black mb-16 tracking-tight text-center"
                    >
                        COMMISSION<br />
                        <span className="text-[#ff6b35]">TIERS</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {commissionTiers.map((tier, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative bg-white/[0.02] border ${i === 3 ? 'border-[#ff6b35]/50' : 'border-white/10'} p-8 text-center`}
                            >
                                {i === 3 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="px-3 py-1 bg-[#ff6b35] text-white text-xs font-mono uppercase tracking-wider">
                                            Best
                                        </span>
                                    </div>
                                )}
                                <div className="text-xs text-white/30 uppercase tracking-wider font-mono mb-4">{tier.tier}</div>
                                <div className="text-5xl font-black text-[#ff6b35] mb-2">{tier.commission}</div>
                                <div className="text-sm text-white/40 font-mono">{tier.referrals} referrals</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 border-y border-white/10 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl lg:text-4xl font-black mb-16 tracking-tight"
                    >
                        HOW IT<br />
                        <span className="text-[#ff6b35]">WORKS</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                icon: LinkIcon,
                                title: "Get Your Link",
                                description: "Sign up as an affiliate and receive your unique referral link and marketing materials."
                            },
                            {
                                step: "02",
                                icon: Users,
                                title: "Share & Refer",
                                description: "Share your link with your audience. Every purchase through your link is tracked automatically."
                            },
                            {
                                step: "03",
                                icon: DollarSign,
                                title: "Earn Commission",
                                description: "Earn up to 30% commission on every sale. Withdraw weekly via your preferred method."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.02] border border-white/10 p-8 relative"
                            >
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#ff6b35] flex items-center justify-center font-mono font-bold text-sm">
                                    {item.step}
                                </div>
                                <item.icon className="w-10 h-10 text-[#ff6b35] mb-6" />
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-white/40 font-light leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools & Resources */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl lg:text-4xl font-black mb-8 tracking-tight"
                            >
                                PROFESSIONAL<br />
                                <span className="text-[#ff6b35]">TOOLS</span>
                            </motion.h2>
                            <p className="text-lg text-white/40 mb-10 font-light leading-relaxed">
                                Get access to a full suite of marketing materials, real-time analytics, and dedicated support to maximize your earnings.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Real-time dashboard & analytics",
                                    "Custom landing pages",
                                    "Banner & creative assets",
                                    "Dedicated affiliate manager",
                                    "Deep link generator"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/60">
                                        <div className="w-2 h-2 bg-[#ff6b35]" />
                                        <span className="font-mono text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.02] border border-white/10 p-8"
                        >
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                                <BarChart3 className="w-6 h-6 text-[#ff6b35]" />
                                <span className="font-bold">Affiliate Dashboard</span>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 font-mono text-sm">Clicks</span>
                                    <span className="font-mono">12,847</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 font-mono text-sm">Conversions</span>
                                    <span className="font-mono text-emerald-400">847</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 font-mono text-sm">Commission Rate</span>
                                    <span className="font-mono text-[#ff6b35]">25%</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <span className="text-white/60 font-mono text-sm">This Month</span>
                                    <span className="text-2xl font-mono font-bold">$4,235</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative border border-white/10 p-12 lg:p-20 text-center"
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/50 to-transparent" />

                        <Gift className="w-16 h-16 text-[#ff6b35] mx-auto mb-8" />
                        <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                            START EARNING<br />
                            <span className="text-[#ff6b35]">TODAY</span>
                        </h2>
                        <p className="text-lg text-white/40 mb-10 max-w-xl mx-auto font-light">
                            Join hundreds of affiliates earning passive income by promoting the world&apos;s best prop firm.
                        </p>
                        <Link
                            href="/signup"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02]"
                        >
                            <span className="relative z-10">Join Now — It&apos;s Free</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
