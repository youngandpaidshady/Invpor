"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Target, TrendingUp, Wallet, ArrowRight, CheckCircle2, Zap, ArrowDown, Sparkles, Clock, DollarSign } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatedCounter, FloatingParticles, GlowingOrb, Marquee } from "@/components/ui/advanced-effects";

const phases = [
  {
    number: "01",
    title: "BUY CHALLENGE",
    icon: Target,
    color: "#ff6b35",
    description: "Choose your account size and challenge type. Pay once, no subscriptions.",
    details: [
      "Account sizes from $5K to $200K",
      "2-Step, 1-Step, or Instant options",
      "One-time fee, no recurring charges",
      "Start trading immediately",
    ],
  },
  {
    number: "02",
    title: "PASS EVALUATION",
    icon: TrendingUp,
    color: "#10b981",
    description: "Prove your trading skills. Hit profit targets while managing risk effectively.",
    details: [
      "8% profit target (Phase 1)",
      "5% profit target (Phase 2)",
      "Minimum 5 trading days",
      "No time limit—trade at your pace",
    ],
  },
  {
    number: "03",
    title: "GET FUNDED",
    icon: Wallet,
    color: "#3b82f6",
    description: "Trade with our capital. Keep up to 90% of all the profits you generate.",
    details: [
      "Real trading capital up to $200K",
      "Bi-weekly or on-demand payouts",
      "Scale up to $2M through our program",
      "Keep 60-90% of your profits",
    ],
  },
];

const benefits = [
  { icon: Clock, title: "No Time Limits", desc: "Trade at your own pace with zero pressure" },
  { icon: Sparkles, title: "Free Retries", desc: "Failed on profit? Get a free retry" },
  { icon: DollarSign, title: "Same-Day Payouts", desc: "Request payouts and get paid fast" },
  { icon: TrendingUp, title: "Scale to $2M", desc: "Grow your account through our scaling plan" },
];

const processStats = [
  { value: 85, suffix: "%", label: "Pass Rate" },
  { value: 3, suffix: " Days", label: "Avg. Funding Time" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

const marqueeItems = [
  "NO TIME LIMITS",
  "FREE RETRIES",
  "90% PROFIT SPLIT",
  "SAME-DAY PAYOUTS",
  "SCALE TO $2M",
  "24/7 SUPPORT",
];

function PhaseCard({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Connecting line */}
      {index < phases.length - 1 && (
        <div className="hidden lg:block absolute left-[calc(50%+4rem)] top-1/2 w-[calc(100%-8rem)] h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10 z-0" />
      )}

      <motion.div
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white/[0.02] border border-white/10 group-hover:border-white/20 p-8 lg:p-10 transition-all duration-300 z-10"
      >
        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at 50% 50%, ${phase.color}10, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="flex flex-col items-center">
              <span
                className="text-6xl lg:text-7xl font-black opacity-10"
                style={{ color: phase.color }}
              >
                {phase.number}
              </span>
            </div>
            <div className="flex-1">
              <div
                className="w-14 h-14 flex items-center justify-center mb-4"
                style={{ backgroundColor: `${phase.color}20` }}
              >
                <phase.icon className="w-7 h-7" style={{ color: phase.color }} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight">{phase.title}</h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/50 font-light text-lg mb-8 leading-relaxed">
            {phase.description}
          </p>

          {/* Details */}
          <div className="grid sm:grid-cols-2 gap-4">
            {phase.details.map((detail, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + j * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: phase.color }} />
                <span className="text-white/60 text-sm">{detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorksPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

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

      <GlowingOrb size={400} className="top-20 -left-40" />
      <GlowingOrb size={350} color="#10b981" className="top-1/2 -right-40" />
      <GlowingOrb size={300} color="#3b82f6" className="bottom-40 left-1/4" />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 z-10">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
          <span
            className="text-[12vw] font-black text-white/[0.015] leading-none tracking-tighter"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            HOW
          </span>
        </div>

        <motion.div
          style={{ y: headerY }}
          className="container mx-auto px-6 lg:px-12 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs text-white/50 uppercase tracking-[0.2em] font-mono">
              <Zap className="w-4 h-4 text-[#ff6b35]" />
              Simple Process
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[10vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter mb-8"
          >
            <span className="block">HOW IT</span>
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              WORKS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg lg:text-xl text-white/40 max-w-xl mx-auto font-light mb-8"
          >
            Three simple steps to becoming a funded trader with access to real capital.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6 text-white/20" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Process Stats */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01] relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {processStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-black text-[#ff6b35] tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-8">
            {phases.map((phase, i) => (
              <PhaseCard key={i} phase={phase} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee speed={25} className="py-6 border-y border-white/5 bg-white/[0.01]">
        {marqueeItems.map((item, i) => (
          <span key={i} className="text-sm font-bold text-white/20 uppercase tracking-[0.3em] mx-8 flex items-center gap-4">
            <Sparkles className="w-4 h-4 text-[#ff6b35]" />
            {item}
          </span>
        ))}
      </Marquee>

      {/* Benefits */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-center mb-16"
          >
            WHY TRADERS CHOOSE US
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-white/[0.02] border border-white/10 hover:border-[#ff6b35]/30 p-6 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#ff6b35]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff6b35] transition-colors">
                  <benefit.icon className="w-6 h-6 text-[#ff6b35] group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-white/40 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
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
            <h2 className="text-3xl lg:text-5xl font-black mb-4">READY TO START?</h2>
            <p className="text-white/40 mb-10 max-w-lg mx-auto">
              Choose your challenge and begin your funded trader journey today.
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
