"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FAQSection } from "@/components/sections/faq-section";
import { motion } from "framer-motion";
import { Search, CreditCard, Terminal, Shield, User, MessageCircle, Mail, FileText, Headphones, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SupportPage() {
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
                className="fixed top-0 right-0 w-[50%] h-[50%] pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.08) 0%, transparent 50%)",
                    transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                }}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 z-10">
                {/* Massive background text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
                    <span
                        className="text-[20vw] font-black text-white/[0.015] leading-none tracking-tighter"
                        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                    >
                        HELP
                    </span>
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-[10vw] lg:text-[6vw] font-black leading-[0.9] tracking-tighter mb-6"
                        >
                            HOW CAN WE<br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                                    WebkitBackgroundClip: "text",
                                }}
                            >
                                HELP YOU?
                            </span>
                        </motion.h1>

                        {/* Search Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative max-w-xl mx-auto"
                        >
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                className="w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/10 text-white text-lg font-mono placeholder:text-white/20 focus:outline-none focus:border-[#ff6b35]/50 transition-all"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Quick Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { icon: CreditCard, label: "Billing" },
                            { icon: Terminal, label: "Platform" },
                            { icon: Shield, label: "Rules" },
                            { icon: User, label: "Account" },
                        ].map((cat, i) => (
                            <button
                                key={i}
                                className="group p-6 bg-white/[0.02] border border-white/10 hover:border-[#ff6b35]/30 transition-all"
                            >
                                <cat.icon className="w-8 h-8 text-white/40 group-hover:text-[#ff6b35] mx-auto mb-3 transition-colors" />
                                <div className="font-mono text-sm uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">{cat.label}</div>
                            </button>
                        ))}
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

            {/* Help Topics */}
            <section className="py-20 container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Getting Started",
                            icon: FileText,
                            items: ["How to start a challenge", "Connecting your account", "Dashboard overview"]
                        },
                        {
                            title: "Trading Rules",
                            icon: Shield,
                            items: ["Drawdown explained", "News trading policy", "Prohibited strategies"]
                        },
                        {
                            title: "Payouts",
                            icon: CreditCard,
                            items: ["Withdrawal methods", "Payout schedule", "Certificate of earnings"]
                        }
                    ].map((section, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.02] border border-white/10 p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center">
                                    <section.icon className="w-5 h-5 text-[#ff6b35]" />
                                </div>
                                <h3 className="font-bold text-lg">{section.title}</h3>
                            </div>
                            <ul className="space-y-4">
                                {section.items.map((item, j) => (
                                    <li key={j}>
                                        <Link href="#" className="flex items-center justify-between text-white/50 hover:text-[#ff6b35] transition-colors border-b border-white/5 pb-3 last:border-0 last:pb-0 group">
                                            <span className="text-sm font-mono">{item}</span>
                                            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-y border-white/10 py-12 relative z-10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        {[
                            { value: "<2h", label: "Avg Response", icon: Clock },
                            { value: "24/5", label: "Live Support", icon: Headphones },
                            { value: "98%", label: "Satisfaction", icon: Zap },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <stat.icon className="w-6 h-6 text-[#ff6b35] mb-3" />
                                <div className="text-3xl lg:text-4xl font-mono font-light text-white/90 mb-1">{stat.value}</div>
                                <div className="text-xs text-white/30 uppercase tracking-wider font-mono">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection />

            {/* Contact Options */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl">
                    <h2 className="text-4xl lg:text-5xl font-black mb-12 tracking-tight">
                        STILL NEED<br />
                        <span className="text-[#ff6b35]">HELP?</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/[0.02] border border-white/10 p-8 hover:border-[#ff6b35]/20 transition-colors">
                            <MessageCircle className="w-10 h-10 text-[#ff6b35] mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                            <p className="text-white/40 mb-6 font-light">Chat with our support team in real-time. Available 24/5.</p>
                            <button className="group relative w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02]">
                                <span className="relative z-10">Start Chat</span>
                                <div className="absolute inset-0 bg-[#ff6b35] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    Start Chat
                                </span>
                            </button>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 p-8 hover:border-[#ff6b35]/20 transition-colors">
                            <Mail className="w-10 h-10 text-[#ff6b35] mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">Email Support</h3>
                            <p className="text-white/40 mb-6 font-light">Send us a detailed message. We usually reply within 2 hours.</p>
                            <a href="mailto:support@alphatrader.com" className="block w-full py-4 border border-white/10 text-white/60 font-mono text-sm uppercase tracking-wider hover:border-white/20 hover:text-white transition-all text-center">
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
