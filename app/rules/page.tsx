"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  Crosshair,
  TrendingUp,
  BarChart3,
  Zap,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Globe,
  ArrowUpRight,
} from "lucide-react";

/**
 * Rules Page — Arctic Void Design System
 *
 * Removed Hero3D / TiltCard dependencies. Everything inline.
 * Sharp corners throughout (radius: 0). card-void surfaces.
 * Arctic cyan + signal colors. Data-dense spec layouts.
 *
 * Aesthetic: Compliance terminal. Precision. Clarity. Authority.
 */

/* ─── DATA ─── */

const PROFIT_TARGETS = [
  {
    phase: "PHASE 1",
    target: "8%",
    condition: "EQUITY GROWTH",
    status: "ACTIVE",
    desc: "Demonstrate consistent profitability within risk limits.",
    icon: TrendingUp,
  },
  {
    phase: "PHASE 2",
    target: "5%",
    condition: "EQUITY GROWTH",
    status: "PENDING",
    desc: "Validate your strategy with a secondary verification phase.",
    icon: BarChart3,
  },
  {
    phase: "FUNDED",
    target: "∞",
    condition: "PROFIT KEEP",
    status: "LOCKED",
    desc: "Trade up to $10M and keep up to 90% of your profits.",
    icon: Zap,
  },
];

const DRAWDOWN_LIMITS = [
  {
    type: "MAX TRAILING DRAWDOWN",
    limit: "10%",
    reset: "NEVER",
    desc: "The maximum loss allowed from the highest equity point achieved.",
    severity: "critical",
  },
  {
    type: "DAILY LOSS LIMIT",
    limit: "5%",
    reset: "00:00 UTC",
    desc: "The maximum loss allowed within a single trading day.",
    severity: "warning",
  },
];

const INSTRUMENTS = [
  { asset: "FOREX", leverage: "1:100", hours: "24/5", pairs: "50+" },
  { asset: "INDICES", leverage: "1:50", hours: "MARKET", pairs: "15+" },
  { asset: "COMMODITIES", leverage: "1:50", hours: "23/5", pairs: "10+" },
  { asset: "CRYPTO", leverage: "1:10", hours: "24/7", pairs: "8+" },
];

const ALLOWED = [
  "Weekend position holding",
  "Automated trading systems (EAs)",
  "Hedging strategies",
  "High-frequency scalping",
];

const PROHIBITED = [
  "Martingale / grid strategies",
  "Tick scalping / latency arbitrage",
  "External account copy trading",
];

const RULES_FAQ = [
  {
    q: "Can I hold trades over the weekend?",
    a: "Yes. Weekend holding is permitted for all accounts unless otherwise specified.",
  },
  {
    q: "Is there a time limit for the challenge?",
    a: "No. You have unlimited time to complete both Phase 1 and Phase 2.",
  },
  {
    q: "How is the Daily Loss Limit calculated?",
    a: "It is calculated based on the previous day's end-of-day equity. Resets at 00:00 UTC.",
  },
  {
    q: "What happens if I breach a hard limit?",
    a: "Your account will be automatically liquidated. You will need to purchase a new challenge.",
  },
];

/* ─── SECTION HEADER COMPONENT ─── */

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Crosshair;
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-12"
    >
      <div className="w-10 h-10 border border-arctic/20 bg-arctic/[0.04] flex items-center justify-center">
        <Icon className="w-5 h-5 text-arctic" strokeWidth={1.5} />
      </div>
      <div>
        <h2 className="font-display text-2xl lg:text-3xl uppercase tracking-wider text-[#E8E8ED]">
          {title}
        </h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#4A4A54] font-mono mt-1">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── PAGE ─── */

