"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  HelpCircle,
  ArrowUpRight,
  Crosshair,
  Wallet,
  Settings,
  MessageSquare,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";

/**
 * FAQ Page — 21st.dev Spawn Engine Build
 *
 * 🧬 DNA Axes:
 *   Layout:      Stacked vertical panels with numbered indices
 *   Surface:     Glass card + backdrop-blur-xl + border-white/10
 *   Motion:      Spring-physics height expansion + staggered children fade-up
 *   Mood:        Luxurious — gold accent lines, uppercase headings, slow easing
 *   Composition: Standalone FAQ block with search + category filters
 *
 * 🌀 Chaos Modifiers:
 *   1. Holographic sheen — sweep on hover
 *   2. Glow pulse — active accordion emits gold box-shadow pulse
 *   3. Noise grain — feTurbulence overlay
 *   4. Magnetic cursor spotlight — radial-gradient follows mouse
 */

/* ─── CONSTANTS ─── */

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ─── DATA ─── */

type Category = "all" | "getting-started" | "trading" | "payouts";

const categories: {
  id: Category;
  label: string;
  icon: typeof HelpCircle;
  count: number;
}[] = [
    { id: "all", label: "All Questions", icon: HelpCircle, count: 16 },
    { id: "getting-started", label: "Getting Started", icon: Crosshair, count: 6 },
    { id: "trading", label: "Trading Rules", icon: Settings, count: 6 },
    { id: "payouts", label: "Payouts", icon: Wallet, count: 4 },
  ];

const faqs = [
  {
    category: "getting-started",
    q: "What is BraxleyNevim and how does it work?",
    a: "BraxleyNevim is a proprietary trading firm that provides capital to qualified traders. Complete our evaluation challenge to demonstrate consistent profitability, and we will allocate a funded account with real capital. You retain up to 90% of the profits you generate.",
  },
  {
    category: "getting-started",
    q: "How much does it cost to start?",
    a: "Our challenges start from just $49 for a $5,000 account. This is a one-time fee with no recurring charges. We also offer free retries if you made profit but failed due to a rule violation.",
  },
  {
    category: "getting-started",
    q: "Do I need trading experience?",
    a: "While you don't need formal qualifications, you should have basic trading knowledge and experience. Our evaluation process identifies traders who can manage risk and generate consistent profits.",
  },
  {
    category: "getting-started",
    q: "What account sizes are available?",
    a: "We offer account sizes ranging from $5,000 to $200,000 for evaluations. Once funded, you can scale up to $2 million through our scaling program.",
  },
  {
    category: "getting-started",
    q: "What's the difference between challenge types?",
    a: "The 2-step challenge has two evaluation phases with 8% then 5% profit targets. The 1-step has one phase with a 10% target but stricter drawdown rules. We also offer instant funding with no evaluation.",
  },
  {
    category: "getting-started",
    q: "Is there a time limit to pass the challenge?",
    a: "No! We have no time limits on any of our challenges. Take as long as you need. Focus on quality trading, not rushing.",
  },
  {
    category: "trading",
    q: "What is the profit target?",
    a: "For 2-step: Phase 1 requires 8%, Phase 2 requires 5%. For 1-step: 10% target. Instant funding accounts have no profit targets—just stay within drawdown limits.",
  },
  {
    category: "trading",
    q: "What are the drawdown rules?",
    a: "Maximum drawdown is 10% (trailing during evaluation, static when funded). Daily drawdown is 5% of starting balance. Breaching either rule fails your challenge.",
  },
  {
    category: "trading",
    q: "What instruments can I trade?",
    a: "Forex (all major and minor pairs), Indices (US30, NAS100, SPX500, etc.), Commodities (Gold, Silver, Oil), and Crypto (BTC, ETH).",
  },
  {
    category: "trading",
    q: "Can I use Expert Advisors (EAs)?",
    a: "Yes, automated trading is allowed. However, you must use your own EA—commercial or shared prop firm EAs used by multiple accounts are not permitted.",
  },
  {
    category: "trading",
    q: "Can I hold trades over the weekend?",
    a: "Yes, weekend holding is allowed. Be aware of gap risk when markets open. Use stop losses or reduce position sizes.",
  },
  {
    category: "trading",
    q: "Are there restrictions on news trading?",
    a: "Yes, you cannot open new positions within 2 minutes before or after high-impact news events. Existing positions can remain open.",
  },
  {
    category: "payouts",
    q: "How do payouts work?",
    a: "Once funded, request a payout anytime from your dashboard. Your profit share ranges from 60% to 90% depending on account type and scaling level. Processed within 24 hours.",
  },
  {
    category: "payouts",
    q: "What payment methods are available?",
    a: "Bank wire transfers, cryptocurrency (BTC, ETH, USDT), and select e-wallets. Minimum payout is $100.",
  },
  {
    category: "payouts",
    q: "How often can I withdraw?",
    a: "Standard accounts: bi-weekly. Professional: weekly. Elite: on-demand with no waiting period.",
  },
  {
    category: "payouts",
    q: "Is there a maximum payout?",
    a: "No maximum payout limit. You keep your profit share regardless of how much you make. Some traders have withdrawn over $100,000 in a single month.",
  },
];

