"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  Zap,
  Shield,
  Sparkles,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/lib/constants";
import { ChallengeType, PricingPlan } from "@/lib/types";

/**
 * 21st.dev Pricing Preview — Dark Premium Institutional Design
 *
 * DNA: Glass Surface · 3D Tilt Cursor · Shadow Bloom Hover · Premium Gold/Black
 * Chaos: Animated conic border (featured), holographic sheen, glow pulse
 * Inspiration: FTMO, Funded Next — clean hierarchy, institutional fintech feel
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const challengeTypes: {
  id: ChallengeType;
  label: string;
  icon: typeof TrendingUp;
  desc: string;
  badge?: string;
}[] = [
    {
      id: "2-step",
      label: "2-Step",
      icon: TrendingUp,
      desc: "Two-phase evaluation — the proven path to a funded account",
    },
    {
      id: "1-step",
      label: "1-Step",
      icon: Clock,
      desc: "Single evaluation — reach your target and start trading live",
      badge: "Popular",
    },
    {
      id: "instant",
      label: "Instant",
      icon: Zap,
      desc: "No evaluation required — start trading with our capital immediately",
      badge: "New",
    },
  ];

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatAccountSize(size: number): string {
  if (size >= 1000) return `$${(size / 1000).toFixed(0)}K`;
  return formatPrice(size);
}

/* ═══════════════════════════════════════════════════════════
   PRICING CARD — 3D Tilt Glass + Premium Surface
   ═══════════════════════════════════════════════════════════ */
