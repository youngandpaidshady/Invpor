"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Target,
  TrendingDown,
  Calendar,
  Globe,
  Ban,
  AlertTriangle,
  Bot,
  FileText,
  ArrowLeft,
  Check,
  X,
  ArrowRight,
  Download,
  Zap,
  Shield,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FloatingParticles, GlowingOrb, Marquee, AnimatedCounter } from "@/components/ui/advanced-effects";

const profitTargets = [
  { phase: "Phase 1", target: 8, suffix: "%", desc: "No time limit", color: "#ff6b35" },
  { phase: "Phase 2", target: 5, suffix: "%", desc: "No time limit", color: "#10b981" },
  { phase: "Funded", target: 0, suffix: "—", desc: "Keep your profits", color: "#3b82f6", noCounter: true },
];

const drawdownRules = [
  { name: "Maximum Drawdown", value: 10, suffix: "%", type: "Trailing", desc: "Cannot exceed 10% of highest equity", color: "#ef4444" },
  { name: "Daily Drawdown", value: 5, suffix: "%", type: "Fixed", desc: "Cannot exceed 5% of starting balance", color: "#f59e0b" },
];

const instruments = [
  { name: "Forex", examples: "EUR/USD, GBP/JPY, USD/CAD", leverage: "1:100", icon: "💱" },
  { name: "Indices", examples: "US30, NAS100, SPX500", leverage: "1:50", icon: "📊" },
  { name: "Commodities", examples: "Gold, Silver, Oil", leverage: "1:50", icon: "🥇" },
  { name: "Crypto", examples: "BTC/USD, ETH/USD", leverage: "1:10", icon: "₿" },
];

const prohibited = [
  { name: "Martingale", desc: "Doubling position size after losses" },
  { name: "Grid Trading", desc: "Opening multiple positions without stop losses" },
  { name: "News Trading", desc: "Entering 2min before/after high-impact news" },
  { name: "Copy Trading", desc: "Copying trades from other prop accounts" },
  { name: "Arbitrage", desc: "Exploiting price differences between brokers" },
  { name: "HFT", desc: "High-frequency trading or tick scalping" },
];

const allowed = [
  { name: "Weekend Holding", desc: "Keep positions open over weekends" },
  { name: "Expert Advisors", desc: "Use your own automated trading bots" },
  { name: "Hedging", desc: "Hedge positions on the same account" },
  { name: "Swing Trading", desc: "Hold positions for days or weeks" },
  { name: "Scalping", desc: "Quick trades with reasonable limits" },
  { name: "Any Indicators", desc: "Use all technical indicators you want" },
];

const marqueeItems = [
  "NO TIME LIMITS",
  "CLEAR RULES",
  "FAIR EVALUATION",
  "TRANSPARENT PROCESS",
  "TRADER-FIRST",
];

export default function RulesPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

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
    <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />
      <FloatingParticles count={15} color="#ff6b35" />

      <GlowingOrb size={400} className="top-20 -right-40" />
      <GlowingOrb size={350} color="#ef4444" className="top-1/2 -left-40" />
      <GlowingOrb size={300} color="#10b981" className="bottom-40 right-1/4" />

      {/* Hero */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 z-10">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
          <span
            className="text-[15vw] font-black text-white/[0.015] leading-none tracking-tighter"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            RULES
          </span>
        </div>

        <motion.div
          style={{ y: headerY }}
          className="container mx-auto px-6 lg:px-12 relative z-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-mono mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-start gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-[#ff6b35]/20 flex items-center justify-center flex-shrink-0"
            >
              <FileText className="w-8 h-8 text-[#ff6b35]" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-6xl font-black tracking-tight"
              >
                TRADING <span className="text-[#ff6b35]">RULES</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/40 font-light text-lg mt-2"
              >
                Clear, fair rules designed for your success
              </motion.p>
            </div>
          </div>

          {/* Download PDF */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:bg-white/5 transition-colors">
              <Download className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-sm font-medium">Download PDF</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Profit Targets */}
      <section className="py-16 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black">PROFIT TARGETS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            {profitTargets.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-white/[0.02] border border-white/10 hover:border-white/20 p-8 text-center transition-all"
              >
                <p className="text-white/40 text-sm mb-3 uppercase tracking-wider">{item.phase}</p>
                <div className="text-5xl lg:text-6xl font-black mb-3" style={{ color: item.color }}>
                  {item.noCounter ? "—" : <AnimatedCounter value={item.target} suffix={item.suffix} duration={1.5} />}
                </div>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Drawdown Rules */}
      <section className="py-16 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black">DRAWDOWN LIMITS</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {drawdownRules.map((rule, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white/[0.02] border p-8 transition-all hover:bg-white/[0.03]"
                style={{ borderColor: `${rule.color}30` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-lg">{rule.name}</p>
                    <p className="text-white/40 text-sm">{rule.type}</p>
                  </div>
                  <div className="text-4xl font-black" style={{ color: rule.color }}>
                    <AnimatedCounter value={rule.value} suffix={rule.suffix} duration={1.5} />
                  </div>
                </div>
                <p className="text-white/40 text-sm">{rule.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-start gap-3 mt-6 p-4 bg-red-500/5 border border-red-500/20 max-w-3xl"
          >
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-white/60 text-sm">
              <strong className="text-red-400">Warning:</strong> Breaching either limit results in immediate account failure. Always use stop losses to protect your account.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Minimum Trading Days */}
      <section className="py-16 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black">MINIMUM TRADING DAYS</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/10 p-8 max-w-xl flex items-center gap-8"
          >
            <div className="text-7xl font-black text-blue-400">
              <AnimatedCounter value={5} duration={1} />
            </div>
            <div>
              <p className="font-bold text-lg mb-2">Days Minimum</p>
              <p className="text-white/40 text-sm">At least one trade per day counts. There is no maximum limit—take as long as you need.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instruments */}
      <section className="py-16 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[#ff6b35]/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-[#ff6b35]" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black">INSTRUMENTS</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
            {instruments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-white/[0.02] border border-white/10 hover:border-[#ff6b35]/30 p-6 transition-all"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-lg mb-1">{item.name}</p>
                <p className="text-white/40 text-xs mb-3">{item.examples}</p>
                <span className="inline-block px-3 py-1 bg-[#ff6b35]/10 text-[#ff6b35] text-sm font-mono">
                  {item.leverage}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee speed={25} className="py-6 border-y border-white/5 bg-white/[0.01]">
        {marqueeItems.map((item, i) => (
          <span key={i} className="text-sm font-bold text-white/20 uppercase tracking-[0.3em] mx-8 flex items-center gap-4">
            <Zap className="w-4 h-4 text-[#ff6b35]" />
            {item}
          </span>
        ))}
      </Marquee>

      {/* Allowed vs Prohibited */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {/* Prohibited */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center">
                  <Ban className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-xl lg:text-2xl font-black">PROHIBITED</h2>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 p-6 space-y-4">
                {prohibited.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-white/40 text-xs">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Allowed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-xl lg:text-2xl font-black">ALLOWED</h2>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 space-y-4">
                {allowed.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-white/40 text-xs">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-12 h-12 text-[#ff6b35] mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-black mb-4">READY TO START?</h2>
            <p className="text-white/40 mb-10 max-w-lg mx-auto">
              Now that you understand the rules, choose your challenge and begin your journey.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#ff6b35] to-[#f7c59f] text-black font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                View Pricing <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
