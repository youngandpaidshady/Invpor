"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/**
 * Hero Section — Magma Design System
 * Split layout: left = typography, right = 3D interactive card
 * Orange spotlight background, framer-motion entrance animations
 */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fundingOptions = [
  { size: "$10K", price: "$99", popular: false },
  { size: "$25K", price: "$199", popular: false },
  { size: "$50K", price: "$299", popular: true },
  { size: "$100K", price: "$499", popular: false },
  { size: "$200K", price: "$999", popular: false },
];

function Card3D() {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative bg-[#111113]/80 backdrop-blur-xl border border-[#3F3F46] p-8 lg:p-10 hover:border-[#F97316]/50 transition-colors duration-300"
      >
        {/* Orange glow reflection */}
        <div className="absolute -inset-px bg-gradient-to-b from-[#F97316]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#3F3F46]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A1A1AA] font-medium">
              FUNDING OPTIONS
            </span>
            <span className="text-xs font-mono text-[#F97316]">INSTANT</span>
          </div>

          <div className="space-y-3">
            {fundingOptions.map((option) => (
              <div
                key={option.size}
                className={`flex items-center justify-between py-3 px-4 border transition-colors cursor-pointer ${option.popular
                    ? "border-[#F97316]/50 bg-[#F97316]/5"
                    : "border-[#27272A] hover:border-[#F97316]/30"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-lg text-white">
                    {option.size}
                  </span>
                  {option.popular && (
                    <span className="badge-success">POPULAR</span>
                  )}
                </div>
                <span className="font-mono text-[#A1A1AA]">
                  {option.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#3F3F46]">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-mono text-xl text-[#F97316]">90%</div>
                <div className="text-[10px] uppercase tracking-wider text-[#71717A] mt-1">
                  PROFIT SPLIT
                </div>
              </div>
              <div>
                <div className="font-mono text-xl text-[#F97316]">24H</div>
                <div className="text-[10px] uppercase tracking-wider text-[#71717A] mt-1">
                  PAYOUTS
                </div>
              </div>
              <div>
                <div className="font-mono text-xl text-[#F97316]">&infin;</div>
                <div className="text-[10px] uppercase tracking-wider text-[#71717A] mt-1">
                  TRADING DAYS
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#09090B] overflow-hidden">
      {/* Orange radial spotlight */}
      <div className="absolute inset-0 magma-spotlight" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top info bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="container-wide py-4 mt-16 flex items-center justify-between border-b border-[#27272A]"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#F97316] animate-pulse-live rounded-full" />
            <span className="text-xs font-mono text-[#A1A1AA]">LIVE</span>
            <span className="text-xs font-mono text-[#3F3F46]">|</span>
            <span className="text-xs font-mono text-[#A1A1AA]">
              47 funded today
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-mono">
            <div>
              <span className="text-[#71717A]">TOTAL PAID</span>
              <span className="ml-2 text-[#F97316] font-medium">$12.8M</span>
            </div>
            <div>
              <span className="text-[#71717A]">TRADERS</span>
              <span className="ml-2 text-white font-medium">15,247</span>
            </div>
          </div>
        </motion.div>

        {/* Main hero content */}
        <div className="flex-1 flex items-center">
          <div className="container-wide py-16 lg:py-0">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
              {/* Left — Typography */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.p
                  variants={itemVariants}
                  className="eyebrow mb-6"
                >
                  PROPRIETARY TRADING FIRM
                </motion.p>

                <motion.h1 variants={itemVariants} className="mb-8">
                  <span className="block font-display text-display-2xl font-bold uppercase leading-[0.85] tracking-[-0.03em] text-white">
                    INSTITUTIONAL
                  </span>
                  <span className="block font-display text-display-2xl font-bold uppercase leading-[0.85] tracking-[-0.03em]">
                    <span className="text-white">TRADING FOR</span>
                  </span>
                  <span className="block font-display text-display-2xl font-bold uppercase leading-[0.85] tracking-[-0.03em]">
                    <span className="text-[#F97316]">THE ELITE</span>
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-[#A1A1AA] max-w-md leading-relaxed mb-10"
                >
                  Up to $200K funding. 90% profit split.
                  <br />
                  On-demand payouts. No hidden rules.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/pricing" className="btn-primary">
                    GET FUNDED
                  </Link>
                  <Link href="/how-it-works" className="btn-secondary">
                    HOW IT WORKS
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right — 3D Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Card3D />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom activity feed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="border-t border-[#27272A] py-4 overflow-hidden"
        >
          <div className="flex gap-12 animate-ticker whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-12">
                {[
                  "ALEX K. funded $50K",
                  "SAM R. withdrew $4,200",
                  "JORDAN T. passed Phase 1",
                  "TAYLOR M. funded $100K",
                  "MORGAN L. withdrew $8,500",
                  "CASEY J. passed Phase 2",
                ].map((item, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-[#71717A]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
