"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Target,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 21st.dev Pricing Preview — Compact Card + Snap-Scroll Carousel
 *
 * Skills referenced:
 *  - pricing-sections.md: dark-gradient-pricing archetype, AnimatePresence tabs
 *  - carousels.md: CSS scroll-snap mobile carousel, edge fade, pagination dots
 *  - cards.md: layered composition (bg → surface → interaction), spotlight hover
 *  - SKILL.md: brand gold #C7A257, fadeInUp entrance, spring hover physics
 */

/* ─── ANIMATION CONSTANTS ─── */
const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CARD = { type: "spring", stiffness: 300, damping: 25 };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUpCard = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (isPopular: boolean) => ({
    opacity: 1,
    y: isPopular ? -8 : 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  }),
};

/* ─── DATA ─── */
const challengeTypes = [
  { id: "2-step", label: "2-Step", icon: TrendingUp, desc: "The standard evaluation path" },
  { id: "1-step", label: "1-Step", icon: Clock, desc: "Fast-track funding", badge: "Popular" },
  { id: "instant", label: "Instant", icon: Zap, desc: "Skip the evaluation", badge: "New" },
];

interface Plan {
  id: string;
  name: string;
  size: string;
  price: number;
  originalPrice?: number;
  profitTarget: string;
  maxDrawdown: string;
  dailyDrawdown: string;
  profitSplit: number;
  features: string[];
  isPopular?: boolean;
}

const challengeData: Record<string, Plan[]> = {
  "2-step": [
    {
      id: "starter", name: "Starter", size: "$10K", price: 99,
      profitTarget: "8%", maxDrawdown: "10%", dailyDrawdown: "5%", profitSplit: 80,
      features: ["Unlimited Trading Days", "Refundable Fee", "Bi-weekly Payouts"],
    },
    {
      id: "pro", name: "Professional", size: "$50K", price: 299, originalPrice: 349,
      profitTarget: "8%", maxDrawdown: "10%", dailyDrawdown: "5%", profitSplit: 85,
      features: ["Unlimited Trading Days", "Refundable Fee", "Weekly Payouts", "Priority Support"],
      isPopular: true,
    },
    {
      id: "elite", name: "Elite", size: "$200K", price: 999,
      profitTarget: "8%", maxDrawdown: "10%", dailyDrawdown: "5%", profitSplit: 90,
      features: ["Unlimited Trading Days", "Refundable Fee", "Same-day Payouts", "Personal Manager", "Premium Dashboard Access"],
    },
  ],
  "1-step": [
    {
      id: "starter", name: "Accelerated Starter", size: "$10K", price: 149,
      profitTarget: "10%", maxDrawdown: "6%", dailyDrawdown: "4%", profitSplit: 80,
      features: ["Single Phase", "No Time Limits", "Bi-weekly Payouts"],
    },
    {
      id: "pro", name: "Accelerated Pro", size: "$50K", price: 399, originalPrice: 449,
      profitTarget: "10%", maxDrawdown: "6%", dailyDrawdown: "4%", profitSplit: 85,
      features: ["Single Phase", "No Time Limits", "Weekly Payouts", "Priority Support"],
      isPopular: true,
    },
    {
      id: "elite", name: "Accelerated Elite", size: "$100K", price: 799,
      profitTarget: "10%", maxDrawdown: "6%", dailyDrawdown: "4%", profitSplit: 90,
      features: ["Single Phase", "No Time Limits", "Same-day Payouts", "Direct Slack Channel"],
    },
  ],
  instant: [
    {
      id: "starter", name: "Direct Small", size: "$5K", price: 199,
      profitTarget: "None", maxDrawdown: "8%", dailyDrawdown: "4%", profitSplit: 70,
      features: ["No Evaluation", "Instant Funding", "Weekly Payouts"],
    },
    {
      id: "pro", name: "Direct Medium", size: "$25K", price: 699,
      profitTarget: "None", maxDrawdown: "8%", dailyDrawdown: "4%", profitSplit: 75,
      features: ["No Evaluation", "Instant Funding", "Bi-weekly Payouts", "Priority Support"],
      isPopular: true,
    },
    {
      id: "elite", name: "Direct Large", size: "$50K", price: 1299,
      profitTarget: "None", maxDrawdown: "8%", dailyDrawdown: "4%", profitSplit: 80,
      features: ["No Evaluation", "Instant Funding", "Unlimited Scaling", "VIP Concierge"],
    },
  ],
};