function PricingCard({ plan }: { plan: PricingPlan }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, 400], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 400], [-4, 4]);

  const spring = { damping: 25, stiffness: 200, mass: 0.6 };
  const sRotateX = useSpring(rotateX, spring);
  const sRotateY = useSpring(rotateY, spring);

  const handleMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(200);
    mouseY.set(200);
  }, [mouseX, mouseY]);

  const isPopular = !!plan.is_popular;
  const spotColor = isPopular
    ? "rgba(199,162,87,0.15)"
    : "rgba(255,255,255,0.06)";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: {
          opacity: 1,
          y: isPopular ? -6 : 0,
          scale: 1,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
      style={{ perspective: 900 }}
      className="h-full group"
    >
      <motion.div
        style={{
          rotateX: sRotateX,
          rotateY: sRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.015,
          boxShadow: isPopular
            ? "0 8px 50px rgba(199,162,87,0.18)"
            : "0 8px 40px rgba(0,0,0,0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative flex flex-col h-full overflow-hidden",
          isPopular
            ? "bg-[#0c0c0c]"
            : "bg-[#0a0a0a] border border-white/[0.06]"
        )}
      >
        {/* ── Animated conic border (featured only) ── */}
        {isPopular && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, transparent 60%, #C7A257 72%, #F0D78C 80%, #C7A257 88%, transparent 100%)",
              }}
            />
            <div className="absolute inset-[1px] bg-[#0c0c0c] z-10" />
          </div>
        )}

        {/* ── Noise texture ── */}
        <div
          className="absolute inset-0 z-[1] mix-blend-overlay opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── Cursor spotlight ── */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-[2]"
          style={{
            background: useMotionTemplate`
              radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${spotColor}, transparent 80%)
            `,
          }}
        />

        {/* ── Holographic sheen sweep ── */}
        <div
          className={cn(
            "absolute inset-0 z-[2] -translate-x-full bg-gradient-to-r from-transparent to-transparent skew-x-[25deg] pointer-events-none",
            "opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-[1200ms] ease-in-out",
            isPopular ? "via-[#C7A257]/[0.06]" : "via-white/[0.04]"
          )}
        />

        {/* ── Gold ambient glow (featured) ── */}
        {isPopular && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#C7A257]/[0.05] via-transparent to-[#C7A257]/[0.02] pointer-events-none z-[2]" />
        )}

        {/* ═══ CARD CONTENT ═══ */}
        <div
          className="relative z-10 flex flex-col h-full p-6 lg:p-7"
          style={{ transform: "translateZ(16px)" }}
        >
          {/* ── Header: Plan Name + Badge ── */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/35 font-mono text-[10px] uppercase tracking-[0.15em]">
              {plan.name}
            </span>
            {isPopular && (
              <motion.span
                animate={{
                  boxShadow: [
                    "0 0 8px rgba(199,162,87,0.12)",
                    "0 0 16px rgba(199,162,87,0.25)",
                    "0 0 8px rgba(199,162,87,0.12)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="flex items-center gap-1 px-2 py-0.5 bg-[#C7A257]/10 border border-[#C7A257]/20 text-[#C7A257] text-[8px] font-bold uppercase tracking-widest"
              >
                <Sparkles className="w-2.5 h-2.5" /> Most Chosen
              </motion.span>
            )}
          </div>

          {/* ── Hero: Account Size ── */}
          <div className="mb-1">
            <span className="text-4xl lg:text-[2.75rem] font-display text-white tracking-tight leading-none">
              {formatAccountSize(plan.account_size)}
            </span>
          </div>

          {/* ── Price ── */}
          <div className="mb-6">
            <div className="flex items-baseline gap-1.5">
              <span
                className={cn(
                  "text-xl font-mono font-bold",
                  isPopular ? "text-[#C7A257]" : "text-white/80"
                )}
              >
                {formatPrice(plan.price)}
              </span>
              <span className="text-[10px] text-white/25 font-mono uppercase tracking-wider">
                one-time
              </span>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className={cn(
              "h-px mb-6",
              isPopular
                ? "bg-gradient-to-r from-transparent via-[#C7A257]/25 to-transparent"
                : "bg-white/[0.06]"
            )}
          />

          {/* ── Key Benefits — Natural Language ── */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5",
                  isPopular
                    ? "bg-[#C7A257]/10 border border-[#C7A257]/20"
                    : "bg-white/[0.03] border border-white/[0.06]"
                )}
              >
                <TrendingUp
                  className={cn(
                    "w-3.5 h-3.5",
                    isPopular ? "text-[#C7A257]" : "text-white/40"
                  )}
                />
              </div>
              <div>
                <p className="text-sm text-white/80 font-medium leading-snug">
                  Keep up to {plan.profit_split}% of profits
                </p>
                <p className="text-[11px] text-white/30 mt-0.5">
                  Your earnings, your capital growth
                </p>
              </div>
            </div>

            {plan.profit_target > 0 ? (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/[0.03] border border-white/[0.06]">
                  <Zap className="w-3.5 h-3.5 text-white/40" />
                </div>
                <div>
                  <p className="text-sm text-white/80 font-medium leading-snug">
                    {plan.profit_target}% profit target
                  </p>
                  <p className="text-[11px] text-white/30 mt-0.5">
                    Demonstrate consistency, unlock your account
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5 bg-emerald-500/10 border border-emerald-500/15">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-white/80 font-medium leading-snug">
                    No profit target required
                  </p>
                  <p className="text-[11px] text-white/30 mt-0.5">
                    Trade immediately with live capital
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/[0.03] border border-white/[0.06]">
                <Shield className="w-3.5 h-3.5 text-white/40" />
              </div>
              <div>
                <p className="text-sm text-white/80 font-medium leading-snug">
                  {plan.max_drawdown}% maximum drawdown
                </p>
                <p className="text-[11px] text-white/30 mt-0.5">
                  {plan.daily_drawdown}% daily limit — built-in risk management
                </p>
              </div>
            </div>
          </div>

          {/* ── Features Checklist ── */}
          <ul className="space-y-2.5 mb-7 flex-1">
            {plan.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 text-[12px] text-white/50"
              >
                <Check
                  className={cn(
                    "w-3.5 h-3.5 flex-shrink-0",
                    isPopular ? "text-[#C7A257]" : "text-white/25"
                  )}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* ── CTA Button ── */}
          <Link
            href={`/checkout/${plan.id}`}
            className={cn(
              "group/btn relative flex items-center justify-center gap-2 py-4 text-xs font-bold font-mono uppercase tracking-[0.15em] transition-all overflow-hidden active:scale-[0.97]",
              isPopular
                ? "bg-gradient-to-r from-[#C7A257] to-[#D4AF37] text-black shadow-[0_0_25px_rgba(199,162,87,0.12)] hover:shadow-[0_0_40px_rgba(199,162,87,0.25)]"
                : "bg-white/[0.03] text-white/70 border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]"
            )}
          >
            {/* Glossy sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full duration-700 ease-out" />
            <span className="relative z-10">Get Funded</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOBILE CAROUSEL
   ═══════════════════════════════════════════════════════════ */
function MobileCarousel({ plans }: { plans: PricingPlan[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative md:hidden">
      <div
        ref={scrollRef}
        className="flex gap-3 px-4 pb-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex-shrink-0 w-[84vw] max-w-[340px] snap-center"
          >
            <PricingCard plan={plan} />
          </div>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESKTOP GRID
   ═══════════════════════════════════════════════════════════ */
function DesktopGrid({ plans }: { plans: PricingPlan[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={stagger}
      className={cn(
        "grid gap-4 lg:gap-5 items-stretch",
        plans.length <= 3
          ? "grid-cols-1 md:grid-cols-3"
          : plans.length === 4
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      )}
    >
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════ */
export function PricingPreview() {
  const [activeTab, setActiveTab] = useState<ChallengeType>("2-step");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const currentPlans = useMemo(
    () => PRICING_PLANS.filter((p) => p.type === activeTab),
    [activeTab]
  );

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative overflow-hidden bg-black border-y border-white/[0.04]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(199,162,87,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(199,162,87,0.06),transparent_55%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 py-20 lg:py-32 relative z-10">
        {/* ─── HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] mb-6 backdrop-blur">
            <span className="w-1.5 h-1.5 bg-[#C7A257] animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C7A257]">
              Investment Programs
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display text-white tracking-tight leading-[1.1] mb-4">
            Transparent pricing,{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7A257] via-[#F0D78C] to-[#C7A257]">
              real performance.
            </span>
          </h2>

          <p className="text-base text-white/35 leading-relaxed max-w-lg mx-auto">
            One upfront fee. No subscriptions. No hidden costs.
            Your fee is fully refundable once you pass the evaluation.
          </p>
        </motion.div>

        {/* ─── TAB SWITCHER ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex p-1 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl overflow-x-auto max-w-[92vw] no-scrollbar">
            {challengeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                aria-pressed={activeTab === type.id}
                className={cn(
                  "group relative flex items-center justify-center gap-1.5 px-5 sm:px-8 py-3 text-xs sm:text-sm font-mono uppercase tracking-widest transition-colors whitespace-nowrap",
                  activeTab === type.id
                    ? "text-[#C7A257]"
                    : "text-white/30 hover:text-white/50"
                )}
              >
                {activeTab === type.id && (
                  <motion.span
                    layoutId="pricingTab"
                    className="absolute inset-0 bg-[#C7A257]/[0.06] border border-[#C7A257]/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <type.icon className="w-3.5 h-3.5 relative z-10" strokeWidth={2.5} />
                <span className="relative z-10">{type.label}</span>
                {type.badge && activeTab !== type.id && (
                  <span className="absolute -top-1.5 -right-1 bg-[#C7A257]/10 border border-[#C7A257]/20 text-[#C7A257] text-[7px] px-1.5 py-0.5 font-bold uppercase tracking-wider">
                    {type.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Context description */}
        <div className="h-6 flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
              transition={{ duration: 0.2 }}
              className="text-white/30 text-sm text-center max-w-md"
            >
              {challengeTypes.find((t) => t.id === activeTab)?.desc}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ─── CARDS ─── */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MobileCarousel plans={currentPlans} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <DesktopGrid key={activeTab} plans={currentPlans} />
          </AnimatePresence>
        </div>

        {/* ─── TRUST BAR ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 px-5 py-4 bg-white/[0.015] border border-white/[0.04]"
        >
          <div className="flex items-center flex-wrap justify-center gap-5 text-[10px] text-white/30 font-mono uppercase tracking-[0.12em]">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#C7A257]" /> Secure
              Payments
            </div>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C7A257]" /> Instant Account
              Setup
            </div>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#C7A257]" /> Crypto Accepted
            </div>
          </div>

          <Link
            href="/pricing"
            className="group relative flex items-center gap-2 px-5 py-2.5 border border-white/[0.06] text-[10px] text-white/50 hover:bg-white/[0.03] hover:text-white/70 hover:border-white/[0.12] transition-all font-mono uppercase tracking-widest active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C7A257]/[0.04] to-transparent group-hover:translate-x-full duration-700 ease-out" />
            <span className="relative z-10">View All Plans</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C7A257] relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
