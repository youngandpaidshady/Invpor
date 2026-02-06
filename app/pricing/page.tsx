"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/**
 * Pricing Page - Editorial Magazine Style
 * 
 * Not a boring pricing page. This is a statement.
 * Asymmetric. Bold. Human.
 */

const challenges = {
  "2-STEP": {
    tagline: "The classic path",
    desc: "Two phases. Prove consistency twice. Get funded forever.",
    plans: [
      { size: "5K", price: 49, split: 80 },
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
      { size: "5K", price: 69, split: 80 },
      { size: "10K", price: 139, split: 80, hot: true },
      { size: "25K", price: 249, split: 85 },
      { size: "50K", price: 399, split: 85 },
      { size: "100K", price: 699, split: 90 },
    ],
    rules: { target1: "10%", target2: "—", drawdown: "8%" },
  },
  "INSTANT": {
    tagline: "No evaluation",
    desc: "Skip the test. Start trading today.",
    plans: [
      { size: "2.5K", price: 99, split: 60 },
      { size: "5K", price: 179, split: 60, hot: true },
      { size: "10K", price: 349, split: 70 },
      { size: "25K", price: 699, split: 70 },
    ],
    rules: { target1: "—", target2: "—", drawdown: "10%" },
  },
};

type ChallengeType = keyof typeof challenges;

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
    <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Film grain */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-white/[0.02]" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-white/[0.02]" />
      </div>

      <Navbar />

      {/* Hero - Editorial splash */}
      <motion.section
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
      >
        {/* Light leak */}
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 60% 30%, rgba(255,107,53,0.15) 0%, transparent 50%)",
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 lg:ml-[8%]"
          >
            <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
              Issue №024 — Pricing
            </span>
          </motion.div>

          {/* Editorial headline - mixed type */}
          <div className="lg:ml-[8%] max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <span className="block text-[10vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter">
                Stop paying
              </span>
              <span className="block text-[10vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter">
                for <span className="text-[#ff6b35] italic font-light">mediocre.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-lg text-white/40 font-light max-w-lg leading-relaxed"
            >
              One payment. No subscriptions. No hidden fees.
              <span className="text-white/70"> We make money when you make money.</span> That's it.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Challenge Type Selector - Editorial tabs */}
      <section className="border-y border-white/[0.05] sticky top-[72px] bg-[#0a0a0a]/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex">
            {(Object.keys(challenges) as ChallengeType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelected(type)}
                data-cursor={type.split("-")[0]}
                className={`relative py-6 px-8 text-sm font-medium uppercase tracking-wider transition-colors ${selected === type ? "text-white" : "text-white/30 hover:text-white/60"
                  }`}
              >
                {type}
                {selected === type && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff6b35]"
                  />
                )}
                {type === "INSTANT" && (
                  <span className="absolute -top-1 -right-1 text-[8px] text-[#ff6b35] font-bold">NEW</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected challenge info */}
      <section className="py-12 border-b border-white/[0.05]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:ml-[8%] flex flex-wrap items-baseline gap-4">
            <span className="text-2xl font-light text-white/20">/</span>
            <span className="text-lg text-white/60">{currentChallenge.tagline}</span>
            <span className="text-sm text-white/30 ml-auto">
              {currentChallenge.desc}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Grid - Editorial asymmetric */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Rules bar */}
          <div className="lg:ml-[8%] mb-12 flex flex-wrap gap-8 text-sm">
            <div>
              <span className="text-white/30 uppercase tracking-wider text-[10px]">Target 1</span>
              <span className="ml-2 font-bold text-white">{currentChallenge.rules.target1}</span>
            </div>
            {currentChallenge.rules.target2 !== "—" && (
              <div>
                <span className="text-white/30 uppercase tracking-wider text-[10px]">Target 2</span>
                <span className="ml-2 font-bold text-white">{currentChallenge.rules.target2}</span>
              </div>
            )}
            <div>
              <span className="text-white/30 uppercase tracking-wider text-[10px]">Max DD</span>
              <span className="ml-2 font-bold text-[#ff6b35]">{currentChallenge.rules.drawdown}</span>
            </div>
          </div>

          {/* Plans grid - editorial, varied sizing */}
          <div className="lg:ml-[8%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
            {currentChallenge.plans.map((plan, i) => (
              <motion.div
                key={plan.size}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredPlan(plan.size)}
                onMouseLeave={() => setHoveredPlan(null)}
                data-cursor="SELECT"
                className={`relative group cursor-pointer ${plan.hot ? "row-span-1" : ""
                  }`}
              >
                {/* Card */}
                <div className={`relative p-6 lg:p-8 transition-all duration-500 ${hoveredPlan === plan.size
                    ? "bg-white text-black"
                    : plan.hot
                      ? "bg-[#ff6b35]/10 border border-[#ff6b35]/30"
                      : "bg-white/[0.02] border border-white/[0.05]"
                  }`}>
                  {plan.hot && (
                    <span className="absolute -top-2 -right-2 text-[8px] bg-[#ff6b35] text-black px-2 py-1 font-bold uppercase">
                      Popular
                    </span>
                  )}

                  {/* Size */}
                  <div className={`text-3xl lg:text-4xl font-black mb-1 tracking-tight ${hoveredPlan === plan.size ? "text-black" : "text-white"
                    }`}>
                    ${plan.size}
                  </div>

                  {/* Price */}
                  <div className={`text-xl font-light mb-4 ${hoveredPlan === plan.size ? "text-black/60" : "text-white/40"
                    }`}>
                    ${plan.price}
                  </div>

                  {/* Split */}
                  <div className={`text-sm ${hoveredPlan === plan.size ? "text-black/70" : "text-white/30"
                    }`}>
                    <span className={`text-lg font-bold ${hoveredPlan === plan.size ? "text-[#ff6b35]" : "text-[#ff6b35]"
                      }`}>{plan.split}%</span> split
                  </div>

                  {/* Hidden CTA on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: hoveredPlan === plan.size ? 1 : 0,
                      y: hoveredPlan === plan.size ? 0 : 10
                    }}
                    className="absolute bottom-4 left-6 right-6"
                  >
                    <Link
                      href={`/checkout?plan=${selected.toLowerCase()}-${plan.size.toLowerCase()}`}
                      className="block w-full py-2 bg-black text-white text-center text-xs font-bold uppercase tracking-wider"
                    >
                      Select →
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why section - Editorial Q&A style */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:ml-[8%] max-w-3xl">
            <h2 className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono mb-8">
              Why us
            </h2>

            <div className="space-y-8">
              <div className="border-l-2 border-[#ff6b35] pl-6">
                <p className="text-2xl font-light text-white/90 leading-relaxed">
                  &ldquo;What&apos;s the catch?&rdquo;
                </p>
                <p className="mt-3 text-white/40 font-light">
                  No catch. We take a cut when you profit. If you don&apos;t profit, we don&apos;t profit.
                  Our incentives are aligned. Novel concept, we know.
                </p>
              </div>

              <div className="border-l-2 border-white/10 pl-6">
                <p className="text-2xl font-light text-white/90 leading-relaxed">
                  &ldquo;What if I fail?&rdquo;
                </p>
                <p className="mt-3 text-white/40 font-light">
                  If you hit the profit target but violated a rule, we give you a free retry.
                  Because we actually want you to succeed. Shocking, right?
                </p>
              </div>

              <div className="border-l-2 border-white/10 pl-6">
                <p className="text-2xl font-light text-white/90 leading-relaxed">
                  &ldquo;Why should I trust you?&rdquo;
                </p>
                <p className="mt-3 text-white/40 font-light">
                  $12M+ paid out. 10,000+ funded traders. Trustpilot. Discord with real humans.
                  Or don&apos;t trust us. Try someone else who charges monthly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Minimal, direct */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-white/30 text-sm uppercase tracking-[0.3em] mb-4">Ready?</p>
          <h2 className="text-4xl lg:text-6xl font-black mb-8">
            Pick a plan.<br />
            <span className="text-[#ff6b35]">Get funded.</span>
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/rules"
              className="px-8 py-4 border border-white/20 text-white/60 text-sm uppercase tracking-wider hover:border-white/40 hover:text-white transition-all"
            >
              Read the rules first
            </Link>
          </div>
        </div>
      </section>

      {/* Edition marker */}
      <div className="fixed bottom-6 left-6 text-[10px] text-white/10 font-mono tracking-wider z-40">
        №024
      </div>

      <Footer />
    </main>
  );
}
