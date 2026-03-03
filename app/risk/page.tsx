"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, TrendingDown, DollarSign, Clock, Brain } from "lucide-react";
import { useState, useEffect } from "react";

const riskFactors = [
  {
    icon: TrendingDown,
    title: "Market Volatility",
    description: "Financial markets can experience sudden and extreme price movements that may result in significant losses.",
  },
  {
    icon: DollarSign,
    title: "Leverage Risk",
    description: "Trading with leverage magnifies both potential profits and potential losses. You could lose more than your initial investment.",
  },
  {
    icon: Clock,
    title: "Time Sensitivity",
    description: "Market conditions can change rapidly. Positions held overnight or over weekends carry additional gap risk.",
  },
  {
    icon: Brain,
    title: "Psychological Factors",
    description: "Emotional decision-making, overconfidence, and fear can lead to poor trading decisions and losses.",
  },
];

const sections = [
  {
    title: "1. General Risk Warning",
    content: `Trading foreign exchange (Forex), contracts for difference (CFDs), and other financial instruments carries a high level of risk and may not be suitable for all investors. The possibility exists that you could sustain a loss of some or all of your initial investment. You should not invest money that you cannot afford to lose.`,
  },
  {
    title: "2. Nature of Our Services",
    content: `BraxleyNevim provides evaluation programs and funded trading accounts. During the evaluation phase, you trade on simulated accounts with no real money at risk. However, the skills and habits developed during evaluation will be applied to live trading, where real capital is involved.`,
  },
  {
    title: "3. No Guaranteed Returns",
    content: `Past performance is not indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those discussed on our website or marketing materials. Trading results vary, and most retail traders lose money.`,
  },
  {
    title: "4. External Factors",
    content: `Trading performance can be affected by numerous factors beyond your control, including economic announcements, geopolitical events, natural disasters, and technical failures. Markets can become illiquid, spreads can widen, and execution may be delayed.`,
  },
  {
    title: "5. Technology Risks",
    content: `Online trading involves technology risks including internet connectivity issues, hardware failures, software bugs, and cyberattacks. We cannot guarantee uninterrupted access to our platforms or execute trades at your desired prices.`,
  },
  {
    title: "6. Regulatory Environment",
    content: `Financial regulations vary by jurisdiction and may change over time. Changes in regulations could affect your ability to trade certain instruments, access certain markets, or receive profits. It is your responsibility to ensure compliance with local laws.`,
  },
  {
    title: "7. Tax Implications",
    content: `Trading profits may be subject to taxation in your jurisdiction. You are solely responsible for determining and paying any applicable taxes. We recommend consulting with a qualified tax professional in your area.`,
  },
  {
    title: "8. Seek Independent Advice",
    content: `The information provided by BraxleyNevim is for educational purposes only and should not be considered financial advice. Before engaging in trading, we strongly recommend seeking advice from a qualified financial advisor who can assess your individual circumstances.`,
  },
];

export default function RiskPage() {
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

      {/* Light leak */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(255,107,53,0.08) 0%, transparent 50%)",
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 z-10">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
          <span
            className="text-[12vw] font-black text-white/[0.015] leading-none tracking-tighter"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            RISK
          </span>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-mono mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-black tracking-tight"
              >
                RISK DISCLOSURE
              </motion.h1>
              <p className="text-white/40 font-mono text-sm mt-1">Last updated: January 15, 2025</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl bg-red-500/5 border border-red-500/20 p-6"
          >
            <p className="text-white/80 font-medium leading-relaxed">
              <strong>Important:</strong> Trading involves substantial risk of loss. You should carefully consider whether trading is appropriate for you given your financial situation. Most retail traders lose money.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Risk Factors Grid */}
      <section className="py-12 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-black mb-8 text-center">KEY RISK FACTORS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {riskFactors.map((factor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/10 p-6 text-center"
              >
                <factor.icon className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <h3 className="font-bold text-sm mb-2">{factor.title}</h3>
                <p className="text-white/40 text-xs font-light">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-l-2 border-red-500/30 pl-6"
              >
                <h2 className="text-xl font-bold mb-3 text-white">{section.title}</h2>
                <p className="text-white/50 font-light leading-relaxed text-sm">{section.content}</p>
              </motion.div>
            ))}

            {/* Acknowledgment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/10 p-6 mt-12"
            >
              <h3 className="font-bold mb-3">Acknowledgment</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                By using BraxleyNevim&apos;s services, you acknowledge that you have read and understood this Risk Disclosure, and you accept all risks associated with trading financial instruments.
              </p>
            </motion.div>

            {/* Related Links */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
              <Link href="/terms" className="text-[#ff6b35] hover:underline text-sm font-mono">Terms of Service →</Link>
              <Link href="/rules" className="text-[#ff6b35] hover:underline text-sm font-mono">Trading Rules →</Link>
              <Link href="/contact" className="text-[#ff6b35] hover:underline text-sm font-mono">Contact Support →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
