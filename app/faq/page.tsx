"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Plus,
  Minus,
  HelpCircle,
  ArrowUpRight,
  Crosshair,
  Wallet,
  Settings,
  MessageSquare,
} from "lucide-react";

/**
 * FAQ Page — 21st.dev Premium Design System
 *
 * Asymmetric hero, left-aligned heading, search with gold focus ring,
 * animated category filter pills, card-void accordion with corner accents,
 * radial spotlight on expanded answers.
 */

type Category = "all" | "getting-started" | "trading" | "payouts";

const categories: {
  id: Category;
  label: string;
  icon: typeof HelpCircle;
}[] = [
    { id: "all", label: "All", icon: HelpCircle },
    { id: "getting-started", label: "Getting Started", icon: Crosshair },
    { id: "trading", label: "Trading Rules", icon: Settings },
    { id: "payouts", label: "Payouts", icon: Wallet },
  ];

const faqs = [
  {
    category: "getting-started",
    q: "What is BraxleyNevim and how does it work?",
    a: "BraxleyNevim is a proprietary trading firm that funds skilled traders. Pass our evaluation challenge and we'll give you a funded account with real capital. You keep up to 90% of the profits you generate.",
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

/* ─── FAQ ITEM ─── */

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

  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(199,162,87,0.06), transparent 80%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative border overflow-hidden transition-colors duration-300 ${isOpen
        ? "bg-[#0A0A0A] border-[#C7A257]/20 shadow-[0_0_25px_rgba(199,162,87,0.04)]"
        : "bg-[#040404] border-white/[0.05] hover:border-white/[0.12]"
        }`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
        style={{ background: spotlight }}
      />

      <button
        onClick={onToggle}
        className="relative z-10 w-full px-6 py-6 text-left flex items-start justify-between gap-6 outline-none focus-visible:ring-1 focus-visible:ring-[#C7A257]/50"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-white/30 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`font-display text-base sm:text-lg uppercase tracking-tight transition-colors duration-300 ${isOpen ? "text-[#C7A257]" : "text-white group-hover:text-[#C7A257]/80"
            }`}>
            {faq.q}
          </span>
        </div>

        <div className="shrink-0 pt-1">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex items-center justify-center w-7 h-7 border transition-colors duration-300 ${isOpen
              ? "bg-[#C7A257] text-black border-[#C7A257]"
              : "bg-white/[0.03] text-white/40 border-white/[0.08] group-hover:text-white"
              }`}
          >
            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden relative z-10"
          >
            <div className="px-6 pb-6 pt-0 text-white/50 font-body text-base leading-relaxed pl-[3.25rem] max-w-3xl border-t border-transparent">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

  return (
    <main className="min-h-screen bg-[#010101] text-white selection:bg-[#C7A257] selection:text-black">
      <Navbar />

      {/* ═══════════════════════════════════
           HERO — Asymmetric left-aligned
         ═══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/[0.04]"
      >
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[#C7A257]/[0.03] rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />
        <div className="absolute inset-0 noise-overlay opacity-50 mix-blend-overlay pointer-events-none" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-white/[0.03] border border-white/[0.08] mb-6 glow-pulse">
              <HelpCircle className="w-6 h-6 text-[#C7A257]" />
            </div>

            <h1 className="font-display text-5xl lg:text-7xl uppercase text-white mb-6 tracking-tight">
              FREQUENTLY
              <br />
              ASKED <span className="text-[#C7A257]">QUESTIONS</span>
            </h1>

            <p className="text-white/40 text-lg sm:text-xl font-body leading-relaxed max-w-2xl mb-12">
              Everything you need to know about evaluations, funded accounts,
              trading rules, and payouts. Clear rules, no ambiguity.
            </p>

            {/* Search */}
            <div className="relative max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#C7A257] transition-colors" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(null);
                }}
                className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border border-white/[0.08] text-white placeholder-white/30 font-mono text-sm tracking-wide focus:outline-none focus:border-[#C7A257]/40 focus:ring-1 focus:ring-[#C7A257]/20 transition-all rounded-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           CATEGORY TABS + FAQ LIST
         ═══════════════════════════════════ */}
      <section className="py-20 lg:py-32 relative">
        <div className="container-wide relative z-10">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-16 pb-8 border-b border-white/[0.04]">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`relative flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden border ${isActive
                    ? "border-[#C7A257]/40 text-[#C7A257]"
                    : "border-white/[0.08] text-white/50 hover:border-white/[0.15] hover:text-white"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-[#C7A257]/[0.08]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-3">
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

              {filteredFaqs.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 border border-white/[0.05] bg-[#0A0A0A]"
                >
                  <Search className="w-12 h-12 text-white/20 mx-auto mb-6" />
                  <p className="text-white/40 text-sm mb-4 font-mono">
                    No results for &quot;{searchQuery}&quot;
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#C7A257] text-xs font-mono uppercase tracking-[0.15em] hover:text-[#C7A257]/80 transition-colors"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           CTA — Contact support
         ═══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden border-t border-white/[0.04] bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,162,87,0.05)_0%,transparent_60%)] pointer-events-none" />

        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <p className="inline-block px-4 py-1.5 border border-[#C7A257]/20 bg-[#C7A257]/5 text-[#C7A257] text-xs font-mono uppercase tracking-[0.1em] mb-8">
            Still have questions?
          </p>
          <h2 className="font-display text-4xl lg:text-5xl uppercase text-white mb-6 tracking-tight">
            CONTACT <span className="text-[#C7A257]">SUPPORT</span>
          </h2>
          <p className="text-white/40 text-lg font-body leading-relaxed mb-10">
            Our team responds within 2 hours. Available 24/7 via live chat,
            email, or Discord.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support"
              className="inline-flex h-14 items-center justify-center bg-[#C7A257] px-8 font-mono text-sm tracking-widest text-[#050507] uppercase transition-all duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A257] active:scale-95"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Support
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/rules"
              className="inline-flex h-14 items-center justify-center border border-white/10 bg-transparent px-8 font-mono text-sm tracking-widest text-white uppercase transition-all duration-300 hover:bg-white/5 active:scale-95"
            >
              View Trading Rules
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

