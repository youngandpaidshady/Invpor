"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import { Shield, Zap, Clock, CreditCard, Check, ArrowRight, ChevronRight } from "lucide-react";

/**
 * Pricing Page — Magma Design System
 * 
 * Editorial layout. Orange accent on black.
 * Clear crypto payment messaging.
 */

const challenges = {
  "2-STEP": {
    tagline: "The classic path",
    desc: "Two phases. Prove consistency twice. Get funded forever.",
    plans: [
      { size: "10K", price: 99, split: 80, hot: true },
      { size: "25K", price: 179, split: 85 },
      { size: "50K", price: 299, split: 85 },
      { size: "100K", price: 499, split: 90 },
      { size: "200K", price: 899, split: 90 },
    ],
    rules: { target1: "8%", target2: "5%", drawdown: "10%" },
  },
  "1-STEP": {
    tagline: "Fast track",
    desc: "One phase. Higher target. Get funded faster.",
    plans: [
      { size: "10K", price: 139, split: 80, hot: true },
      { size: "25K", price: 249, split: 85 },
      { size: "50K", price: 399, split: 85 },
      { size: "100K", price: 699, split: 90 },
    ],
    rules: { target1: "10%", target2: "—", drawdown: "8%" },
  },
  INSTANT: {
    tagline: "No evaluation",
    desc: "Skip the test. Start trading today.",
    plans: [
      { size: "10K", price: 349, split: 70 },
      { size: "25K", price: 699, split: 70, hot: true },
      { size: "50K", price: 999, split: 75 },
    ],
    rules: { target1: "—", target2: "—", drawdown: "10%" },
  },
};

type ChallengeType = keyof typeof challenges;

