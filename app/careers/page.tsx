"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import {
    MapPin,
    Users,
    Sparkles,
    ArrowRight,
    Globe,
    Coffee,
    Zap,
    Heart
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const positions = [
    {
        title: "Senior Full-Stack Engineer",
        department: "Engineering",
        location: "Remote - Global",
        type: "Full-time",
        description: "Build the next generation of trading infrastructure."
    },
    {
        title: "Quantitative Analyst",
        department: "Research",
        location: "London / Remote",
        type: "Full-time",
        description: "Develop and backtest trading strategies."
    },
    {
        title: "Customer Success Lead",
        department: "Operations",
        location: "Remote - Americas",
        type: "Full-time",
        description: "Help funded traders achieve their goals."
    },
    {
        title: "Marketing Manager",
        department: "Growth",
        location: "Remote - Global",
        type: "Full-time",
        description: "Scale our brand and community globally."
    }
];

const perks = [
    { icon: Globe, title: "Remote First", desc: "Work from anywhere in the world" },
    { icon: Coffee, title: "Wellness Budget", desc: "$2,000 annual wellness stipend" },
    { icon: Zap, title: "Latest Tech", desc: "Top-tier equipment and tools" },
    { icon: Heart, title: "Health Coverage", desc: "Comprehensive health benefits" },
];

export default function CareersPage() {
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
                className="fixed top-0 left-0 w-[50%] h-[50%] pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse at 20% 20%, rgba(255,107,53,0.1) 0%, transparent 50%)",
                    transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                }}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 z-10">
                {/* Massive background text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
                    <span
                        className="text-[22vw] font-black text-white/[0.015] leading-none tracking-tighter"
                        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                    >
                        JOIN
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
                                <Users className="w-4 h-4 text-[#ff6b35]" />
                                We&apos;re Hiring
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8"
                        >
                            <span className="block">BUILD THE</span>
                            <span
                                className="block text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                                    WebkitBackgroundClip: "text",
                                }}
                            >
                                FUTURE
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg lg:text-xl text-white/40 max-w-xl leading-relaxed font-light"
                        >
                            We&apos;re building the world&apos;s most trader-centric prop firm. Join our remote-first team and help shape the future of funded trading.
                        </motion.p>
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

            {/* Stats */}
            <section className="border-b border-white/10 py-12 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-4 gap-8 text-center">
                        {[
                            { value: "45+", label: "Team Members" },
                            { value: "12", label: "Countries" },
                            { value: "100%", label: "Remote" },
                            { value: "4", label: "Open Roles" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl lg:text-4xl font-mono font-light text-white/90 mb-1">{stat.value}</div>
                                <div className="text-xs text-white/30 uppercase tracking-wider font-mono">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Perks */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl lg:text-4xl font-black mb-16 tracking-tight"
                    >
                        WHAT WE<br />
                        <span className="text-[#ff6b35]">OFFER</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        {perks.map((perk, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.02] border border-white/10 p-8 hover:border-[#ff6b35]/30 transition-colors"
                            >
                                <perk.icon className="w-10 h-10 text-[#ff6b35] mb-6" />
                                <h3 className="text-lg font-bold mb-2">{perk.title}</h3>
                                <p className="text-sm text-white/40 font-light">{perk.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 border-t border-white/10 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-end justify-between mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl lg:text-4xl font-black tracking-tight"
                        >
                            OPEN<br />
                            <span className="text-[#ff6b35]">POSITIONS</span>
                        </motion.h2>
                        <div className="hidden lg:flex items-center gap-2 text-xs text-white/30 font-mono uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-[#ff6b35]" />
                            {positions.length} roles available
                        </div>
                    </div>

                    <div className="space-y-4">
                        {positions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href="#"
                                    className="group block bg-white/[0.02] border border-white/10 p-6 lg:p-8 hover:border-[#ff6b35]/30 transition-all"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-2 py-1 bg-white/5 text-xs font-mono text-white/50 uppercase tracking-wider">
                                                    {position.department}
                                                </span>
                                                <span className="px-2 py-1 bg-[#ff6b35]/10 text-[#ff6b35] text-xs font-mono uppercase tracking-wider">
                                                    {position.type}
                                                </span>
                                            </div>
                                            <h3 className="text-xl lg:text-2xl font-bold mb-2 group-hover:text-[#ff6b35] transition-colors">
                                                {position.title}
                                            </h3>
                                            <p className="text-white/40 font-light mb-4">{position.description}</p>
                                            <div className="flex items-center gap-2 text-sm text-white/30 font-mono">
                                                <MapPin className="w-4 h-4" />
                                                {position.location}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#ff6b35] font-mono text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                                            Apply <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
                    <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                        DON&apos;T SEE YOUR<br />
                        <span className="text-[#ff6b35]">ROLE?</span>
                    </h2>
                    <p className="text-lg text-white/40 mb-10 font-light">
                        We&apos;re always looking for exceptional talent. Send us your resume and tell us why you&apos;d be a great fit.
                    </p>
                    <a
                        href="mailto:careers@alphatrader.com"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02]"
                    >
                        <span className="relative z-10">Get In Touch</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
