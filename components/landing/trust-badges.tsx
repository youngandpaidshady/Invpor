"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { DollarSign, Users, TrendingUp, Clock } from "lucide-react";

/**
 * Trust Section — Magma Design
 * Animated counters, lucide icons, orange accents
 */

const stats = [
  {
    value: 12.8,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    label: "PAID OUT",
    trend: "+$847K this month",
    icon: DollarSign,
  },
  {
    value: 15247,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "TRADERS FUNDED",
    trend: "+312 this week",
    icon: Users,
  },
  {
    value: 92,
    prefix: "",
    suffix: "%",
    decimals: 0,
    label: "PASS RATE",
    trend: "Phase 1 average",
    icon: TrendingUp,
  },
  {
    value: 4.2,
    prefix: "",
    suffix: "hrs",
    decimals: 1,
    label: "AVG PAYOUT TIME",
    trend: "Last 30 days",
    icon: Clock,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function TrustBadges() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-[#111113] border-y border-[#3F3F46]"
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className={`py-10 lg:py-12 px-6 ${i !== stats.length - 1 ? "border-r border-[#3F3F46]" : ""
                  }`}
              >
                <Icon
                  className="w-5 h-5 text-[#F97316] mb-4"
                  strokeWidth={1.5}
                />
                <div className="font-mono text-2xl lg:text-3xl text-white mb-2">
                  {isInView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      separator=","
                    />
                  ) : (
                    `${stat.prefix}0${stat.suffix}`
                  )}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-[#F97316] font-mono">
                  {stat.trend}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
