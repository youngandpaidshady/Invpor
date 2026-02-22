"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Activity, TrendingUp, Users, DollarSign, Target, BarChart3, Clock } from "lucide-react";

/**
 * 21st.dev Super Hero — 3D Bento Split Layout
 * DNA: Cinematic Split + Glass Surface + Isometric 3D Grid + Layered Composition
 * Chaos: Glow Pulse + Holographic Sheen + Dot Matrix Underlay
 * Preserved: DashboardCard (Chart) Below Fold
 */

/* ─── ENGINE CONSTANTS ─── */
const hoverScale = {
  whileHover: { scale: 1.03, boxShadow: "0 0 30px rgba(199,162,87,0.25)" },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 25 },
};

const EASE_CINEMATIC = [0.25, 0.46, 0.45, 0.94] as const;

/* ─── DATA ─── */
const activityFeed = [
  { action: "Funded", amount: "$50K", user: "Alex K.", time: "2m" },
  { action: "Payout", amount: "$4.2K", user: "Sam R.", time: "5m" },
  { action: "Passed", amount: "Phase 1", user: "Jordan", time: "8m" },
];

const heroStats = [
  { icon: TrendingUp, value: "+127%", label: "Avg Return", color: "text-[#C7A257]" },
  { icon: Users, value: "2,847", label: "Traders", color: "text-white" },
  { icon: DollarSign, value: "$2.4M", label: "Payouts", color: "text-[#C7A257]" },
];

/* ─── PROFIT CURVE SVG ─── */
const PROFIT_PATH =
  "M 0 80 C 20 75, 40 70, 60 55 S 100 60, 120 45 S 160 30, 180 35 S 220 20, 240 15 S 270 10, 280 8";
const PROFIT_PATH_LENGTH = 420;

