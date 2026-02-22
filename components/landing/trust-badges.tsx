"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Native animated counter — replaces react-countup to avoid webpack CJS issues
function useAnimatedCounter(
  target: number,
  decimals: number,
  active: boolean
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 2500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, decimals]);
  return value;
}

/**
 * Trust / Stats Section — BraxleyNevim
 * Archetype: "Number Flow" animated counters + glass cards with glow rings (21st.dev)
 *
 * Each stat gets a unique visual treatment:
 * - Progress ring SVG that draws on scroll-in
 * - Glass card with radial glow pulse
 * - Spring-interpolated counter
 */

const stats = [
  {
    value: 12.8,
    prefix: "$",
    suffix: "M+",
    decimals: 1,
    label: "Total Paid Out",
    detail: "+$847K this month",
    ring: 88,
    color: "#C7A257",
  },
  {
    value: 15247,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Traders Funded",
    detail: "+312 this week",
    ring: 72,
    color: "#C7A257",
  },
  {
    value: 92,
    prefix: "",
    suffix: "%",
    decimals: 0,
    label: "Phase 1 Pass Rate",
    detail: "Industry leading",
    ring: 92,
    color: "#C7A257",
  },
  {
    value: 4.2,
    prefix: "",
    suffix: "hrs",
    decimals: 1,
    label: "Avg. Payout Speed",
    detail: "Last 30 days",
    ring: 95,
    color: "#C7A257",
  },
];

const RING_SIZE = 64;
const STROKE = 3;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function StatCounter({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useAnimatedCounter(stat.value, stat.decimals, active);
  const formatted = stat.decimals > 0
    ? count.toFixed(stat.decimals)
    : Math.floor(count).toLocaleString();
  return <>{stat.prefix}{formatted}{stat.suffix}</>;
}

function ProgressRing({
  percent,
  color,
  animate,
}: {
  percent: number;
  color: string;
  animate: boolean;
}) {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <svg
      width={RING_SIZE}
      height={RING_SIZE}
      className="absolute -top-2 -right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
    >
      {/* Background track */}
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={STROKE}
      />
      {/* Animated arc */}
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={animate ? offset : CIRCUMFERENCE}
        style={{
          transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: "rotate(-90deg)",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
}

export function TrustBadges() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <section
      ref={ref}
      className="bg-black border-y border-[#333333] relative overflow-hidden"
    >
      {/* Radial glow behind entire section */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(199,162,87,0.03), transparent 70%)",
        }}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 w-full relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -6,
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }}
            className={`group relative py-10 lg:py-16 px-6 lg:px-8 text-center cursor-default overflow-hidden
              ${i < stats.length - 1 ? "border-r border-[#333333]" : ""}
              ${i < 2 ? "border-b lg:border-b-0 border-[#333333]" : ""}
            `}
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-[#050505] group-hover:bg-[#080808] transition-colors duration-500" />

            {/* Radial glow on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(199,162,87,0.06), transparent 60%)",
              }}
            />

            {/* Progress ring */}
            <ProgressRing
              percent={stat.ring}
              color={stat.color}
              animate={isInView}
            />

            {/* Accent line — expands on hover with glow */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] origin-center"
              style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileHover={{ scaleX: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />

            {/* Counter */}
            <motion.div
              className="relative z-10 font-mono text-4xl lg:text-5xl text-white mb-3 tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatCounter stat={stat} active={isInView} />
            </motion.div>

            <div className="relative z-10 text-sm font-body text-white/60 mb-2 group-hover:text-white transition-colors duration-300">
              {stat.label}
            </div>

            <motion.div
              className="relative z-10 text-xs text-[#C7A257]/60 font-mono group-hover:text-[#C7A257] transition-colors duration-300"
              initial={{ opacity: 0, y: 5 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5 + i * 0.2, duration: 0.4 }}
            >
              {stat.detail}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