/* ─── FLOATING PARTICLE DOTS (Background) ─── */

function ParticleField() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 6 + 8,
        delay: Math.random() * 4,
      })),
    []
  );

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-[#C7A257]/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── FAQ ITEM — Floating Card with Glass Surface ─── */

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(199,162,87,0.06), transparent 80%)`;

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      {/* Chaos Modifier #4: Magnetic cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-[1]"
        style={{ background: spotlight }}
      />

      {/* Chaos Modifier #3: Noise grain overlay */}
      <div
        className="absolute inset-0 z-[2] mix-blend-overlay opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Chaos Modifier #1: Holographic sheen sweep */}
      <div className="absolute inset-0 z-[3] -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-[20deg] pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-[1200ms] ease-in-out" />

      {/* === Floating Card Surface === */}
      <div
        className={`relative z-10 border backdrop-blur-xl transition-all duration-500 ${isOpen
          ? "bg-white/[0.05] border-[#C7A257]/25 shadow-[0_8px_40px_rgba(199,162,87,0.08)] -translate-y-1"
          : "bg-white/[0.015] border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.03] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
          }`}
      >
        {/* Chaos Modifier #2: Glow pulse ring on active card */}
        {isOpen && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            animate={{
              boxShadow: [
                "0 0 20px rgba(199,162,87,0.04)",
                "0 0 40px rgba(199,162,87,0.10)",
                "0 0 20px rgba(199,162,87,0.04)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="relative z-10 w-full px-5 sm:px-7 py-5 sm:py-6 text-left flex items-center justify-between gap-5 outline-none focus-visible:ring-1 focus-visible:ring-[#C7A257]/50 active:scale-[0.995] transition-transform"
        >
          <div className="flex items-center gap-4 sm:gap-5 min-w-0">
            {/* Numbered Index */}
            <span
              className={`font-mono text-[11px] tabular-nums shrink-0 w-7 text-center transition-all duration-300 ${isOpen
                ? "text-[#C7A257] font-semibold"
                : "text-white/15 group-hover:text-white/30"
                }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Gold accent bar */}
            <div
              className={`w-[2px] h-5 shrink-0 transition-all duration-500 ${isOpen
                ? "bg-gradient-to-b from-[#C7A257] to-[#C7A257]/30"
                : "bg-white/[0.06] group-hover:bg-white/[0.12]"
                }`}
            />

            {/* Question */}
            <span
              className={`text-sm sm:text-[15px] leading-relaxed transition-colors duration-300 ${isOpen
                ? "text-white font-medium"
                : "text-white/55 group-hover:text-white/85"
                }`}
            >
              {faq.q}
            </span>
          </div>

          {/* Chevron with spring overshoot */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="shrink-0"
          >
            <div
              className={`flex items-center justify-center w-7 h-7 border transition-all duration-400 ${isOpen
                ? "bg-[#C7A257] border-[#C7A257] text-black"
                : "bg-white/[0.02] border-white/[0.08] text-white/25 group-hover:text-white/50 group-hover:border-white/[0.16]"
                }`}
            >
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
          </motion.div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.25, delay: 0.05 },
              }}
              className="overflow-hidden relative z-10"
            >
              <div className="px-5 sm:px-7 pb-6 pt-1">
                <div className="pl-[52px] sm:pl-[60px]">
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1, ease: EASE }}
                    className="text-white/40 text-sm sm:text-[15px] leading-[1.75] max-w-2xl"
                  >
                    {faq.a}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── STAT COUNTER ─── */

