"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

/**
 * Social Proof — 21st.dev Spawn Engine Build
 * DNA: Infinite Marquee + Glass Surface + Spring Reveal + Prestige Mood + Layered Composition
 * Chaos: Holographic Sheen + Glow Pulse + Shadow Elevation Shift
 */

const testimonialsRow1 = [
  {
    quote: "Withdrew $12K in my first month. No games, no delays — just a clean process from start to finish.",
    author: "Alex K.", role: "Funded Trader", funded: "$100K", rating: 5,
  },
  {
    quote: "The evaluation rules make sense and are achievable. Passed my challenge in 3 weeks during low volatility.",
    author: "Jordan T.", role: "Funded Trader", funded: "$200K", rating: 5,
  },
  {
    quote: "Finally a prop firm that actually pays. My withdrawal was processed in under 4 hours.",
    author: "Sam R.", role: "Funded Trader", funded: "$50K", rating: 5,
  },
  {
    quote: "The spread on gold is incredible. Execution has been flawless since I got my live account.",
    author: "David M.", role: "Funded Trader", funded: "$25K", rating: 5,
  },
];

const testimonialsRow2 = [
  {
    quote: "I've traded with 5 different firms. This is the only one where slippage hasn't eaten my profits.",
    author: "Marcus L.", role: "Elite Trader", funded: "$200K", rating: 5,
  },
  {
    quote: "System dashboard is clean. Instant automated upgrades once you hit the 8% target.",
    author: "Sarah J.", role: "Funded Trader", funded: "$100K", rating: 5,
  },
  {
    quote: "Crypto payouts are a game changer. Requested USDC at 9AM, received at 11AM.",
    author: "Elena V.", role: "Funded Trader", funded: "$50K", rating: 5,
  },
  {
    quote: "Zero hidden rules. They actually want you to succeed, which is rare in this industry.",
    author: "Tom H.", role: "Funded Trader", funded: "$10K", rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-[#C7A257] text-[#C7A257] drop-shadow-[0_0_6px_rgba(199,162,87,0.5)]" : "text-white/10"}`}
          strokeWidth={1}
        />
      ))}
    </div>
  );
}

interface ReviewData {
  quote: string;
  author: string;
  role: string;
  funded: string;
  rating: number;
}

function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[420px] p-6 bg-white/[0.015] border border-white/[0.06] backdrop-blur-xl relative overflow-hidden group hover:border-[#C7A257]/20 transition-colors duration-500 holographic-sheen">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C7A257]/[0.06] rounded-full blur-[60px] pointer-events-none group-hover:bg-[#C7A257]/[0.12] transition-colors" />

      <div className="relative z-10">
        <StarRating rating={review.rating} />
        <p className="text-white/70 font-body text-sm md:text-base leading-relaxed mb-8 h-24">
          &ldquo;{review.quote}&rdquo;
        </p>

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A0A0A] border border-white/[0.08] flex items-center justify-center">
              <span className="text-[#C7A257] font-display font-bold text-sm">{review.author.charAt(0)}</span>
            </div>
            <div>
              <div className="text-white text-sm font-bold font-mono">{review.author}</div>
              <div className="text-white/35 text-[10px] uppercase tracking-[0.2em]">{review.role}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/25 uppercase tracking-[0.2em] mb-1">Account</div>
            <div className="text-[#C7A257] font-mono font-bold">{review.funded}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Marquee({ items, direction = "left", speed = 40 }: { items: ReviewData[]; direction?: "left" | "right"; speed?: number }) {
  const [contentWidth, setContentWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
  }, [items]);

  useEffect(() => {
    if (contentWidth === 0) return;

    const startX = direction === "left" ? 0 : -contentWidth;
    const endX = direction === "left" ? -contentWidth : 0;

    controls.start({
      x: [startX, endX],
      transition: {
        duration: speed,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [contentWidth, direction, speed, controls]);

  return (
    <div className="overflow-hidden relative w-full flex">
      <motion.div
        ref={containerRef}
        animate={controls}
        className="flex gap-4 w-max px-2"
      >
        {[...items, ...items].map((item, idx) => (
          <ReviewCard key={idx} review={item} />
        ))}
      </motion.div>
    </div>
  );
}

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="bg-[#010101] relative py-28 lg:py-36 overflow-hidden border-b border-white/[0.04]">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 mix-blend-overlay opacity-[0.03]">
        <h2 className="text-[20vw] font-display uppercase leading-none text-white whitespace-nowrap">
          PROVEN
        </h2>
      </div>

      <motion.div style={{ scale, opacity }} className="relative z-10 w-full">
        {/* Header */}
        <div className="container-wide text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-mono text-[#C7A257]/80 mb-4">
              <ShieldCheck className="w-4 h-4" /> VERIFIED RESULTS
            </span>
            <h2 className="heading-lg text-white mb-6">
              HEAR FROM THE <span className="shimmer-gold">ELITE.</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-mono text-white/35 uppercase tracking-[0.15em]">
              <div className="px-3">
                <strong className="text-white text-lg block">15K+</strong>Active Traders
              </div>
              <div className="w-px h-8 bg-white/[0.06] hidden sm:block" />
              <div className="px-3">
                <strong className="text-white text-lg block">$12.8M</strong>Payouts
              </div>
              <div className="w-px h-8 bg-white/[0.06] hidden sm:block" />
              <div className="px-3">
                <strong className="text-[#C7A257] text-lg block">4.9/5</strong>Trust Score
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquees */}
        <div className="w-full flex flex-col gap-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#010101] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#010101] to-transparent z-20 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Marquee items={testimonialsRow1} direction="left" speed={50} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Marquee items={testimonialsRow2} direction="right" speed={60} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
