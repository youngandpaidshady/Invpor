"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Crosshair, Shield, TrendingUp, Banknote } from "lucide-react";

/**
 * How It Works — Arctic Void Design System
 *
 * A vertical timeline experience. Each phase is a full-bleed
 * void-glass card with diagonal composition, data-dense specs,
 * and scan-line hover effects. The hero uses an asymmetric
 * split with a vertical "PROTOCOL" label. Final CTA uses
 * the clipped primary button (btn-primary).
 *
 * Aesthetic: Deep-space mission briefing. Cold. Precise. Inevitable.
 */

/* ─── DATA ─── */

interface Phase {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  brief: string;
  specs: { label: string; value: string }[];
  icon: typeof Crosshair;
}

const phases: Phase[] = [
  {
    id: "01",
    phase: "PHASE 01",
    title: "THE EVALUATION",
    subtitle: "Prove your edge.",
    brief:
      "Trade a simulated account at the size you choose. Hit the profit target while respecting drawdown limits. No time pressure — execute on your schedule.",
    specs: [
      { label: "Profit Target", value: "8 %" },
      { label: "Max Drawdown", value: "10 %" },
      { label: "Time Limit", value: "∞" },
      { label: "Leverage", value: "1 : 100" },
    ],
    icon: Crosshair,
  },
  {
    id: "02",
    phase: "PHASE 02",
    title: "VERIFICATION",
    subtitle: "Consistency, not luck.",
    brief:
      "A reduced profit target confirms your edge is repeatable. Same risk rules. Same instruments. Different result required: proof of discipline.",
    specs: [
      { label: "Profit Target", value: "5 %" },
      { label: "Max Drawdown", value: "10 %" },
      { label: "Time Limit", value: "∞" },
      { label: "Min Days", value: "5" },
    ],
    icon: Shield,
  },
  {
    id: "03",
    phase: "PHASE 03",
    title: "FUNDED",
    subtitle: "Professional allocation.",
    brief:
      "Your funded account is provisioned within 24 hours. Trade our capital, keep the majority of profits, and scale your allocation based on performance.",
    specs: [
      { label: "Profit Split", value: "80–90 %" },
      { label: "Payouts", value: "On Demand" },
      { label: "Max Scale", value: "$2 M" },
      { label: "First Payout", value: "14 Days" },
    ],
    icon: TrendingUp,
  },
  {
    id: "04",
    phase: "PHASE 04",
    title: "WITHDRAW",
    subtitle: "Your money. Your terms.",
    brief:
      "Request a payout whenever you want. Bank transfer, crypto, or e-wallet — processed within 24 hours. No lock-ups, no hidden fees.",
    specs: [
      { label: "Methods", value: "3+" },
      { label: "Processing", value: "24 hrs" },
      { label: "Min Payout", value: "$50" },
      { label: "Frequency", value: "Unlimited" },
    ],
    icon: Banknote,
  },
];

