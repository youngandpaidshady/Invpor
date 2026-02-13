"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronDown, Check, Disc, Target, Zap } from "lucide-react";

/**
 * How It Works — Magma Design System
 * 
 * 3D Scroll Experience.
 * "The Path to Capital"
 */

const steps = [
  {
    id: "01",
    title: "The Evaluation",
    tagline: "Prove your edge.",
    desc: "Trade a demo account with simulated capital. Hit the profit target without violating risk rules. Show us you can manage risk like a professional.",
    specs: [
      { label: "Profit Target", value: "8-10%" },
      { label: "Drawdown", value: "10%" },
      { label: "Time Limit", value: "None" }
    ]
  },
  {
    id: "02",
    title: "The Verification",
    tagline: "Consistency check.",
    desc: "Repeat your success. A slightly lower profit target to prove your first run wasn't luck. Consistency is the only currency that matters.",
    specs: [
      { label: "Profit Target", value: "5%" },
      { label: "Drawdown", value: "10%" },
      { label: "Time Limit", value: "None" }
    ]
  },
  {
    id: "03",
    title: "The Allocation",
    tagline: "Professional Status.",
    desc: "You are now funded. Trade our capital. Keep up to 90% of the profits. Scale your account up to $2,000,000 based on performance.",
    specs: [
      { label: "Profit Split", value: "80-90%" },
      { label: "Payouts", value: "On Demand" },
      { label: "Scaling", value: "Up to $2M" }
    ]
  }
];

function StepCard({ step, index, total }: { step: typeof steps[0], index: number, total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // 3D Scroll Transformations
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0.2, 0.8], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.9, 1]);

  return (
    <div ref={cardRef} className="min-h-screen flex items-center justify-center sticky top-0 perspective-1000">
      <motion.div
        style={{ rotateX, opacity, scale, y }}
        className="w-full max-w-5xl bg-[#111113] border border-[#27272A] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-black/50"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[#F97316] text-xl md:text-2xl font-bold">/{step.id}</span>
              <div className="h-px flex-1 bg-[#27272A]" />
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white mb-4">
              {step.title}
            </h2>

            <p className="font-mono text-[#71717A] text-lg uppercase tracking-wider mb-8">
                    // {step.tagline}
            </p>

            <p className="text-[#A1A1AA] text-lg leading-relaxed mb-12 max-w-lg">
              {step.desc}
            </p>

            <div className="grid grid-cols-3 gap-6 border-t border-[#27272A] pt-8">
              {step.specs.map(spec => (
                <div key={spec.label}>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-2">
                    {spec.label}
                  </div>
                  <div className="text-white font-mono font-bold text-lg md:text-xl">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center relative">
            <div className="absolute inset-0 border border-[#F97316]/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-[20px] border border-[#27272A] rounded-full" />

            <div className="w-64 h-64 rounded-full bg-[#09090B] border border-[#3F3F46] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#F97316]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="font-display text-[100px] font-bold text-[#18181B] group-hover:text-[#F97316]/20 transition-colors select-none">
                {step.id}
              </span>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 right-8 text-[#71717A] font-mono text-xs">
          STEP {index + 1} OF {total}
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorksPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="bg-[#09090B] text-white selection:bg-[#F97316] selection:text-black">
      <Navbar />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#F97316] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#18181B] via-[#09090B] to-[#09090B]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="container-wide relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-[10px] font-bold uppercase tracking-wider mb-8">
              <Disc className="w-3 h-3 animate-spin-slow" />
              System Overview
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tighter mb-8 text-white">
              Protocol
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#71717A] to-[#27272A]">
                Sequence
              </span>
            </h1>

            <p className="max-w-xl mx-auto text-[#A1A1AA] text-xl font-light leading-relaxed mb-12">
              Our funding model removes the friction between talent and capital.
              No hidden rules. No time limits. Pure execution.
            </p>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <ChevronDown className="w-6 h-6 text-[#71717A]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps Container */}
      <div className="relative">
        {steps.map((step, i) => (
          <StepCard key={step.id} step={step} index={i} total={steps.length} />
        ))}
      </div>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden border-t border-[#27272A]">
        <div className="absolute inset-0 magma-spotlight opacity-50" />

        <div className="container-wide relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-8">
            Ready to <span className="text-[#F97316]">Execute?</span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-[#F97316] text-black font-bold uppercase tracking-widest hover:bg-[#ff8a3d] transition-colors flex items-center justify-center gap-3"
            >
              <Target className="w-5 h-5" />
              Start Challenge
            </Link>
            <Link
              href="/dashboard/demo"
              className="px-8 py-4 bg-transparent border border-[#3F3F46] text-white font-bold uppercase tracking-widest hover:bg-[#27272A] transition-colors flex items-center justify-center gap-3"
            >
              <Zap className="w-5 h-5" />
              Try Free Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