const cryptoCoins = [
  { symbol: "BTC", name: "Bitcoin", color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA" },
  { symbol: "USDT", name: "Tether", color: "#26A17B" },
  { symbol: "USDC", name: "USD Coin", color: "#2775CA" },
  { symbol: "SOL", name: "Solana", color: "#9945FF" },
  { symbol: "LTC", name: "Litecoin", color: "#BFBBBB" },
];

export default function PricingPage() {
  const [selected, setSelected] = useState<ChallengeType>("2-STEP");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  const currentChallenge = challenges[selected];

  return (
    <main ref={containerRef} className="min-h-screen bg-[#09090B] text-white">
      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-pattern opacity-10" />

      {/* Hero */}
      <motion.section
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
      >
        {/* Orange spotlight */}
        <div className="absolute inset-0 magma-spotlight" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="eyebrow">PRICING</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="block font-display text-display-xl font-bold uppercase leading-[0.85] tracking-[-0.03em] text-white">
                Stop paying
              </span>
              <span className="block font-display text-display-xl font-bold uppercase leading-[0.85] tracking-[-0.03em]">
                for <span className="text-[#F97316]">mediocre.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-lg text-[#A1A1AA] max-w-lg leading-relaxed"
            >
              One payment. No subscriptions. No hidden fees.{" "}
              <span className="text-white/70">
                We make money when you make money.
              </span>{" "}
              That&apos;s it.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Challenge Type Selector */}
      <section className="border-y border-[#3F3F46] sticky top-[64px] bg-[#09090B]/95 backdrop-blur-md z-30">
        <div className="container-wide">
          <div className="flex">
            {(Object.keys(challenges) as ChallengeType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelected(type)}
                className={`relative py-6 px-8 text-sm font-medium uppercase tracking-wider transition-colors ${selected === type
                  ? "text-white"
                  : "text-[#71717A] hover:text-[#A1A1AA]"
                  }`}
              >
                {type}
                {selected === type && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F97316]"
                  />
                )}
                {type === "INSTANT" && (
                  <span className="absolute -top-1 -right-1 text-[8px] text-[#F97316] font-bold">
                    NEW
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Info */}
      <section className="py-12 border-b border-[#27272A]">
        <div className="container-wide">
          <div className="flex flex-wrap items-baseline gap-4">
            <span className="text-2xl font-light text-[#3F3F46]">/</span>
            <span className="text-lg text-[#A1A1AA]">
              {currentChallenge.tagline}
            </span>
            <span className="text-sm text-[#71717A] ml-auto">
              {currentChallenge.desc}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          {/* Rules bar */}
          <div className="mb-12 flex flex-wrap gap-8 text-sm">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717A]">
                Target 1
              </span>
              <span className="ml-2 font-bold text-white font-mono">
                {currentChallenge.rules.target1}
              </span>
            </div>
            {currentChallenge.rules.target2 !== "—" && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717A]">
                  Target 2
                </span>
                <span className="ml-2 font-bold text-white font-mono">
                  {currentChallenge.rules.target2}
                </span>
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717A]">
                Max DD
              </span>
              <span className="ml-2 font-bold text-[#F97316] font-mono">
                {currentChallenge.rules.drawdown}
              </span>
            </div>
          </div>

          {/* Plans grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentChallenge.plans.map((plan, i) => (
              <motion.div
                key={plan.size}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredPlan(plan.size)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`group relative flex flex-col p-px transition-all duration-300 ${plan.hot
                  ? "bg-gradient-to-b from-[#F97316] to-[#F97316]/0 shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]"
                  : "bg-[#27272A]"
                  } ${hoveredPlan === plan.size ? "scale-[1.02] z-10" : "z-0"}`}
              >
                <div className="relative flex flex-col h-full bg-[#111113] p-8 overflow-hidden">
                  {/* Background Shine */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-[#F97316]/10 to-transparent opacity-0 transition-opacity duration-300 ${hoveredPlan === plan.size ? "opacity-100" : ""}`} />

                  {/* Hot Badge */}
                  {plan.hot && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-[#F97316] text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-2 font-mono">
                        Account Size
                      </div>
                      <div className={`text-4xl font-display font-bold transition-colors ${hoveredPlan === plan.size ? "text-[#F97316]" : "text-white"}`}>
                        ${plan.size}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-8 flex items-baseline gap-2 pb-6 border-b border-[#27272A]">
                      <span className="text-3xl font-mono text-white tracking-tight">${plan.price}</span>
                      <span className="text-xs text-[#71717A] uppercase tracking-wider">One-time fee</span>
                    </div>

                    {/* Specs */}
                    <div className="space-y-4 mb-8 flex-grow">
                      <div className="flex justify-between items-center group/item hover:bg-[#27272A]/30 p-2 -mx-2 rounded transition-colors">
                        <span className="text-sm text-[#A1A1AA]">Profit Split</span>
                        <span className="font-mono text-white font-bold">{plan.split}%</span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:bg-[#27272A]/30 p-2 -mx-2 rounded transition-colors">
                        <span className="text-sm text-[#A1A1AA]">Leverage</span>
                        <span className="font-mono text-white font-bold">1:100</span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:bg-[#27272A]/30 p-2 -mx-2 rounded transition-colors">
                        <span className="text-sm text-[#A1A1AA]">Platform</span>
                        <span className="font-mono text-white font-bold">dxtrade</span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:bg-[#27272A]/30 p-2 -mx-2 rounded transition-colors">
                        <span className="text-sm text-[#A1A1AA]">Refundable</span>
                        <span className="font-mono text-[#00FF88] font-bold">Yes</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/checkout/${selected.toLowerCase().replace("-", "")}-${plan.size.toLowerCase()}`}
                      className={`w-full py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-all border ${hoveredPlan === plan.size
                        ? "bg-[#F97316] text-black border-[#F97316] shadow-lg shadow-[#F97316]/20"
                        : "bg-transparent text-white border-[#3F3F46] hover:bg-[#27272A]"
                        }`}
                    >
                      <span>Start Challenge</span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${hoveredPlan === plan.size ? "translate-x-1" : ""}`} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accepted Payment Methods */}
      <section className="py-16 bg-[#111113] border-y border-[#3F3F46]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Card Payments */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CreditCard
                  className="w-5 h-5 text-[#F97316]"
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-lg uppercase tracking-wide text-white">
                  Card Payments
                </h3>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Instant processing via Stripe. All major cards accepted.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Visa", "Mastercard", "Amex", "Discover"].map((card) => (
                  <div
                    key={card}
                    className="px-4 py-2 border border-[#27272A] bg-[#09090B] text-xs font-mono text-[#A1A1AA]"
                  >
                    {card}
                  </div>
                ))}
              </div>
            </div>

            {/* Crypto Payments */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Zap
                  className="w-5 h-5 text-[#F97316]"
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-lg uppercase tracking-wide text-white">
                  Crypto Payments
                </h3>
                <span className="badge-success ml-2">5% OFF</span>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Pay with crypto and save 5%. Instant confirmation.
                USDT/USDC accepted on multiple networks.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {cryptoCoins.map((coin) => (
                  <div
                    key={coin.symbol}
                    className="group flex flex-col items-center gap-2 py-3 px-2 border border-[#27272A] bg-[#09090B] hover:border-[#F97316]/30 transition-colors cursor-default"
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center font-mono text-xs font-bold"
                      style={{ color: coin.color }}
                    >
                      {coin.symbol}
                    </div>
                    <span className="text-[9px] text-[#71717A] group-hover:text-[#A1A1AA] transition-colors uppercase tracking-wider">
                      {coin.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-[#71717A] uppercase tracking-wider">
                <span>ERC-20</span>
                <span className="text-[#3F3F46]">•</span>
                <span>TRC-20</span>
                <span className="text-[#3F3F46]">•</span>
                <span>SOL Network</span>
                <span className="text-[#3F3F46]">•</span>
                <span>BTC Network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 border-b border-[#27272A]">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow mb-8">Why us</p>

            <div className="space-y-8">
              <div className="border-l-2 border-[#F97316] pl-6">
                <p className="text-2xl font-light text-white/90 leading-relaxed">
                  &ldquo;What&apos;s the catch?&rdquo;
                </p>
                <p className="mt-3 text-[#A1A1AA]">
                  No catch. We take a cut when you profit. If you don&apos;t
                  profit, we don&apos;t profit. Our incentives are aligned.
                  Novel concept, we know.
                </p>
              </div>

              <div className="border-l-2 border-[#27272A] pl-6">
                <p className="text-2xl font-light text-white/90 leading-relaxed">
                  &ldquo;What if I fail?&rdquo;
                </p>
                <p className="mt-3 text-[#A1A1AA]">
                  If you hit the profit target but violated a rule, we give you
                  a free retry. Because we actually want you to succeed.
                  Shocking, right?
                </p>
              </div>

              <div className="border-l-2 border-[#27272A] pl-6">
                <p className="text-2xl font-light text-white/90 leading-relaxed">
                  &ldquo;Why should I trust you?&rdquo;
                </p>
                <p className="mt-3 text-[#A1A1AA]">
                  $12M+ paid out. 15,000+ funded traders. 4.9/5 Trustpilot.
                  Discord with real humans. Or don&apos;t trust us. Try someone
                  else who charges monthly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 magma-spotlight" />
        <div className="container-wide relative z-10 text-center">
          <p className="eyebrow mb-4">Ready?</p>
          <h2 className="font-display text-display-lg font-bold uppercase tracking-[-0.02em] text-white mb-8">
            Pick a plan.
            <br />
            <span className="text-[#F97316]">Get funded.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/rules" className="btn-secondary">
              Read the rules first
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-xs text-[#71717A]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" strokeWidth={1.5} />
              <span>SSL encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              <span>Instant activation</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" strokeWidth={1.5} />
              <span>Card + Crypto</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