export default function RulesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-[#050507] text-[#E8E8ED] selection:bg-arctic selection:text-[#050507]">
      <Navbar />

      {/* ═══════════════════════════════════
           HERO — Asymmetric, left-aligned
         ═══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden noise-overlay"
      >
        <div className="absolute inset-0 void-spotlight" />
        <div className="absolute inset-0 grid-pattern opacity-[0.04]" />

        {/* Diagonal line */}
        <div
          className="absolute top-0 right-[22%] w-[1px] h-full bg-gradient-to-b from-transparent via-arctic/8 to-transparent"
          style={{ transform: "rotate(-6deg)", transformOrigin: "top" }}
        />

        {/* Vertical label */}
        <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 writing-vertical">
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#2A2A32] uppercase">
            Compliance Protocol
          </span>
        </div>

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#4A4A54] hover:text-arctic text-xs font-mono uppercase tracking-[0.15em] mb-8 transition-colors"
            >
              ← Return
            </Link>

            <div className="inline-flex items-center gap-2.5 mb-6 block">
              <div className="w-1.5 h-1.5 bg-arctic animate-pulse-live" />
              <span className="eyebrow">Trading Rules</span>
            </div>

            <h1 className="heading-xl text-[#E8E8ED] mb-6">
              OPERATIONAL
              <br />
              <span className="text-arctic">PARAMETERS</span>
            </h1>

            <p className="text-[#6B6B76] text-lg font-body leading-relaxed max-w-xl">
              Complete reference for profit objectives, risk limits, permitted
              strategies, and instrument specifications. Read before trading.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           CONTENT SECTIONS
         ═══════════════════════════════════ */}
      <div className="container-wide pb-32 space-y-24 lg:space-y-32 relative noise-overlay">

        {/* 1. PROFIT OBJECTIVES */}
        <section>
          <SectionHeader
            icon={Crosshair}
            title="Profit Objectives"
            subtitle="Targets & Scaling Phases"
          />

          <div className="grid lg:grid-cols-3 gap-3">
            {PROFIT_TARGETS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group card-void p-8 hover:border-arctic/30 transition-all duration-500"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-arctic/40" />
                    <div className="absolute top-0 right-0 w-[1px] h-full bg-arctic/40" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <span className="eyebrow">{item.phase}</span>
                      <Icon
                        className="w-4 h-4 text-[#2A2A32] group-hover:text-arctic/40 transition-colors"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="stat-value text-[#E8E8ED] mb-1">
                      {item.target}
                    </div>
                    <div className="stat-label mb-6">{item.condition}</div>

                    <div className="border-t border-[#2A2A32] pt-4">
                      <p className="text-xs text-[#6B6B76] leading-relaxed font-body">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 2. RISK PROTOCOLS */}
        <section>
          <SectionHeader
            icon={ShieldAlert}
            title="Risk Protocols"
            subtitle="Hard Limits & Drawdown"
          />

          <div className="grid lg:grid-cols-2 gap-3">
            {DRAWDOWN_LIMITS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-void relative overflow-hidden"
              >
                {/* Left accent border */}
                <div
                  className={`absolute top-0 left-0 w-[2px] h-full ${item.severity === "critical"
                    ? "bg-signal-red"
                    : "bg-arctic"
                    }`}
                />

                <div className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3
                        className={`font-mono font-bold text-lg ${item.severity === "critical"
                          ? "text-signal-red"
                          : "text-arctic"
                          }`}
                      >
                        {item.type}
                      </h3>
                      <div className="stat-label mt-1">
                        RESET: {item.reset}
                      </div>
                    </div>
                    <AlertTriangle
                      className={`w-6 h-6 ${item.severity === "critical"
                        ? "text-signal-red/40"
                        : "text-arctic/30"
                        }`}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="stat-value text-[#E8E8ED]">
                      {item.limit}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-mono font-medium px-2 py-0.5 border ${item.severity === "critical"
                        ? "text-signal-red border-signal-red/20 bg-signal-red/[0.05]"
                        : "text-arctic border-arctic/20 bg-arctic/[0.05]"
                        }`}
                    >
                      HARD LIMIT
                    </span>
                  </div>

                  <p className="text-xs text-[#6B6B76] leading-relaxed font-body mb-6">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 px-4 py-3 bg-signal-red/[0.04] border border-signal-red/10">
                    <div className="w-1.5 h-1.5 bg-signal-red animate-pulse-live" />
                    <span className="text-[10px] font-mono text-signal-red/80 tracking-[0.1em]">
                      BREACH → IMMEDIATE LIQUIDATION
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. EXECUTION MATRIX */}
        <section>
          <SectionHeader
            icon={CheckCircle2}
            title="Execution Matrix"
            subtitle="Permitted & Restricted Actions"
          />

          <div className="grid lg:grid-cols-2 gap-3">
            {/* Allowed */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-void relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00FF88]/40" />

              <div className="p-8 relative z-10">
                <h3 className="flex items-center gap-3 text-[#00FF88] font-mono font-bold text-sm uppercase tracking-[0.15em] mb-8">
                  <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                  Permitted Strategies
                </h3>
                <div className="space-y-3">
                  {ALLOWED.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-[#00FF88]/[0.02] border border-[#00FF88]/10 group hover:bg-[#00FF88]/[0.05] transition-colors"
                    >
                      <span className="text-sm font-mono text-[#E8E8ED]/80">
                        {item}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]/40 group-hover:text-[#00FF88] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Prohibited */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-void relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-signal-red/40" />

              <div className="p-8 relative z-10">
                <h3 className="flex items-center gap-3 text-signal-red font-mono font-bold text-sm uppercase tracking-[0.15em] mb-8">
                  <XCircle className="w-4 h-4" strokeWidth={1.5} />
                  Restricted Actions
                </h3>
                <div className="space-y-3">
                  {PROHIBITED.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-signal-red/[0.02] border border-signal-red/10 group hover:bg-signal-red/[0.05] transition-colors"
                    >
                      <span className="text-sm font-mono text-[#E8E8ED]/80 line-through decoration-signal-red/30">
                        {item}
                      </span>
                      <XCircle className="w-3.5 h-3.5 text-signal-red/40 group-hover:text-signal-red transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. INSTRUMENTS */}
        <section>
          <SectionHeader
            icon={Globe}
            title="Asset Database"
            subtitle="Tradeable Instruments"
          />

          <div className="card-void overflow-hidden">
            <div className="grid lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#2A2A32]">
              {INSTRUMENTS.map((inst, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-8 hover:bg-arctic/[0.02] transition-colors group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-display text-xl uppercase tracking-wider text-[#E8E8ED] group-hover:text-arctic transition-colors">
                      {inst.asset}
                    </span>
                    <div className="w-1.5 h-1.5 bg-[#00FF88] animate-pulse-live" />
                  </div>
                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#4A4A54] uppercase tracking-[0.2em]">
                        Leverage
                      </span>
                      <span className="text-[#E8E8ED]">{inst.leverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A4A54] uppercase tracking-[0.2em]">
                        Hours
                      </span>
                      <span className="text-[#E8E8ED]">{inst.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A4A54] uppercase tracking-[0.2em]">
                        Pairs
                      </span>
                      <span className="text-arctic">{inst.pairs}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQ */}
        <section className="max-w-3xl">
          <SectionHeader
            icon={Crosshair}
            title="Quick Reference"
            subtitle="Common Questions"
          />

          <div className="space-y-2">
            {RULES_FAQ.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <details className="group card-void">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="flex items-center gap-4 font-mono text-sm text-[#E8E8ED] group-hover:text-arctic transition-colors">
                      <span className="text-arctic/30 text-xs">
                        0{i + 1}
                      </span>
                      {faq.q}
                    </span>
                    <ChevronDown className="w-4 h-4 text-arctic/40 transition-transform group-open:rotate-180 shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-xs text-[#6B6B76] font-body leading-relaxed border-t border-[#2A2A32] pt-4 ml-9">
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-[#2A2A32]">
          <p className="eyebrow mb-4">Ready to start?</p>
          <h2 className="heading-lg text-[#E8E8ED] mb-8">
            BEGIN YOUR <span className="text-arctic">EVALUATION</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing" className="shimmer-button inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C7A257] text-black text-sm font-bold font-mono uppercase tracking-[0.15em] rounded-lg shadow-[0_0_20px_rgba(199,162,87,0.2)] hover:shadow-[0_0_30px_rgba(199,162,87,0.4)] transition-all active:scale-95">
              <Crosshair className="w-4 h-4 mr-2" />
              Get Funded
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/faq" className="btn-secondary">
              View FAQ
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

/* ─── re-export for details chevron ─── */
function ChevronDown(props: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
