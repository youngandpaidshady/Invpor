"use client";

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import {
  Shield,
  Zap,
  Clock,
  CreditCard,
  ArrowRight,
  Check,
  TrendingUp,
  Target,
  AlertTriangle,
  BarChart3,
  Users,
  ChevronDown,
  Flame,
  type LucideIcon,
} from "lucide-react";

/**
 * Pricing Page — Total Rebuild
 *
 * 21st.dev Patterns:
 * - Spotlight cards with cursor-following radial gradient
 * - layoutId tab indicator with spring physics
 * - Staggered whileInView entrance animations
 * - Bento grid cards — fully stacked on mobile
 * - Comparison matrix table
 * - Expandable "what's included" per card
 * - Shimmer CTA, noise overlay, border beam on popular
 */

/* ─── ANIMATION VARIANTS ─── */

const EASE_SNAPPY = [0.76, 0, 0.24, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SNAPPY },
  },
};

const wordReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const wordChild = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_SNAPPY },
  },
};

/* ─── DATA ─── */

interface PlanData {
  name: string;
  size: string;
  price: number;
  originalPrice?: number;
  profitTarget: string;
  maxDrawdown: string;
  dailyDrawdown: string;
  profitSplit: number;
  leverage: string;
  platform: string;
  minTradingDays: string;
  features: string[];
  isPopular?: boolean;
  socialProof: string;
}

interface ChallengeInfo {
  tagline: string;
  desc: string;
  icon: LucideIcon;
  plans: PlanData[];
}

