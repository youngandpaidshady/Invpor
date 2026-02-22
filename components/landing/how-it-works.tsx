"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Wallet,
  Target,
  Zap,
  BadgeDollarSign,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Lock,
  ArrowRight,
} from "lucide-react";

/**
 * How It Works — 21st.dev Spawn Engine Build
 * DNA: Bento Asymmetric + Glass Surface + Spring Reveal + Prestige Mood + Layered Depth
 * Chaos: Holographic Sheen + Dot Matrix + Shadow Elevation Shift
 */

const SPRING = { type: "spring" as const, stiffness: 300, damping: 22 };
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  isInView: boolean;
}

// 1. CARDS.MD PATTERN: 3D Tilt Hover + Premium Glass
function BentoCard({ children, className = "", delay = 0, isInView }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ ...SPRING, delay }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#070707] hover:border-[#C7A257]/30 hover:shadow-[0_0_40px_rgba(199,162,87,0.1)] transition-all duration-500 ease-out ${className}`}
    >
      {/* Holographic sheen sweep & Focus Glow */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])}, rgba(199,162,87,0.1), transparent 80%)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C7A257]/[0.05] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1500ms] ease-out pointer-events-none z-[2]" />

      {/* Content wrapper with 3d translation on hover to create depth mapping */}
      <div className="relative z-10 h-full transform-gpu group-hover:translate-z-8 transition-transform duration-500">
        {children}
      </div>
    </motion.div>
  );
}

function StepBadge({ step }: { step: number }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="w-6 h-6 flex items-center justify-center text-[10px] font-mono font-bold text-[#C7A257] border border-[#C7A257]/30 bg-[#C7A257]/5">
        {step}
      </span>
      <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C7A257]/70">
        Step {step}
      </span>
    </div>
  );
}

// Define the steps data so we can loop it in the mobile carousel
const STEPS_DATA = [
  {
    step: 1,
    title: "Choose Your Account",
    desc: "Select a funding tier from $10K to $200K. Pay a simple one-time fee — no monthly subscriptions.",
    icon: Wallet
  },
  {
    step: 2,
    title: "Hit The Target",
    desc: "Achieve the straightforward 8% profit target. Take all the time you need.",
    icon: Target
  },
  {
    step: 3,
    title: "No Time Limits",
    desc: "Trade at your own pace. Zero limits on how long you take to pass evaluation.",
    icon: ShieldCheck
  },
  {
    step: 4,
    title: "Withdraw Profits",
    desc: "Trade live capital. Keep 90% of profits with on-demand 24h payouts.",
    icon: BadgeDollarSign
  },
  {
    step: 5,
    title: "Instant Validation",
    desc: "Pass your challenge and get live credentials automatically provisioned in seconds.",
    icon: Zap
  },
  {
    step: 6,
    title: "Deep Metrics",
    desc: "Track your edges with our institutional-grade performance dashboard.",
    icon: BarChart3
  }
];

// 2. TESTIMONIALS.MD CAROUSEL PATTERN: 3D Stack Drag for Mobile
import { useState } from "react";
import { PanInfo } from "framer-motion";

