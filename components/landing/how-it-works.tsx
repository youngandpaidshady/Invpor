"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wallet, Target, Zap, BadgeDollarSign } from "lucide-react";

/**
 * How It Works — Bento Grid Layout
 * Glassmorphic cards, orange borders on hover, lucide icons
 */

const steps = [
  {
    step: "01",
    title: "CHOOSE YOUR CAPITAL",
    description:
      "Select a funding amount from $10K to $200K. One-time fee. No recurring charges.",
    icon: Wallet,
  },
  {
    step: "02",
    title: "PASS THE EVALUATION",
    description:
      "Hit an 8% profit target with our risk rules. No time limit. Trade at your own pace.",
    icon: Target,
  },
  {
    step: "03",
    title: "GET FUNDED",
    description:
      "Receive your funded account within 24 hours. Real capital. Real trades. Real profits.",
    icon: Zap,
  },
  {
    step: "04",
    title: "WITHDRAW PROFITS",
    description:
      "Request payouts anytime. 90% profit split. Paid within 24 hours to your account.",
    icon: BadgeDollarSign,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section bg-[#09090B]">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 lg:mb-24"
        >
          <p className="eyebrow mb-4">PROCESS</p>
          <h2 className="heading-lg text-white">
            HOW IT<br />
            <span className="text-[#F97316]">WORKS</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-4"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="group relative bg-[#111113]/60 backdrop-blur border border-[#27272A] p-8 lg:p-10 hover:border-[#F97316] transition-all duration-300 hover:shadow-glow-magma-sm"
              >
                {/* Orange corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#F97316]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between mb-6">
                  <div className="font-mono text-4xl lg:text-5xl text-[#F97316]/30 group-hover:text-[#F97316]/60 transition-colors">
                    {step.step}
                  </div>
                  <Icon
                    className="w-6 h-6 text-[#F97316] opacity-50 group-hover:opacity-100 transition-opacity"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-lg uppercase tracking-wide text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
