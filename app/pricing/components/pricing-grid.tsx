"use client";

import { PricingPlan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Check,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface PricingGridProps {
  plans: PricingPlan[];
  discount: number;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatAccountSize(size: number): string {
  if (size >= 1000) return `$${(size / 1000).toFixed(0)}K`;
  return formatPrice(size);
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function PricingGrid({ plans, discount }: PricingGridProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className={cn(
        "grid gap-4 lg:gap-5",
        plans.length <= 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : plans.length === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      )}
    >
      {plans.map((plan) => {
        const finalPrice =
          discount > 0
            ? Math.round(plan.price * (1 - discount / 100))
            : plan.price;
        const isPopular = !!plan.is_popular;

        return (
          <motion.div
            key={plan.id}
            variants={cardIn}
            whileHover={{
              scale: 1.015,
              boxShadow: isPopular
                ? "0 8px 50px rgba(199,162,87,0.18)"
                : "0 8px 40px rgba(0,0,0,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "group relative flex flex-col overflow-hidden",
              isPopular
                ? "bg-[#0c0c0c] border border-[#C7A257]/25"
                : "bg-[#0a0a0a] border border-white/[0.06] hover:border-white/[0.1]"
            )}
          >
            {/* Animated gold top line (featured) */}
            {isPopular && (
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C7A257]/60 to-transparent" />
            )}

            {/* Gold ambient glow (featured) */}
            {isPopular && (
              <div className="absolute inset-0 bg-gradient-to-b from-[#C7A257]/[0.04] via-transparent to-transparent pointer-events-none" />
            )}

            {/* Holographic sheen on hover */}
            <div
              className={cn(
                "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent skew-x-[25deg] pointer-events-none",
                "opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-[1200ms] ease-in-out",
                isPopular ? "via-[#C7A257]/[0.05]" : "via-white/[0.03]"
              )}
            />

            {/* Popular Badge */}
            {isPopular && (
              <div className="absolute top-3 right-3 z-10">
                <motion.span
                  animate={{
                    boxShadow: [
                      "0 0 8px rgba(199,162,87,0.12)",
                      "0 0 16px rgba(199,162,87,0.25)",
                      "0 0 8px rgba(199,162,87,0.12)",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-1 px-2 py-0.5 bg-[#C7A257]/10 border border-[#C7A257]/20 text-[#C7A257] text-[8px] font-bold uppercase tracking-widest"
                >
                  <Sparkles className="w-2.5 h-2.5" /> Most Chosen
                </motion.span>
              </div>
            )}

            {/* Card Content */}
            <div className="relative z-10 flex flex-col h-full p-6">
              {/* Plan Name */}
              <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.15em] mb-3">
                {plan.name}
              </span>

              {/* Account Size */}
              <div className="text-3xl lg:text-4xl font-display text-white tracking-tight mb-1">
                {formatAccountSize(plan.account_size)}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  {discount > 0 && (
                    <span className="text-xs text-white/20 line-through font-mono">
                      {formatPrice(plan.price)}
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-xl font-mono font-bold",
                      isPopular ? "text-[#C7A257]" : "text-white/75"
                    )}
                  >
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="text-[10px] text-white/20 font-mono uppercase tracking-wider">
                    one-time
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className={cn(
                  "h-px mb-5",
                  isPopular
                    ? "bg-gradient-to-r from-transparent via-[#C7A257]/20 to-transparent"
                    : "bg-white/[0.06]"
                )}
              />

              {/* Key Benefits */}
              <div className="space-y-3.5 mb-5">
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5",
                      isPopular
                        ? "bg-[#C7A257]/10 border border-[#C7A257]/15"
                        : "bg-white/[0.03] border border-white/[0.06]"
                    )}
                  >
                    <TrendingUp
                      className={cn(
                        "w-3 h-3",
                        isPopular ? "text-[#C7A257]" : "text-white/35"
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-[13px] text-white/75 font-medium">
                      Keep up to {plan.profit_split}% of profits
                    </p>
                    <p className="text-[10px] text-white/25 mt-0.5">
                      Your earnings, your growth
                    </p>
                  </div>
                </div>

                {plan.profit_target > 0 ? (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/[0.03] border border-white/[0.06]">
                      <Zap className="w-3 h-3 text-white/35" />
                    </div>
                    <div>
                      <p className="text-[13px] text-white/75 font-medium">
                        {plan.profit_target}% profit target
                      </p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        Prove consistency, unlock funding
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 bg-emerald-500/10 border border-emerald-500/15">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[13px] text-white/75 font-medium">
                        No target required
                      </p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        Start trading immediately
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/[0.03] border border-white/[0.06]">
                    <Shield className="w-3 h-3 text-white/35" />
                  </div>
                  <div>
                    <p className="text-[13px] text-white/75 font-medium">
                      {plan.max_drawdown}% max drawdown
                    </p>
                    <p className="text-[10px] text-white/25 mt-0.5">
                      {plan.daily_drawdown}% daily limit
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-[11px] text-white/45"
                  >
                    <Check
                      className={cn(
                        "w-3 h-3 flex-shrink-0",
                        isPopular ? "text-[#C7A257]" : "text-white/20"
                      )}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/checkout/${plan.id}`}
                className={cn(
                  "group/btn relative flex items-center justify-center gap-2 py-3.5 text-[10px] font-bold font-mono uppercase tracking-[0.15em] transition-all overflow-hidden active:scale-[0.97]",
                  isPopular
                    ? "bg-gradient-to-r from-[#C7A257] to-[#D4AF37] text-black shadow-[0_0_20px_rgba(199,162,87,0.12)] hover:shadow-[0_0_35px_rgba(199,162,87,0.25)]"
                    : "bg-white/[0.03] text-white/60 border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
                )}
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full duration-700 ease-out" />
                <span className="relative z-10">Get Funded</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