function MobileCarousel({ isInView }: { isInView: boolean }) {
  const [cards, setCards] = useState(STEPS_DATA);
  const DRAG_THRESHOLD = 50;

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > DRAG_THRESHOLD) {
      // Swiped far enough, cycle the cards array
      setCards((prev) => {
        const newArr = [...prev];
        const first = newArr.shift();
        if (first) newArr.push(first);
        return newArr;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="md:hidden relative h-[400px] w-full max-w-sm mx-auto perspective-1000 mb-20"
    >
      {/* Interactive Drag Deck */}
      {cards.map((card, idx) => {
        const isTop = idx === 0;
        const isSecond = idx === 1;
        const isThird = idx === 2;

        // Visual stacking logic
        const zIndex = cards.length - idx;
        const scale = isTop ? 1 : isSecond ? 0.92 : isThird ? 0.84 : 0.8;
        const yOffset = isTop ? 0 : isSecond ? 25 : isThird ? 45 : 55;
        const opacity = isTop ? 1 : isSecond ? 0.6 : isThird ? 0.3 : 0;

        return (
          <motion.div
            key={card.step}
            style={{ zIndex }}
            layout
            initial={false}
            animate={{ scale, y: yOffset, opacity }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={isTop ? handleDragEnd : undefined}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            className={`absolute top-0 left-0 w-full h-[320px] rounded-2xl border border-white/[0.08] bg-[#070707] p-8 flex flex-col justify-center shadow-2xl ${isTop ? 'cursor-grab hover:border-[#C7A257]/30' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C7A257]/[0.04] to-transparent pointer-events-none rounded-2xl" />
            <div className="relative z-10 flex flex-col h-full pointer-events-none">
              <div className="w-12 h-12 bg-black/60 border border-white/[0.08] flex items-center justify-center mb-6 rounded-md">
                <card.icon className="w-5 h-5 text-[#C7A257]" />
              </div>
              <StepBadge step={card.step} />
              <h3 className="font-display text-2xl uppercase text-white mb-4">{card.title}</h3>
              <p className="text-white/40 font-body text-sm leading-relaxed">{card.desc}</p>
            </div>
            {isTop && (
              <div className="absolute top-1/2 -right-12 w-8 h-8 flex items-center justify-center opacity-40 animate-pulse hidden xs:flex">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Pagination indicators */}
      <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-center gap-2">
        {STEPS_DATA.map((s, i) => (
          <div key={s.step} className={`h-1.5 rounded-full transition-all duration-300 ${cards[0].step === s.step ? 'w-6 bg-[#C7A257]' : 'w-1.5 bg-white/20'}`} />
        ))}
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="bg-[#010101] relative border-b border-white/[0.04] py-24 lg:py-36 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-[20%] w-[700px] h-[700px] bg-[#C7A257]/[0.03] rounded-full blur-[180px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-[#C7A257]/[0.06] rounded-full blur-[160px] pointer-events-none translate-y-1/2" />

      <div className="container-wide relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="eyebrow tracking-[0.3em] text-[#C7A257]/80 mb-4 block text-[11px]">
            HOW IT WORKS
          </span>
          <h2 className="font-display text-4xl lg:text-7xl uppercase leading-none tracking-tight text-white mb-2">
            THE PATH TO <span className="shimmer-gold">FUNDING</span>
          </h2>
          <p className="mt-6 text-white/40 text-lg lg:text-xl max-w-2xl mx-auto font-body leading-relaxed">
            A streamlined 3-step protocol. No hidden rules, zero recurring fees.
          </p>
        </motion.div>

        {/* MOBILE CAROUSEL */}
        <MobileCarousel isInView={isInView} />

        {/* BENTO GRID — DESKTOP ONLY */}
        <motion.div
          style={{ y: sectionY }}
          className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,_auto)]"
        >
          {/* Card 1 — Primary Feature (2 cols, 2 rows) */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            delay={0.1}
            isInView={isInView}
          >
            {/* Dot-matrix underlay */}
            <div
              className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-700"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(199,162,87,0.3) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
                maskImage: "linear-gradient(to bottom, black 20%, transparent 85%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 85%)",
              }}
            />
            {/* Background icon */}
            <div className="absolute top-0 right-0 p-8 text-white/[0.02] rotate-12 scale-150 group-hover:scale-[1.3] group-hover:text-[#C7A257]/[0.06] transition-all duration-700">
              <Wallet className="w-64 h-64" />
            </div>

            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-end pointer-events-none">
              <div className="w-14 h-14 bg-black/60 border border-white/[0.08] flex items-center justify-center mb-6 group-hover:border-[#C7A257]/30 transition-colors rounded-xl glow-pulse">
                <Wallet className="w-6 h-6 text-[#C7A257]" />
              </div>
              <StepBadge step={1} />
              <h3 className="font-display text-4xl uppercase text-white mb-4 tracking-tight">
                Choose Your Account
              </h3>
              <p className="text-white/40 font-body text-lg leading-relaxed max-w-md">
                Select a funding tier from $10K to $200K. Pay a simple one-time fee — no monthly subscriptions.
              </p>
            </div>
          </BentoCard>

          {/* Card 2 — Standard */}
          <BentoCard delay={0.2} isInView={isInView}>
            <div className="relative z-10 p-7 h-full flex flex-col pointer-events-none">
              <div className="w-11 h-11 bg-black/40 border border-white/[0.08] flex items-center justify-center mb-5 group-hover:border-[#C7A257]/30 transition-colors rounded-lg">
                <Target className="w-5 h-5 text-white/60 group-hover:text-[#C7A257] transition-colors" />
              </div>
              <StepBadge step={2} />
              <h3 className="font-display text-2xl uppercase text-white mb-3">
                Hit The Target
              </h3>
              <p className="text-white/40 font-body text-sm leading-relaxed">
                Achieve the straightforward 8% profit target. Take all the time you need.
              </p>
            </div>
          </BentoCard>

          {/* Card 3 — Standard */}
          <BentoCard delay={0.3} isInView={isInView}>
            <div className="relative z-10 p-7 h-full flex flex-col pointer-events-none">
              <div className="w-11 h-11 bg-black/40 border border-white/[0.08] flex items-center justify-center mb-5 group-hover:border-[#C7A257]/30 transition-colors rounded-lg">
                <ShieldCheck className="w-5 h-5 text-white/60 group-hover:text-[#C7A257] transition-colors" />
              </div>
              <h3 className="font-display text-2xl uppercase text-white mb-3 mt-6">
                No Time Limits
              </h3>
              <p className="text-white/40 font-body text-sm leading-relaxed">
                Trade at your own pace. Zero limits on how long you take to pass evaluation.
              </p>
            </div>
          </BentoCard>

          {/* Card 4 — Tall Feature (1 col, 2 rows) */}
          <BentoCard
            className="lg:col-span-1 lg:row-span-2"
            delay={0.4}
            isInView={isInView}
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C7A257]/[0.08] blur-[80px] rounded-full group-hover:bg-[#C7A257]/[0.15] transition-colors duration-700 pointer-events-none" />

            <div className="relative z-10 p-7 h-full flex flex-col items-center justify-center pointer-events-none py-12">
              {/* Animated orbit */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="relative w-28 h-28 mb-10"
              >
                <div className="absolute inset-0 border-2 border-dashed border-[#C7A257]/20 rounded-full" />
                <div className="absolute inset-3 border border-[#C7A257]/40 rounded-full flex items-center justify-center bg-[#C7A257]/[0.06] backdrop-blur-md">
                  <BadgeDollarSign className="w-8 h-8 text-[#C7A257]" />
                </div>
              </motion.div>

              <StepBadge step={3} />
              <h3 className="font-display text-3xl uppercase text-white mb-3 text-center">
                Withdraw Profits
              </h3>
              <p className="text-white/40 font-body text-sm leading-relaxed text-center max-w-[220px]">
                Trade live capital. Keep 90% of profits with on-demand 24h payouts.
              </p>
            </div>
          </BentoCard>

          {/* Card 5 — Wide Feature (2 cols) */}
          <BentoCard
            className="md:col-span-2 lg:col-span-2"
            delay={0.5}
            isInView={isInView}
          >
            <div className="relative z-10 p-7 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pointer-events-none h-full">
              <div className="flex-1">
                <div className="w-11 h-11 bg-black/40 border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-[#C7A257]/30 transition-colors rounded-lg">
                  <Zap className="w-5 h-5 text-[#C7A257]" />
                </div>
                <h3 className="font-display text-2xl uppercase text-white mb-2">
                  Instant Validation
                </h3>
                <p className="text-white/40 font-body text-sm max-w-sm leading-relaxed">
                  Pass your challenge and get live credentials automatically provisioned in seconds.
                </p>
              </div>
              {/* Visual element */}
              <div className="flex-shrink-0 w-full sm:w-48 h-32 bg-[#0A0A0A] border border-white/[0.06] rounded-xl flex flex-col justify-center px-5 relative overflow-hidden group-hover:border-[#C7A257]/20 transition-colors">
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#C7A257]/40 to-transparent translate-x-0 group-hover:translate-x-[-180px] transition-transform duration-1000" />
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-4 h-4 text-white/25" />
                  <div className="h-2 w-20 bg-white/[0.06] rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[#C7A257]/60" />
                  <div className="h-2 w-14 bg-[#C7A257]/25 rounded-full" />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 6 — Standard */}
          <BentoCard delay={0.6} isInView={isInView}>
            <div className="relative z-10 p-7 h-full flex flex-col pointer-events-none">
              <div className="w-11 h-11 bg-black/40 border border-white/[0.08] flex items-center justify-center mb-5 group-hover:border-[#C7A257]/30 transition-colors rounded-lg">
                <BarChart3 className="w-5 h-5 text-white/60 group-hover:text-[#C7A257] transition-colors" />
              </div>
              <h3 className="font-display text-2xl uppercase text-white mb-3">
                Deep Metrics
              </h3>
              <p className="text-white/40 font-body text-sm leading-relaxed">
                Track your edges with our institutional-grade performance dashboard.
              </p>
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}