/* ─── PHASE CARD ─── */

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const Icon = phase.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative"
    >
      {/* Connector line from timeline */}
      {index < phases.length - 1 && (
        <div className="absolute left-8 top-full w-[1px] h-16 lg:h-24 bg-gradient-to-b from-[#2A2A32] to-transparent z-0" />
      )}

      <div className="card-void scan-line-effect group relative overflow-hidden">
        {/* Corner accent — top left */}
        <div className="absolute top-0 left-0 w-10 h-[1px] bg-arctic/50" />
        <div className="absolute top-0 left-0 w-[1px] h-10 bg-arctic/50" />

        {/* Background glow */}
        <div
          className="absolute -top-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            width: 400,
            height: 400,
            background: "radial-gradient(ellipse at center, rgba(0,229,255,0.06), transparent 70%)",
            [isEven ? "right" : "left"]: "-10%",
          }}
        />

        <div className={`relative z-10 grid lg:grid-cols-[1fr_1px_320px] gap-0 ${isEven ? "" : "lg:grid-cols-[320px_1px_1fr]"}`}>
          {/* ── Main content ── */}
          <div className={`p-8 lg:p-12 ${isEven ? "" : "lg:order-3"}`}>
            {/* Phase + Icon row */}
            <div className="flex items-center justify-between mb-8">
              <span className="eyebrow">{phase.phase}</span>
              <Icon className="w-5 h-5 text-[#2A2A32] group-hover:text-arctic/40 transition-colors duration-500" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h2 className="heading-lg text-[#E8E8ED] mb-3">
              {phase.title}
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-arctic/60 mb-6">
              {"// "}{phase.subtitle}
            </p>

            {/* Brief */}
            <p className="text-sm text-[#6B6B76] leading-relaxed font-body max-w-lg mb-10">
              {phase.brief}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[#2A2A32] pt-6">
              {phase.specs.map((s) => (
                <div key={s.label}>
                  <div className="stat-label mb-1.5">{s.label}</div>
                  <div className="font-mono text-[#E8E8ED] text-lg font-medium tracking-wide">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Vertical divider ── */}
          <div className={`hidden lg:block bg-[#2A2A32] ${isEven ? "" : "lg:order-2"}`} />

          {/* ── Number panel ── */}
          <div className={`hidden lg:flex flex-col items-center justify-center relative py-12 ${isEven ? "" : "lg:order-1"}`}>
            <span className="font-display text-[120px] leading-none text-[#0C0C10] group-hover:text-arctic/[0.07] transition-colors duration-700 select-none">
              {phase.id}
            </span>
            {/* Tiny orbit ring */}
            <div className="absolute w-32 h-32 border border-[#1C1C22] rounded-full group-hover:border-arctic/10 transition-colors duration-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── PROGRESS BAR ─── */

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-arctic origin-left z-50"
      style={{ scaleX, opacity: 0.8 }}
    />
  );
}

/* ─── PAGE ─── */

export default function HowItWorksPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="bg-[#050507] text-[#E8E8ED] selection:bg-arctic selection:text-[#050507]">
      <Navbar />
      <ProgressBar />

      {/* ═══════════════════════════════════
           HERO — Asymmetric split
         ═══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="min-h-[85vh] flex items-center relative overflow-hidden pt-24 noise-overlay"
      >
        {/* Void spotlight */}
        <div className="absolute inset-0 void-spotlight" />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-[0.04]" />

        {/* Vertical label */}
        <div className="hidden xl:block absolute left-12 top-1/2 -translate-y-1/2 writing-vertical">
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#2A2A32] uppercase">
            Protocol Sequence
          </span>
        </div>

        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-arctic/10 to-transparent"
          style={{ transform: "rotate(-6deg)", transformOrigin: "top" }}
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            {/* Left — headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2.5 mb-8">
                <div className="w-1.5 h-1.5 bg-arctic animate-pulse-live" />
                <span className="eyebrow">System Overview</span>
              </div>

              <h1 className="heading-xl text-[#E8E8ED] mb-6">
                THE PATH<br />
                TO <span className="text-arctic">CAPITAL</span>
              </h1>

              <p className="text-[#6B6B76] text-lg font-body leading-relaxed max-w-xl mb-12">
                Three stages separate you from fully funded status.
                No hidden clauses. No time limits. Pure execution meets
                transparent evaluation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pricing" className="shimmer-button inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C7A257] text-black text-sm font-bold font-mono uppercase tracking-[0.15em] rounded-lg shadow-[0_0_20px_rgba(199,162,87,0.2)] hover:shadow-[0_0_30px_rgba(199,162,87,0.4)] transition-all active:scale-95">
                  <Crosshair className="w-4 h-4 mr-2" />
                  Get Funded
                </Link>
                <Link href="/faq" className="btn-secondary">
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Right — data block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="hidden lg:block card-void p-8 w-72"
            >
              <div className="stat-label mb-2">Evaluation Pipeline</div>
              <div className="divider mb-6" />
              {["EVALUATE", "VERIFY", "FUND", "WITHDRAW"].map((label, i) => (
                <div key={label} className="flex items-center gap-3 mb-4 last:mb-0">
                  <span className="font-mono text-xs text-arctic/40">0{i + 1}</span>
                  <div className="flex-1 h-[1px] bg-[#2A2A32]" />
                  <span className="font-mono text-[11px] tracking-[0.15em] text-[#6B6B76] uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom divider */}
          <div className="mt-20 flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-[#2A2A32]" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#2A2A32] uppercase">
              Scroll to explore
            </span>
            <div className="w-4 h-4 border border-[#2A2A32] flex items-center justify-center">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-[2px] h-2 bg-arctic/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           PHASE CARDS — Vertical timeline
         ═══════════════════════════════════ */}
      <section className="section relative noise-overlay">
        {/* Central timeline spine */}
        <div className="absolute left-8 lg:left-1/2 lg:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#2A2A32] to-transparent opacity-40 pointer-events-none" />

        <div className="container-wide relative z-10 flex flex-col gap-16 lg:gap-24">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
           BOTTOM DATA STRIP — Key metrics
         ═══════════════════════════════════ */}
      <section className="border-t border-b border-[#2A2A32] bg-[#050507] relative noise-overlay">
        <div className="container-wide py-10 lg:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Funded Traders", value: "4,200+", color: "text-arctic" },
              { label: "Capital Deployed", value: "$38M", color: "text-[#E8E8ED]" },
              { label: "Avg Payout Time", value: "< 24h", color: "text-[#00FF88]" },
              { label: "Profit Split", value: "Up to 90%", color: "text-[#E8E8ED]" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="stat-label mb-2">{stat.label}</div>
                <div className={`font-mono text-2xl lg:text-3xl font-medium tracking-wide ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           CTA — Final push
         ═══════════════════════════════════ */}
      <section className="section relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 void-spotlight" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Ready?</p>
              <h2 className="heading-lg text-[#E8E8ED] mb-4">
                START YOUR<br />
                <span className="text-arctic">EVALUATION</span>
              </h2>
              <p className="text-[#6B6B76] text-sm font-body leading-relaxed max-w-md">
                Join thousands of traders who have already secured funded accounts.
                One-time fee. No recurring charges. No hidden rules.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pricing" className="shimmer-button inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C7A257] text-black text-sm font-bold font-mono uppercase tracking-[0.15em] rounded-lg shadow-[0_0_20px_rgba(199,162,87,0.2)] hover:shadow-[0_0_30px_rgba(199,162,87,0.4)] transition-all active:scale-95">
                <Crosshair className="w-4 h-4 mr-2" />
                Get Funded
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/faq" className="btn-secondary">
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