const challenges: Record<string, ChallengeInfo> = {
  "2-STEP": {
    tagline: "The classic path",
    desc: "Two phases. Prove consistency twice. Get funded forever.",
    icon: TrendingUp,
    plans: [
      {
        name: "Starter",
        size: "$10K",
        price: 149,
        originalPrice: 199,
        profitTarget: "8%",
        maxDrawdown: "10%",
        dailyDrawdown: "5%",
        profitSplit: 80,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["No time limit", "Free retry", "Bi-weekly payouts", "Real market data"],
        socialProof: "2,847 traders this month",
      },
      {
        name: "Standard",
        size: "$25K",
        price: 249,
        originalPrice: 332,
        profitTarget: "8%",
        maxDrawdown: "10%",
        dailyDrawdown: "5%",
        profitSplit: 85,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["No time limit", "Free retry", "Weekly payouts", "Priority support"],
        socialProof: "4,103 traders this month",
      },
      {
        name: "Pro",
        size: "$50K",
        price: 399,
        originalPrice: 532,
        profitTarget: "8%",
        maxDrawdown: "10%",
        dailyDrawdown: "5%",
        profitSplit: 85,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["No time limit", "Free retry", "Weekly payouts", "Priority support"],
        isPopular: true,
        socialProof: "6,291 traders chose this plan",
      },
      {
        name: "Professional",
        size: "$100K",
        price: 599,
        originalPrice: 799,
        profitTarget: "8%",
        maxDrawdown: "10%",
        dailyDrawdown: "5%",
        profitSplit: 90,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["No time limit", "Free retry", "Same-day payouts", "Personal manager"],
        socialProof: "1,847 funded this month",
      },
      {
        name: "Elite",
        size: "$200K",
        price: 999,
        originalPrice: 1332,
        profitTarget: "8%",
        maxDrawdown: "10%",
        dailyDrawdown: "5%",
        profitSplit: 90,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["No time limit", "Free retry", "Same-day payouts", "Personal manager", "Custom dashboard"],
        socialProof: "312 funded this month",
      },
    ],
  },
  "1-STEP": {
    tagline: "Fast track",
    desc: "One phase. Higher target. Get funded faster.",
    icon: Clock,
    plans: [
      {
        name: "Quick Start",
        size: "$10K",
        price: 169,
        originalPrice: 225,
        profitTarget: "10%",
        maxDrawdown: "6%",
        dailyDrawdown: "4%",
        profitSplit: 80,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["Single phase", "No time limit", "Weekly payouts", "Real market data"],
        socialProof: "3,201 traders this month",
      },
      {
        name: "Accelerated",
        size: "$25K",
        price: 289,
        originalPrice: 385,
        profitTarget: "10%",
        maxDrawdown: "6%",
        dailyDrawdown: "4%",
        profitSplit: 85,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["Single phase", "No time limit", "Bi-weekly payouts", "Priority support"],
        socialProof: "2,456 traders this month",
      },
      {
        name: "Pro",
        size: "$50K",
        price: 449,
        originalPrice: 599,
        profitTarget: "10%",
        maxDrawdown: "6%",
        dailyDrawdown: "4%",
        profitSplit: 85,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["Single phase", "No time limit", "Bi-weekly payouts", "Priority support"],
        isPopular: true,
        socialProof: "5,102 traders chose this plan",
      },
      {
        name: "Elite",
        size: "$100K",
        price: 799,
        originalPrice: 1065,
        profitTarget: "10%",
        maxDrawdown: "6%",
        dailyDrawdown: "4%",
        profitSplit: 90,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["Single phase", "No time limit", "Same-day payouts", "Personal manager"],
        socialProof: "1,203 funded this month",
      },
    ],
  },
  INSTANT: {
    tagline: "No evaluation",
    desc: "Skip the test. Start trading today. No phases, no targets.",
    icon: Zap,
    plans: [
      {
        name: "Direct Start",
        size: "$10K",
        price: 399,
        profitTarget: "N/A",
        maxDrawdown: "10%",
        dailyDrawdown: "5%",
        profitSplit: 70,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["No evaluation", "Instant access", "Weekly payouts", "Real market data"],
        socialProof: "1,567 traders this month",
      },
      {
        name: "Direct Pro",
        size: "$25K",
        price: 799,
        profitTarget: "N/A",
        maxDrawdown: "10%",
        dailyDrawdown: "5%",
        profitSplit: 70,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["No evaluation", "Instant access", "Bi-weekly payouts", "Priority support"],
        isPopular: true,
        socialProof: "2,891 traders chose this plan",
      },
      {
        name: "Direct Elite",
        size: "$50K",
        price: 1199,
        profitTarget: "N/A",
        maxDrawdown: "10%",
        dailyDrawdown: "5%",
        profitSplit: 75,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["No evaluation", "Instant access", "Same-day payouts", "Personal manager"],
        socialProof: "456 funded this month",
      },
    ],
  },
  BLITZ: {
    tagline: "Aggressive targets",
    desc: "High risk, high reward. 7-day sprint. For experienced traders.",
    icon: Flame,
    plans: [
      {
        name: "Speed Run",
        size: "$10K",
        price: 99,
        originalPrice: 132,
        profitTarget: "15%",
        maxDrawdown: "8%",
        dailyDrawdown: "4%",
        profitSplit: 80,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["High targets", "7-day limit", "Quick funding", "Real market data"],
        socialProof: "891 traders this week",
      },
      {
        name: "Rush",
        size: "$50K",
        price: 299,
        originalPrice: 399,
        profitTarget: "15%",
        maxDrawdown: "8%",
        dailyDrawdown: "4%",
        profitSplit: 85,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["High targets", "7-day limit", "Quick funding", "Priority support"],
        isPopular: true,
        socialProof: "2,031 traders chose this plan",
      },
      {
        name: "Turbo",
        size: "$100K",
        price: 499,
        originalPrice: 665,
        profitTarget: "15%",
        maxDrawdown: "8%",
        dailyDrawdown: "4%",
        profitSplit: 90,
        leverage: "1:100",
        platform: "DXtrade",
        minTradingDays: "None",
        features: ["High targets", "7-day limit", "Quick funding", "Personal manager"],
        socialProof: "178 funded this month",
      },
    ],
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

const whyUsItems = [
  {
    q: "Aligned Incentives",
    a: "Our core revenue model is driven by trader profitability. We deduct a performance fee only upon successful withdrawals, ensuring our financial interests are perfectly aligned with yours.",
    accent: true,
  },
  {
    q: "Performance-Based Retries",
    a: "Traders who demonstrate positive performance by reaching the profit target, despite violating a drawdown parameter, are granted an automatic retry. Consistency is rewarded.",
    accent: false,
  },
  {
    q: "Proven Infrastructure",
    a: "Over $12,000,000 disbursed across 15,000+ funded accounts. Supported by institutional-grade liquidity, DXtrade execution, and a strict no-slippage-manipulation policy.",
    accent: false,
  },
];

/* ─── METRIC ROW COMPONENT ─── */

function MetricRow({
  label,
  value,
  icon: Icon,
  danger = false,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 bg-white/[0.04] border border-white/[0.05] rounded-lg group-hover:bg-white/[0.08] group-hover:border-white/[0.1] transition-all backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-2">
        <Icon
          className={`w-3.5 h-3.5 ${danger ? "text-red-400/70" : "text-[#C7A257]/60"}`}
          strokeWidth={1.5}
        />
        <span className="text-[11px] text-white/40 font-mono uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span
        className={`text-sm font-mono font-bold ${danger ? "text-red-400" : "text-white"
          }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ─── SPOTLIGHT CARD COMPONENT ─── */

function SpotlightCard({
  children,
  className = "",
  isPopular = false,
}: {
  children: React.ReactNode;
  className?: string;
  isPopular?: boolean;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, 400], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 400], [-4, 4]);

  const springConfig = { damping: 20, stiffness: 200, mass: 1 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(200);
    mouseY.set(200);
  }

  return (
    <motion.div
      variants={fadeUp}
      style={{ perspective: 1000 }}
      className={`group relative h-full flex flex-col ${className}`}
    >
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col flex-grow rounded-2xl overflow-hidden bg-[#050505]"
      >
        {/* Animated Conic Gradient Border (Only for Popular) */}
        {isPopular && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, transparent 60%, #C7A257 80%, transparent 100%)",
              }}
            />
            {/* Inner background mask to create the 1px border effect */}
            <div className="absolute inset-[1px] bg-[#0A0A0A] rounded-2xl z-10" />
          </div>
        )}

        {/* Noise Grain Texture overlay */}
        <div
          className="absolute inset-0 z-[1] mix-blend-overlay opacity-30 pointer-events-none rounded-2xl"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Spotlight gradient that follows cursor */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-[2]"
          style={{
            background: useMotionTemplate`
              radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${isPopular ? "rgba(199,162,87,0.12)" : "rgba(255,255,255,0.06)"}, transparent 60%)
            `,
          }}
        />

        {/* Card content */}
        <div className="relative flex flex-col flex-grow z-10" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── EXPANDABLE PLAN CARD ─── */

function PricingCard({
  plan,
  challengeType,
}: {
  plan: PlanData;
  challengeType: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SpotlightCard isPopular={plan.isPopular}>
      <div
        className={`relative flex flex-col h-full transition-all duration-500 rounded-2xl ${plan.isPopular
          ? "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
          : "border border-white/10 hover:border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
          }`}
      >
        {/* Holographic Sheen Sweep on Hover */}
        <div className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-1000 ease-in-out rounded-2xl overflow-hidden" />

        {/* Popular fixed glow overlay */}
        {plan.isPopular && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#C7A257]/[0.05] to-transparent pointer-events-none z-0 rounded-2xl" />
        )}
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <motion.div
              animate={{
                boxShadow: ["0 0 0px rgba(199,162,87,0)", "0 0 15px rgba(199,162,87,0.5)", "0 0 0px rgba(199,162,87,0)"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-sm overflow-hidden"
            >
              <span className="block text-[10px] bg-[#C7A257] text-black px-4 py-1 font-bold uppercase tracking-[0.15em] font-mono whitespace-nowrap">
                Most Popular
              </span>
            </motion.div>
          </div>
        )}

        <div className="p-4 lg:p-6 flex flex-col flex-grow">
          {/* Header */}
          <div className="mb-4">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#C7A257]/60 font-mono mb-1">
              {plan.name}
            </div>
            <div className="font-display text-4xl lg:text-5xl uppercase tracking-wider text-white group-hover:text-[#C7A257] transition-colors duration-300">
              {plan.size}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-[#1a1a1a]">
            <span className="text-3xl font-mono text-white tracking-tight font-bold">
              ${plan.price}
            </span>
            {plan.originalPrice && (
              <span className="text-sm text-white/30 line-through font-mono">
                ${plan.originalPrice}
              </span>
            )}
            <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-mono ml-auto">
              One-time
            </span>
          </div>

          {/* Comparison metrics */}
          <div className="space-y-0.5 mb-4">
            <MetricRow label="Profit Target" value={plan.profitTarget} icon={Target} />
            <MetricRow label="Max Drawdown" value={plan.maxDrawdown} icon={BarChart3} danger />
            <MetricRow label="Daily Drawdown" value={plan.dailyDrawdown} icon={BarChart3} danger />
            <MetricRow label="Profit Split" value={`${plan.profitSplit}%`} icon={TrendingUp} />
            <MetricRow label="Leverage" value={plan.leverage} icon={Shield} />
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-1 mb-3">
            {plan.features.slice(0, expanded ? plan.features.length : 2).map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] text-white/50 font-mono uppercase tracking-wider"
              >
                <Check className="w-2.5 h-2.5 text-[#C7A257]/60" strokeWidth={2.5} />
                {f}
              </span>
            ))}
          </div>

          {/* Expandable details */}
          {plan.features.length > 2 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 hover:text-[#C7A257]/70 transition-colors mb-4"
            >
              {expanded ? "Show Less" : `+${plan.features.length - 2} More`}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                strokeWidth={2}
              />
            </button>
          )}

          {/* Expanded details panel */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_SNAPPY }}
                className="overflow-hidden mb-4"
              >
                <div className="space-y-1 pt-3 border-t border-[#1a1a1a]">
                  <MetricRow label="Platform" value={plan.platform} icon={Shield} />
                  <MetricRow label="Min Trading Days" value={plan.minTradingDays} icon={Clock} />
                  <div className="mt-3 p-3 bg-[#C7A257]/[0.03] border border-[#C7A257]/10">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#C7A257]/60 font-mono mb-2">
                      Refundable fee policy
                    </div>
                    <p className="text-[11px] text-white/40 font-body leading-relaxed">
                      Your evaluation fee is automatically refunded alongside your primary withdrawal upon successfully passing the challenge phases.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social proof */}
          <div className="flex items-center gap-2 mb-4 text-[10px] text-white/25 font-mono">
            <Users className="w-3 h-3" strokeWidth={1.5} />
            <span>{plan.socialProof}</span>
          </div>

          {/* CTA — Shimmer button */}
          <div className="mt-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href={`/checkout/${challengeType.toLowerCase().replace("-", "")}-${plan.size.replace("$", "").toLowerCase()}`}
                className={`shimmer-button flex items-center justify-center gap-2 w-full py-3 text-xs font-bold font-mono uppercase tracking-[0.15em] border transition-all ${plan.isPopular
                  ? "bg-[#C7A257] border-[#C7A257] text-black hover:shadow-[0_0_30px_rgba(199,162,87,0.3)]"
                  : "bg-transparent border-[#222222] text-white/60 hover:text-[#C7A257] hover:border-[#C7A257]/40"
                  }`}
              >
                <span className="relative z-[2]">Start Challenge</span>
                <ArrowRight className="w-4 h-4 relative z-[2] transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ─── COMPARISON TABLE ─── */

function ComparisonMatrix({ plans, challengeType }: { plans: PlanData[]; challengeType: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="overflow-x-auto"
    >
      <motion.div variants={fadeUp} className="min-w-[640px]">
        {/* Header row */}
        <div className="grid gap-0" style={{ gridTemplateColumns: `200px repeat(${plans.length}, 1fr)` }}>
          <div className="p-4 border border-[#1a1a1a] bg-[#0F0F0F]">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7A257]/60 font-mono">
              Compare Plans
            </span>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-4 border border-[#1a1a1a] text-center transition-colors ${plan.isPopular ? "bg-[#C7A257]/[0.08] border-[#C7A257]/30" : "bg-[#0A0A0A]"
                }`}
            >
              {plan.isPopular && (
                <div className="text-[8px] text-[#C7A257] font-mono uppercase tracking-[0.2em] mb-2 font-bold">
                  ★ Popular
                </div>
              )}
              <div className="font-display text-xl uppercase tracking-wider text-white">
                {plan.size}
              </div>
              <div className="text-[9px] text-white/40 font-mono uppercase mt-1">
                {plan.name}
              </div>
            </div>
          ))}
        </div>

        {/* Data rows */}
        {[
          { label: "Price", key: "price", format: (p: PlanData) => `$${p.price}` },
          { label: "Profit Target", key: "profitTarget", format: (p: PlanData) => p.profitTarget },
          { label: "Max Drawdown", key: "maxDrawdown", format: (p: PlanData) => p.maxDrawdown, danger: true },
          { label: "Daily Drawdown", key: "dailyDrawdown", format: (p: PlanData) => p.dailyDrawdown, danger: true },
          { label: "Profit Split", key: "profitSplit", format: (p: PlanData) => `${p.profitSplit}%` },
          { label: "Leverage", key: "leverage", format: (p: PlanData) => p.leverage },
          { label: "Platform", key: "platform", format: (p: PlanData) => p.platform },
          { label: "Min Trading Days", key: "minTradingDays", format: (p: PlanData) => p.minTradingDays },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            variants={fadeUp}
            className="grid gap-0 hover:bg-white/[0.02] transition-colors"
            style={{ gridTemplateColumns: `200px repeat(${plans.length}, 1fr)` }}
          >
            <div className="p-3 border border-[#1a1a1a] bg-[#0F0F0F] flex items-center gap-2">
              <span className="text-[10px] text-white/50 font-mono uppercase tracking-wider">
                {row.label}
              </span>
            </div>
            {plans.map((plan) => (
              <div
                key={`${plan.name}-${row.label}`}
                className={`p-3 border border-[#1a1a1a] text-center ${plan.isPopular ? "bg-[#C7A257]/[0.04] border-l-[#C7A257]/30 border-r-[#C7A257]/30" : "bg-transparent"
                  }`}
              >
                <span
                  className={`text-sm font-mono font-bold ${(row as { danger?: boolean }).danger ? "text-red-400/80" : "text-white/80"
                    }`}
                >
                  {row.format(plan)}
                </span>
              </div>
            ))}
          </motion.div>
        ))}

        {/* Feature rows */}
        {["No time limit", "Free retry", "Same-day payouts", "Personal manager"].map((feature) => (
          <motion.div
            key={feature}
            variants={fadeUp}
            className="grid gap-0 hover:bg-white/[0.02] transition-colors"
            style={{ gridTemplateColumns: `200px repeat(${plans.length}, 1fr)` }}
          >
            <div className="p-3 border border-[#1a1a1a] bg-[#0F0F0F] flex items-center gap-2">
              <span className="text-[10px] text-white/50 font-mono uppercase tracking-wider">
                {feature}
              </span>
            </div>
            {plans.map((plan) => (
              <div
                key={`${plan.name}-${feature}`}
                className={`p-3 border border-[#1a1a1a] text-center ${plan.isPopular ? "bg-[#C7A257]/[0.04] border-l-[#C7A257]/30 border-r-[#C7A257]/30" : "bg-transparent"
                  }`}
              >
                {plan.features.some((f) => f.toLowerCase().includes(feature.toLowerCase())) ? (
                  <Check className="w-4 h-4 text-[#C7A257] mx-auto" strokeWidth={2.5} />
                ) : (
                  <span className="text-white/20 text-xs">—</span>
                )}
              </div>
            ))}
          </motion.div>
        ))}

        {/* CTA row */}
        <div
          className="grid gap-0"
          style={{ gridTemplateColumns: `200px repeat(${plans.length}, 1fr)` }}
        >
          <div className="p-4 border border-[#1a1a1a] bg-[#0F0F0F]" />
          {plans.map((plan) => (
            <div
              key={`${plan.name}-cta`}
              className={`p-4 border border-[#1a1a1a] ${plan.isPopular ? "bg-[#C7A257]/[0.08] border-[#C7A257]/30 border-b-[#C7A257]/30" : "bg-[#0A0A0A]"
                }`}
            >
              <Link
                href={`/checkout/${challengeType.toLowerCase().replace("-", "")}-${plan.size.replace("$", "").toLowerCase()}`}
                className={`shimmer-button flex items-center justify-center gap-2 w-full py-3 text-[10px] font-bold font-mono uppercase tracking-[0.15em] border transition-all ${plan.isPopular
                  ? "bg-[#C7A257] border-[#C7A257] text-black"
                  : "bg-transparent border-[#222222] text-white/60 hover:text-[#C7A257] hover:border-[#C7A257]/40"
                  }`}
              >
                <span className="relative z-[2]">Select</span>
                <ArrowRight className="w-3 h-3 relative z-[2]" />
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── PAGE ─── */

export default function PricingPage() {
  const [selected, setSelected] = useState<ChallengeType>("2-STEP");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  const currentChallenge = challenges[selected];

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white selection:bg-[#C7A257] selection:text-black"
    >
      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-pattern opacity-[0.03]" />

      {/* ═══════════════════════════════════
           HERO — Centered with shimmer text
         ═══════════════════════════════════ */}
      <motion.section
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 void-spotlight" />
        <div className="lamp-beam" style={{ height: "50vh", opacity: 0.5 }} />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        {/* Diagonal line */}
        <div
          className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#C7A257]/[0.06] to-transparent"
          style={{ transform: "rotate(-10deg)", transformOrigin: "top" }}
        />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="eyebrow">PRICING & EVALUATIONS</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.h1
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              style={{ perspective: "1000px" }}
            >
              <motion.span
                variants={wordChild}
                className="block heading-xl text-white"
              >
                PREMIUM CAPITAL.
              </motion.span>
              <motion.span variants={wordChild} className="block heading-xl">
                PROFESSIONAL{" "}
                <span className="shimmer-gold">CONDITIONS.</span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE_SNAPPY }}
              className="mt-8 text-lg text-white/40 max-w-lg leading-relaxed font-body"
            >
              Institutional-grade liquidity. One-time evaluation fees.{" "}
              <span className="text-white/70">
                A performance environment engineered for consistency.
              </span>
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════
           CHALLENGE TYPE SELECTOR — glassmorphism tabs
         ═══════════════════════════════════ */}
      <section className="border-y border-[#1a1a1a] sticky top-[64px] bg-[#050505]/95 backdrop-blur-md z-30">
        <div className="container-wide">
          <div className="flex items-center gap-0">
            {(Object.keys(challenges) as ChallengeType[]).map((type) => {
              const ChallengeIcon = challenges[type].icon;
              return (
                <button
                  key={type}
                  onClick={() => setSelected(type)}
                  className={`relative flex items-center gap-2 py-5 px-4 lg:px-8 text-xs font-mono uppercase tracking-[0.12em] transition-colors ${selected === type
                    ? "text-white"
                    : "text-white/30 hover:text-white/50"
                    }`}
                >
                  <ChallengeIcon className="w-3.5 h-3.5" strokeWidth={2} />
                  <span className="hidden sm:inline">{type}</span>
                  {selected === type && (
                    <motion.div
                      layoutId="pricingTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A257]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  {type === "INSTANT" && selected !== type && (
                    <span className="text-[8px] text-[#C7A257] font-bold font-mono">
                      NEW
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           CHALLENGE INFO + RULES
         ═══════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="py-10 border-b border-[#1a1a1a]"
      >
        <div className="container-wide">
          {/* Info bar */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-baseline gap-4 mb-6"
          >
            <span className="text-xl font-display text-white/10">/</span>
            <span className="text-base text-white/50 font-body">
              {currentChallenge.tagline}
            </span>
            <span className="text-xs text-white/30 ml-auto font-mono">
              {currentChallenge.desc}
            </span>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-3"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 px-4 py-3 border border-[#1a1a1a] bg-[#0A0A0A]"
            >
              <Users className="w-4 h-4 text-[#C7A257]/70" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
                  Active Traders
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  15,247+
                </span>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 px-4 py-3 border border-[#1a1a1a] bg-[#0A0A0A]"
            >
              <TrendingUp className="w-4 h-4 text-[#C7A257]/70" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
                  Total Paid Out
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  $12.8M+
                </span>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 px-4 py-3 border border-[#1a1a1a] bg-[#0A0A0A]"
            >
              <AlertTriangle className="w-4 h-4 text-red-400/70" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
                  Refundable
                </span>
                <span className="font-mono text-sm font-bold text-[#C7A257]">
                  Yes
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════
           PRICING GRID — Spotlight cards
         ═══════════════════════════════════ */}
      <section className="section relative">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="container-wide relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {currentChallenge.plans.map((plan) => (
                <PricingCard
                  key={`${selected}-${plan.name}`}
                  plan={plan}
                  challengeType={selected}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════
           COMPARISON MATRIX
         ═══════════════════════════════════ */}
      <section className="section relative bg-[#0A0A0A]">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="eyebrow">Compare All Plans</span>
            <h2 className="heading-md mt-4">
              SIDE BY <span className="shimmer-gold">SIDE.</span>
            </h2>
            <p className="mt-4 text-sm text-white/40 font-body max-w-lg">
              Every detail, every plan. Transparency is not a feature — it&apos;s our default.
            </p>
          </motion.div>

          <ComparisonMatrix
            plans={currentChallenge.plans}
            challengeType={selected}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════
           PAYMENT METHODS — Staggered reveal
         ═══════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 border-y border-[#1a1a1a]"
      >
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Card Payments */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <CreditCard
                  className="w-5 h-5 text-[#C7A257]"
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-lg uppercase tracking-wider text-white">
                  Card Payments
                </h3>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-body mb-6">
                Instant processing via Stripe. All major cards accepted.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Mastercard", "Amex", "Discover"].map((card, i) => (
                  <motion.div
                    key={card}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{
                      borderColor: "rgba(199, 162, 87, 0.3)",
                      y: -2,
                    }}
                    className="px-4 py-2 border border-[#1a1a1a] bg-[#050505] text-xs font-mono text-white/50 transition-colors"
                  >
                    {card}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Crypto Payments */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <Zap
                  className="w-5 h-5 text-[#C7A257]"
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-lg uppercase tracking-wider text-white">
                  Crypto Payments
                </h3>
                <span className="badge-success ml-2">5% OFF</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-body mb-6">
                Pay with crypto and save 5%. Instant confirmation. USDT/USDC
                accepted on multiple networks.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {cryptoCoins.map((coin, i) => (
                  <motion.div
                    key={coin.symbol}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{
                      y: -4,
                      borderColor: "rgba(199, 162, 87, 0.3)",
                      boxShadow: `0 0 15px ${coin.color}20`,
                    }}
                    className="group flex flex-col items-center gap-2 py-3 px-2 border border-[#1a1a1a] bg-[#050505] cursor-default transition-all"
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center font-mono text-xs font-bold"
                      style={{ color: coin.color }}
                    >
                      {coin.symbol}
                    </div>
                    <span className="text-[9px] text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-wider font-mono">
                      {coin.name}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-white/25 uppercase tracking-[0.15em] font-mono">
                <span>ERC-20</span>
                <span className="text-white/10">•</span>
                <span>TRC-20</span>
                <span className="text-white/10">•</span>
                <span>SOL Network</span>
                <span className="text-white/10">•</span>
                <span>BTC Network</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════
           WHY US — Slide-in cards
         ═══════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="section border-b border-[#1a1a1a]"
      >
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="container-wide relative z-10">
          <motion.p variants={fadeUp} className="eyebrow mb-12">
            Why us
          </motion.p>

          <div className="space-y-6 max-w-3xl">
            {whyUsItems.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      ease: EASE_SNAPPY,
                      delay: i * 0.1,
                    },
                  },
                }}
                whileHover={{
                  x: 8,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                className={`border-l-2 pl-6 py-2 cursor-default ${item.accent
                  ? "border-[#C7A257]"
                  : "border-[#1a1a1a] hover:border-[#C7A257]/40"
                  } transition-colors`}
              >
                <p className="text-2xl font-display uppercase tracking-wider text-white/90 leading-relaxed">
                  {item.q}
                </p>
                <p className="mt-3 text-white/40 font-body text-sm leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════
           CTA — Lamp beam + shimmer headline
         ═══════════════════════════════════ */}
      <section className="section relative overflow-hidden">
        {/* Lamp beam */}
        <div className="lamp-beam" style={{ height: "60vh", opacity: 0.6 }} />
        <div className="absolute inset-0 void-spotlight" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="container-wide relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              Ready?
            </motion.p>
            <motion.h2 variants={fadeUp} className="heading-lg text-white mb-4">
              PICK A PLAN.
            </motion.h2>
            <motion.h2
              variants={fadeUp}
              className="heading-lg shimmer-gold mb-10"
            >
              GET FUNDED.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                href="#"
                className="btn-primary shimmer-button text-center"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span className="relative z-[2]">Choose Your Plan</span>
              </Link>
              <Link href="/rules" className="btn-secondary text-center">
                Read the Rules First
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-white/30 font-mono"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" strokeWidth={1.5} />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                <span>Instant Activation</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" strokeWidth={1.5} />
                <span>Card + Crypto</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