/* ─── COMPACT PLAN CARD ─── */
function CompactPlanCard({ plan, challengeType }: { plan: Plan; challengeType: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, 400], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 400], [-4, 4]);

  const springConfig = { damping: 20, stiffness: 200, mass: 1 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(200); // approximate center to reset
    mouseY.set(200);
  }

  const isPopular = !!plan.isPopular;
  const spotLightColor = isPopular ? "rgba(199,162,87,0.15)" : "rgba(255,255,255,0.06)";

  const metrics = [
    { label: "Target", value: plan.profitTarget, icon: Target, primary: true },
    { label: "Split", value: `${plan.profitSplit}%`, icon: TrendingUp, primary: true },
    { label: "Max DD", value: plan.maxDrawdown, icon: BarChart3 },
    { label: "Daily DD", value: plan.dailyDrawdown, icon: BarChart3 },
  ];

  return (
    <motion.div
      custom={isPopular}
      variants={fadeUpCard}
      style={{ perspective: 1000 }}
      className="h-full group"
    >
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative flex flex-col h-full rounded-2xl overflow-hidden bg-[#050505] backdrop-blur-xl",
          !isPopular && "border border-white/10"
        )}
      >
        {/* Animated Conic Gradient Border (Only for Popular) */}
        {isPopular && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, transparent 60%, #C7A257 80%, transparent 100%)",
              }}
            />
            {/* Inner background mask to create the 1px border effect */}
            <div className="absolute inset-[1px] bg-[#0A0A0A] rounded-2xl z-10" />
          </div>
        )}

        {/* Noise Grain Texture overlay */}
        <div
          className="absolute inset-0 z-[1] mix-blend-overlay opacity-30 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Hover Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-[2]"
          style={{
            background: useMotionTemplate`
              radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${spotLightColor}, transparent 80%)
            `,
          }}
        />

        {/* Holographic Sheen Sweep on Hover */}
        <div className="absolute inset-0 z-[2] -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-1000 ease-in-out" />

        {/* Popular fixed glow overlay */}
        {isPopular && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#C7A257]/[0.05] to-transparent pointer-events-none z-[2]" />
        )}

        {/* Card Body */}
        <div className="relative z-10 flex flex-col p-4 md:p-6 h-full" style={{ transform: "translateZ(20px)" }}>

          {/* Row 1: Name + Badge */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white/50 font-mono text-[10px] uppercase tracking-widest">{plan.name}</h3>
            {isPopular && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C7A257]/10 border border-[#C7A257]/20 text-[#C7A257] text-[8px] font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(199,162,87,0.3)]">
                <Sparkles className="w-2 h-2" /> Most Chosen
              </span>
            )}
          </div>

          {/* Row 2: Size + Price */}
          <div className="flex items-end justify-between mb-3">
            <span className="text-3xl md:text-4xl font-display uppercase tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{plan.size}</span>
            <div className="flex items-baseline gap-1.5 text-right">
              <span className="text-2xl md:text-3xl font-mono text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">${plan.price}</span>
              {plan.originalPrice && (
                <span className="text-white/30 line-through font-mono text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">${plan.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />

          {/* Row 3: Inline Metrics — floating pill layout */}
          <div className="flex gap-1 mb-4 flex-wrap">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex-1 min-w-[45%] bg-white/[0.04] border border-white/[0.05] rounded-lg py-2 px-2 flex flex-col items-center gap-0.5 group/m hover:bg-white/[0.08] hover:border-white/[0.1] transition-all backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-1 text-white/40">
                  <m.icon className={cn("w-3 h-3", m.primary ? "text-[#C7A257]" : "text-white/30")} />
                  <span className="text-[8px] md:text-[9px] uppercase font-mono tracking-widest">{m.label}</span>
                </div>
                <span className={cn("font-mono text-xs md:text-sm font-medium", m.primary ? "text-white" : "text-white/70")}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <Link
              href={`/checkout/${challengeType}-${plan.size.replace("$", "").toLowerCase()}`}
              className={cn(
                "group/btn relative flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] md:text-xs font-bold font-mono uppercase tracking-[0.15em] transition-all overflow-hidden active:scale-95 shadow-lg",
                isPopular
                  ? "bg-[#C7A257] text-black hover:bg-[#D4AF37] shadow-[0_0_20px_rgba(199,162,87,0.15)] hover:shadow-[0_0_30px_rgba(199,162,87,0.3)]"
                  : "bg-white/5 text-white/90 border border-white/10 hover:bg-white/10 hover:border-white/20"
              )}
            >
              {/* Glossy sweep */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:translate-x-full duration-700 ease-out" />
              <span className="relative z-10">Select Plan</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MOBILE SNAP-SCROLL CAROUSEL ─── */
function MobileCarousel({ plans, challengeType }: { plans: Plan[]; challengeType: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / plans.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, plans.length - 1));
  }, [plans.length]);

  // Reset scroll when plans change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setActiveIdx(0);
    }
  }, [challengeType]);

  return (
    <div className="relative md:hidden">
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 px-4 pb-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <AnimatePresence mode="popLayout">
          {plans.map((plan) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              key={`${challengeType}-${plan.id}`}
              className="flex-shrink-0 w-[82vw] max-w-[320px] snap-center"
            >
              <CompactPlanCard plan={plan} challengeType={challengeType} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edge fades */}
      <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />

      {/* Pagination dots */}
      <div className="flex justify-center gap-1.5 pt-2">
        {plans.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!scrollRef.current) return;
              const cardWidth = scrollRef.current.scrollWidth / plans.length;
              scrollRef.current.scrollTo({ left: cardWidth * i, behavior: "smooth" });
            }}
            className={cn(
              "rounded-full transition-all duration-300",
              i === activeIdx
                ? "w-6 h-1.5 bg-[#C7A257]"
                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── DESKTOP GRID ─── */
function DesktopGrid({ plans, challengeType }: { plans: Plan[]; challengeType: string }) {
  return (
    <motion.div
      key={challengeType}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={container}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start"
    >
      {plans.map((plan) => (
        <CompactPlanCard key={`${challengeType}-${plan.id}`} plan={plan} challengeType={challengeType} />
      ))}
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─── */
export function PricingPreview() {
  const [activeTab, setActiveTab] = useState("1-step");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const currentPlans = challengeData[activeTab] || [];

  return (
    <section ref={ref} className="relative overflow-hidden bg-black border-y border-white/5">
      {/* Background layers */}
      <div className="absolute inset-0 bg-noise opacity-[0.25] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(199,162,87,0.08),transparent_60%)] pointer-events-none" />

      <div className="container-wide py-20 lg:py-32 relative z-10">

        {/* ─── HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A257] animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C7A257]">Funding Programs</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white tracking-tight leading-[1.1] mb-4">
            Simple, transparent pricing <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C7A257] to-white/50">for every stage.</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 font-body leading-relaxed max-w-xl mx-auto">
            One upfront fee. Zero subscriptions. Choose the path that fits your trading style.
          </p>
        </motion.div>

        {/* ─── TAB SWITCHER ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-xl shrink-0 overflow-x-auto max-w-[90vw] no-scrollbar shadow-2xl">
            {challengeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={cn(
                  "group relative flex items-center justify-center gap-1.5 px-4 sm:px-8 py-3 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-widest transition-colors whitespace-nowrap",
                  activeTab === type.id ? "text-white" : "text-white/40 hover:text-white/80"
                )}
              >
                {activeTab === type.id && (
                  <motion.span
                    layoutId="pricingPreviewTab"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <type.icon className="w-3.5 h-3.5 relative z-10" strokeWidth={2.5} />
                <span className="relative z-10">{type.label}</span>
                {type.badge && activeTab !== type.id && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#C7A257]/20 border border-[#C7A257]/30 text-[#C7A257] text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                    {type.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Context text */}
        <div className="h-6 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
              className="text-white/40 font-body text-sm text-center"
            >
              {challengeTypes.find((t) => t.id === activeTab)?.desc}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ─── CARDS ─── */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <MobileCarousel plans={currentPlans} challengeType={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <DesktopGrid key={activeTab} plans={currentPlans} challengeType={activeTab} />
          </AnimatePresence>
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
        >
          <div className="flex items-center flex-wrap justify-center gap-4 text-[10px] text-white/40 font-mono uppercase tracking-[0.1em]">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#C7A257]" /> SSL Secured
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C7A257]" /> Instant Account Gen
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#C7A257]" /> Crypto Available
            </div>
          </div>

          <Link
            href="/pricing"
            className="flex items-center gap-2 group px-5 py-2.5 rounded-xl bg-transparent border border-white/10 text-[10px] text-white hover:bg-white/5 transition-colors font-mono uppercase tracking-widest active:scale-95"
          >
            Compare Full Details
            <ArrowRight className="w-3.5 h-3.5 text-[#C7A257] group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