function StatCounter({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="text-center sm:text-left"
    >
      <div className="font-mono text-2xl sm:text-3xl text-[#C7A257] font-medium tracking-wider tabular-nums">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/25 mt-1 font-mono">
        {label}
      </div>
    </motion.div>
  );
}

/* ─── PAGE ─── */

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const contentRef = useRef<HTMLElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });

  const filteredFaqs = useMemo(() => {
    let result = faqs;

    if (activeCategory !== "all") {
      result = result.filter((faq) => faq.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (faq) =>
          faq.q.toLowerCase().includes(query) ||
          faq.a.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setOpenIndex(null);
  }, []);

  return (
    <main className="min-h-screen bg-[#010101] text-white selection:bg-[#C7A257] selection:text-black">
      <Navbar />

      {/* ═══════════════════════════════════════════
           HERO — Asymmetric layout with particle field
         ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 void-spotlight" />
        <div className="absolute inset-0 bg-noise opacity-[0.2] pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
        <ParticleField />

        {/* Ambient glow orbs */}
        <div className="absolute top-0 right-[15%] w-[700px] h-[700px] bg-[#C7A257]/[0.035] rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-[#C7A257]/[0.02] rounded-full blur-[150px] pointer-events-none translate-y-1/2" />

        {/* Diagonal accent lines */}
        <div
          className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#C7A257]/8 to-transparent pointer-events-none"
          style={{ transform: "rotate(-8deg)", transformOrigin: "top" }}
        />
        <div
          className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#C7A257]/4 to-transparent pointer-events-none"
          style={{ transform: "rotate(-12deg)", transformOrigin: "top" }}
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            {/* Left : Text content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 mb-6">
                <div className="w-1.5 h-1.5 bg-[#C7A257] animate-pulse" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#C7A257] font-mono font-medium">
                  Support Center
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-display text-white mb-6 uppercase tracking-wider leading-[0.85]"
                style={{ fontSize: "clamp(2.8rem, 9vw, 7.5rem)" }}
              >
                FREQUENTLY
                <br />
                ASKED{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7A257] via-[#F0D78C] to-[#C7A257] shimmer-gold">
                  QUESTIONS
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/30 text-base sm:text-lg font-body leading-relaxed max-w-lg mb-10">
                Everything you need to know about evaluations, funded accounts,
                trading rules, and payouts.
              </p>

              {/* Search Input */}
              <div className="relative max-w-xl group/search">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/search:text-[#C7A257] transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setOpenIndex(null);
                  }}
                  className="w-full pl-12 pr-10 py-4 bg-white/[0.02] border border-white/[0.08] text-white placeholder-white/20 font-mono text-sm tracking-wide backdrop-blur-xl focus:outline-none focus:border-[#C7A257]/40 focus:ring-1 focus:ring-[#C7A257]/20 focus:bg-white/[0.04] transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Right : Stat counters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="hidden lg:flex flex-col gap-8 pb-4"
            >
              <StatCounter value="16+" label="Questions" delay={0.4} />
              <StatCounter value="3" label="Categories" delay={0.5} />
              <StatCounter value="24/7" label="Support" delay={0.6} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           CATEGORY TABS + FAQ ACCORDION LIST
         ═══════════════════════════════════════════ */}
      <section
        ref={contentRef}
        className="relative py-16 lg:py-24 border-b border-white/[0.04]"
      >
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none mix-blend-overlay" />

        <div className="container-wide relative z-10">
          {/* Category filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-white/[0.06]"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const currentCount =
                cat.id === "all"
                  ? faqs.length
                  : faqs.filter((f) => f.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`relative flex items-center gap-2.5 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] border transition-all duration-300 overflow-hidden active:scale-95 ${isActive
                    ? "text-[#C7A257] border-[#C7A257]/30"
                    : "text-white/30 border-white/[0.06] hover:border-white/[0.12] hover:text-white/55"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="faqCategoryActive"
                      className="absolute inset-0 bg-[#C7A257]/[0.06]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon
                    className="w-3.5 h-3.5 relative z-10"
                    strokeWidth={1.5}
                  />
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 ml-1 text-[10px] font-mono ${isActive ? "text-[#C7A257]/60" : "text-white/15"
                      }`}
                  >
                    {currentCount}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* FAQ List — Floating Cards */}
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                {filteredFaqs.map((faq, i) => (
                  <FAQItem
                    key={`${activeCategory}-${i}`}
                    faq={faq}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/[0.03] border border-white/[0.06] mb-6">
                  <HelpCircle className="w-7 h-7 text-white/12" />
                </div>
                <p className="text-white/25 text-sm mb-2">
                  No results for{" "}
                  <span className="text-white/40 font-mono">
                    &quot;{searchQuery}&quot;
                  </span>
                </p>
                <p className="text-white/15 text-xs mb-6">
                  Try a different search term or browse by category
                </p>
                <button
                  onClick={handleClearSearch}
                  className="text-[#C7A257] text-xs font-mono uppercase tracking-[0.15em] hover:text-[#F0D78C] transition-colors active:scale-95"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           CTA — Contact support glass card
         ═══════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 void-spotlight" />
        <div className="absolute inset-0 bg-noise opacity-[0.2] pointer-events-none mix-blend-overlay" />

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#C7A257]/[0.03] rounded-full blur-[180px] pointer-events-none translate-y-1/2" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative border border-white/[0.06] bg-white/[0.015] backdrop-blur-xl p-8 sm:p-12 lg:p-16 overflow-hidden"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-[2px] bg-[#C7A257]/40" />
            <div className="absolute top-0 left-0 w-[2px] h-10 bg-[#C7A257]/40" />
            <div className="absolute bottom-0 right-0 w-10 h-[2px] bg-[#C7A257]/40" />
            <div className="absolute bottom-0 right-0 w-[2px] h-10 bg-[#C7A257]/40" />

            {/* Holographic sheen on card hover */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[20deg] pointer-events-none group-hover:translate-x-[200%] transition-all duration-[1500ms] ease-in-out" />

            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#C7A257]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C7A257] font-mono font-medium">
                    Still have questions?
                  </span>
                </div>
                <h2
                  className="font-display uppercase tracking-wider leading-[0.9] text-white mb-4"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  GET IN{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7A257] to-[#F0D78C]">
                    TOUCH
                  </span>
                </h2>
                <p className="text-white/30 text-sm sm:text-base font-body leading-relaxed max-w-md">
                  Our team responds within 2 hours. Available 24/7 via live
                  chat, email, or Discord.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="group/cta relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#C7A257] text-black font-body font-bold uppercase tracking-widest text-sm border border-[#C7A257] overflow-hidden transition-all hover:shadow-[0_0_35px_rgba(199,162,87,0.25)] active:scale-95"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/cta:translate-x-full duration-700 ease-out" />
                  <MessageSquare className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Contact Support</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10" />
                </Link>
                <Link
                  href="/rules"
                  className="group/rules relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent border border-white/[0.10] text-white/70 font-body uppercase tracking-[0.15em] text-sm overflow-hidden transition-all hover:border-[#C7A257]/30 hover:text-[#C7A257] active:scale-95"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C7A257]/[0.06] to-transparent group-hover/rules:translate-x-full duration-700 ease-out" />
                  <span className="relative z-10">View Trading Rules</span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover/rules:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
