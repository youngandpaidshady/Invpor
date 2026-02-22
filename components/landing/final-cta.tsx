"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";

/**
 * Final CTA — 21st.dev Spawn Engine Build
 * DNA: Full-Screen Reveal + Glass Surface + Magnetic Warp + Prestige Mood + Cinematic
 * Chaos: Glow Pulse + Dot Matrix + Noise Grain
 */

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const textScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-32 bg-[#010101] overflow-hidden flex flex-col items-center justify-center border-t border-white/[0.04]"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.12] pointer-events-none" />

      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-[120px] -z-10"
        style={{
          width: 900,
          height: 900,
          background: "radial-gradient(circle, rgba(199,162,87,0.06) 0%, transparent 65%)",
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(199,162,87,0.03),transparent_70%)] pointer-events-none -z-20" />

      {/* Content */}
      <div className="container-wide relative z-10 flex flex-col items-center justify-center text-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex flex-wrap items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-10 glow-pulse"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C7A257]" />
          <span className="text-[10px] sm:text-xs font-mono text-white/60 uppercase tracking-[0.2em]">
            Evaluation Phase
          </span>
          <span className="w-1 h-1 bg-white/15 relative" />
          <span className="text-[10px] sm:text-xs font-mono text-[#C7A257] uppercase tracking-[0.2em]">
            Instantly Unlocked
          </span>
        </motion.div>

        {/* Massive Reveal */}
        <motion.div style={{ scale: textScale, opacity: textOpacity, y: yOffset }} className="mb-12 cursor-default">
          <h2 className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] tracking-tight uppercase text-white">
            <span className="block text-white/35">It&apos;s Time To</span>
            <span className="block shimmer-gold relative">
              Scale Up.
            </span>
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-white/40 font-body max-w-2xl leading-relaxed mb-16"
        >
          Stop trading small accounts with poor leverage. Institutional capital awaits. Get funded up to $200k in 24 hours.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <Link href="/pricing" className="group relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C7A257]/0 via-[#C7A257]/30 to-[#C7A257]/0 blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative px-10 py-5 bg-[#080808] border border-white/[0.1] group-hover:border-[#C7A257]/40 overflow-hidden transition-colors shimmer-button active:scale-95">
              <div className="absolute inset-0 bg-[#C7A257]/[0.04] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 font-mono text-white group-hover:text-[#C7A257] font-bold uppercase tracking-[0.15em] flex items-center gap-3 transition-colors">
                Get Funded <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          <Link href="/rules" className="group flex items-center gap-2 px-6 py-4 text-white/40 hover:text-white font-mono uppercase tracking-[0.15em] text-sm transition-colors border-b border-transparent hover:border-white/20">
            Read the Rules <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 pt-10 border-t border-white/[0.04] flex flex-wrap items-center justify-center gap-8 md:gap-16 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/25"
        >
          <div>Over <span className="text-white/70">15,000+</span> Active Traders</div>
          <div className="hidden sm:block w-1 h-1 bg-white/[0.08]" />
          <div><span className="text-[#C7A257]">24-Hour</span> Payout SLA</div>
          <div className="hidden sm:block w-1 h-1 bg-white/[0.08]" />
          <div>Raw <span className="text-[#C7A257]">0.0</span> Spreads</div>
        </motion.div>
      </div>
    </section>
  );
}