/* ─── 3D ISOMETRIC BENTO GRID (RIGHT COLUMN) ─── */
function BentoGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  // Setup subtle continuous floating animation
  const floatAnim = {
    y: [-4, 4],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] lg:h-auto lg:aspect-square flex items-center justify-center perspective-[2000px] mt-0 lg:mt-0 origin-center">
      {/* 3D Transform Container */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        // Isometric tilt: rotateX(60deg) rotateZ(-45deg) is classic isometric
        // We use slightly gentler angles for a modern "app presentation" feel
        style={{ rotateX: 55, rotateZ: -35 }}
        className="grid grid-cols-2 gap-4 w-[340px] sm:w-[460px] lg:w-[500px] h-[340px] sm:h-[460px] lg:h-[500px] transform-style-3d drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] scale-[0.75] sm:scale-95 lg:scale-100 origin-center"
      >
        {/* Main large block (Top Left, spans 2 rows) */}
        <motion.div
          variants={item}
          animate={floatAnim}
          className="row-span-2 relative bg-[#0A0A0A]/90 backdrop-blur-md border border-[#C7A257]/30 rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_20px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#C7A257]/10 to-transparent opacity-50" />
          <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_top_left,rgba(199,162,87,0.15),transparent_50%)] pointer-events-none" />

          <div className="relative z-10">
            <div className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-[#C7A257] mb-2">Pro Tier</div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-display text-white mb-1">NANOBANANA</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-display text-white/70">PRO 3</div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/40 uppercase">Profit Target</span>
                <span className="text-[#C7A257]">8%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  className="h-full bg-[#C7A257]"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <span className="text-white/40 uppercase">Max Loss</span>
                <span className="text-red-400">10%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  className="h-full bg-red-400/80"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 sm:pt-8">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#C7A257] text-black text-[10px] sm:text-xs font-bold font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(199,162,87,0.4)]">
              Get Funded
            </div>
          </div>
        </motion.div>

        {/* Top Right Block */}
        <motion.div
          variants={item}
          animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 0.5 } }}
          className="relative bg-[#0F0F0F]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-center items-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),_0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay" />
          <Zap className="w-8 h-8 text-[#C7A257] mb-3" strokeWidth={1.5} />
          <div className="text-xl sm:text-2xl font-display text-white">0ms</div>
          <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Slippage</div>
        </motion.div>

        {/* Bottom Right Block */}
        <motion.div
          variants={item}
          animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 1 } }}
          className="relative bg-[#050505]/90 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02),_0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#C7A257]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#C7A257]/70" />
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Payouts</span>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-mono text-white mb-1"><span className="text-[#C7A257]">$</span>12.8M</div>
            <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Total Paid</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── DASHBOARD CARD (Preserved Below Fold) ─── */
function DashboardCard() {
  const [time, setTime] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full holographic-sheen glow-pulse rounded-2xl border border-white/[0.08] bg-[#050505]/95 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-black/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <motion.div
            className="w-2 h-2 bg-[#C7A257] rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] sm:text-xs font-mono text-white/50 tracking-[0.2em] uppercase">
            Performance Pulse
          </span>
        </div>
        <span
          className="text-[10px] sm:text-xs font-mono text-[#C7A257]/80"
          suppressHydrationWarning
        >
          {time || "00:00:00"}
        </span>
      </div>

      {/* Chart Area */}
      <div className="p-4 sm:p-6">
        <div className="relative h-28 sm:h-36 mb-5">
          <svg
            viewBox="0 0 280 90"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {[20, 40, 60, 80].map((y) => (
              <line
                key={y}
                x1="0"
                x2="280"
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="0.5"
              />
            ))}

            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(199, 162, 87, 0.2)" />
                <stop offset="100%" stopColor="rgba(199, 162, 87, 0)" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C7A257" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#C7A257" stopOpacity="1" />
                <stop offset="100%" stopColor="#F0D78C" stopOpacity="1" />
              </linearGradient>
            </defs>

            <path
              d={`${PROFIT_PATH} L 280 90 L 0 90 Z`}
              fill="url(#profitGradient)"
              opacity={isVisible ? 1 : 0}
              style={{ transition: "opacity 1s ease-out 0.5s" }}
            />

            <path
              d={PROFIT_PATH}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                strokeDasharray: PROFIT_PATH_LENGTH,
                strokeDashoffset: isVisible ? 0 : PROFIT_PATH_LENGTH,
                transition: "stroke-dashoffset 2.5s ease-out",
              }}
            />

            {isVisible && (
              <motion.circle
                cx="280"
                cy="8"
                r="3"
                fill="#C7A257"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.4 }}
              >
                <animate
                  attributeName="r"
                  values="3;5;3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </motion.circle>
            )}
          </svg>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.06] overflow-hidden rounded-lg">
          {heroStats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-[#080808] p-3 sm:p-4 text-center relative group"
              whileHover={{ backgroundColor: "rgba(199,162,87,0.03)" }}
            >
              <stat.icon className="w-3 h-3 text-[#C7A257]/40 mx-auto mb-1.5 group-hover:text-[#C7A257]/70 transition-colors" />
              <motion.div
                className={`text-base sm:text-lg font-mono mb-0.5 ${stat.color}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + i * 0.2, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-[8px] sm:text-[9px] font-body text-white/35 tracking-[0.2em] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="border-t border-white/[0.06] px-4 py-3 space-y-1.5 max-h-[140px] overflow-hidden bg-black/40">
        <div className="text-[9px] font-mono text-white/25 tracking-[0.3em] uppercase mb-2 flex items-center gap-1.5">
          <Activity className="w-3 h-3" />
          Live Activity
        </div>
        {activityFeed.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 + i * 0.15, duration: 0.4 }}
            className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono bg-white/[0.015] p-2 border border-white/[0.04] hover:border-[#C7A257]/20 transition-colors rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className={item.action === "Payout" ? "text-[#C7A257]" : "text-white"}>
                {item.action}
              </span>
              <span className="text-white/15">·</span>
              <span className="text-white/60">{item.amount}</span>
            </div>
            <span className="text-white/25">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero Background ─── */
function HeroBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const backgroundGlow = useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(199,162,87,0.06), transparent 50%)`;

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div className="absolute inset-0" style={{ background: backgroundGlow }} />
      <div className="lamp-beam" />
      <div className="absolute inset-0 noise-overlay opacity-[0.12]" />

      {/* Ambient Orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] -top-[400px] right-[-200px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(199,162,87,0.08) 0%, transparent 70%)" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bottom-[-200px] left-[-200px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(199,162,87,0.05) 0%, transparent 70%)" }}
      />
    </div>
  );
}

/* ─── HERO MAIN ─── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const chartY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Preserving the original chart rotation transition
  const chartRotate = useTransform(scrollYProgress, [0, 1], [4, 15]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[100svh] bg-[#010101] pt-28 sm:pt-32 pb-20 flex flex-col items-center justify-start overflow-hidden sm:overflow-visible border-b border-white/[0.04] w-full max-w-[100vw] overflow-x-hidden"
    >
      <HeroBackground />

      <div className="container-wide relative z-10 w-full px-4 sm:px-6 lg:px-8 mt-8 lg:mt-16">

        {/* ─── TOP SECTION: SIDE-BY-SIDE SPLIT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">

          {/* Left Column: Typography & CTAs */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE_CINEMATIC }}
            >
              <h1 className="font-display text-[clamp(2.2rem,8vw,5.5rem)] sm:text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tight text-white uppercase mb-6">
                <span className="block opacity-90">Unlock Your</span>
                <span className="block shimmer-gold mt-1">Edge. Trade</span>
                <span className="block opacity-90 mt-1">Without Limits.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_CINEMATIC }}
              className="font-body text-base sm:text-lg lg:text-xl text-white/50 leading-relaxed mb-10 max-w-xl"
            >
              Get funded up to <strong className="text-white/90">$200,000</strong>. Keep up to{" "}
              <strong className="text-[#C7A257]">90% of profits</strong>.
              The prop firm built for elite execution, zero hidden rules.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_CINEMATIC }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/pricing"
                className="shimmer-button w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#C7A257] text-black text-sm font-bold font-mono uppercase tracking-[0.15em] rounded-lg shadow-[0_0_20px_rgba(199,162,87,0.2)] hover:shadow-[0_0_30px_rgba(199,162,87,0.4)] transition-all active:scale-95"
              >
                <span className="relative z-10">Get Funded</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/how-it-works"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white/60 hover:text-white font-mono uppercase tracking-[0.15em] hover:bg-white/[0.03] border border-white/10 hover:border-[#C7A257]/40 rounded-lg transition-all active:scale-95"
              >
                How It Works
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 3D Bento Grid */}
          <div className="w-full flex items-center justify-center lg:justify-end">
            <BentoGrid />
          </div>
        </div>

        {/* ─── BOTTOM SECTION: PRESERVED DASHBOARD CHART ─── */}
        <div className="relative w-full max-w-5xl mx-auto" style={{ perspective: "2000px" }}>
          <div className="absolute -inset-x-20 -top-20 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
          <motion.div
            style={{ y: chartY, rotateX: chartRotate, rotateZ: 0 }}
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 4 }}
            transition={{ duration: 1.4, delay: 0.6, ease: EASE_CINEMATIC }}
            className="w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] mx-auto relative z-0"
          >
            {/* Dark glass platform under chart */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] -m-4 backdrop-blur-3xl -z-10" />
            <DashboardCard />
          </motion.div>
        </div>

      </div>

      {/* Gradient floor */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#010101] to-transparent z-20 pointer-events-none" />
    </motion.section>
  );
}
