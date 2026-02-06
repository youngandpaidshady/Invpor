"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Search, ChevronDown, HelpCircle, ArrowRight, MessageCircle, Zap, Sparkles, Target, Wallet, Settings } from "lucide-react";
import { FloatingParticles, GlowingOrb, Marquee } from "@/components/ui/advanced-effects";

type Category = "all" | "getting-started" | "trading" | "payouts" | "technical";

const categories: { id: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "getting-started", label: "Getting Started", icon: Target },
  { id: "trading", label: "Trading Rules", icon: Settings },
  { id: "payouts", label: "Payouts", icon: Wallet },
];

const faqs = [
  // Getting Started
  { category: "getting-started", q: "What is AlphaTrader and how does it work?", a: "AlphaTrader is a proprietary trading firm that funds skilled traders. Pass our evaluation challenge and we'll give you a funded account with real capital. You keep up to 90% of the profits you generate." },
  { category: "getting-started", q: "How much does it cost to start?", a: "Our challenges start from just $49 for a $5,000 account. This is a one-time fee with no recurring charges. We also offer free retries if you made profit but failed due to a rule violation." },
  { category: "getting-started", q: "Do I need trading experience?", a: "While you don't need formal qualifications, you should have basic trading knowledge and experience. Our evaluation process identifies traders who can manage risk and generate consistent profits." },
  { category: "getting-started", q: "What account sizes are available?", a: "We offer account sizes ranging from $5,000 to $200,000 for evaluations. Once funded, you can scale up to $2 million through our scaling program." },
  { category: "getting-started", q: "What's the difference between challenge types?", a: "The 2-step challenge has two evaluation phases with 8% then 5% profit targets. The 1-step has one phase with a 10% target but stricter drawdown rules. We also offer instant funding with no evaluation." },
  { category: "getting-started", q: "Is there a time limit to pass the challenge?", a: "No! We have no time limits on any of our challenges. Take as long as you need. Focus on quality trading, not rushing." },
  // Trading Rules
  { category: "trading", q: "What is the profit target?", a: "For 2-step: Phase 1 requires 8%, Phase 2 requires 5%. For 1-step: 10% target. Instant funding accounts have no profit targets—just stay within drawdown limits." },
  { category: "trading", q: "What are the drawdown rules?", a: "Maximum drawdown is 10% (trailing during evaluation, static when funded). Daily drawdown is 5% of starting balance. Breaching either rule fails your challenge." },
  { category: "trading", q: "What instruments can I trade?", a: "Forex (all major and minor pairs), Indices (US30, NAS100, SPX500, etc.), Commodities (Gold, Silver, Oil), and Crypto (BTC, ETH)." },
  { category: "trading", q: "Can I use Expert Advisors (EAs)?", a: "Yes, automated trading is allowed. However, you must use your own EA—commercial or shared prop firm EAs used by multiple accounts are not permitted." },
  { category: "trading", q: "Can I hold trades over the weekend?", a: "Yes, weekend holding is allowed. Be aware of gap risk when markets open. Use stop losses or reduce position sizes." },
  { category: "trading", q: "Are there restrictions on news trading?", a: "Yes, you cannot open new positions within 2 minutes before or after high-impact news events. Existing positions can remain open." },
  // Payouts
  { category: "payouts", q: "How do payouts work?", a: "Once funded, request a payout anytime from your dashboard. Your profit share ranges from 60% to 90% depending on account type and scaling level. Processed within 24 hours." },
  { category: "payouts", q: "What payment methods are available?", a: "Bank wire transfers, cryptocurrency (BTC, ETH, USDT), and select e-wallets. Minimum payout is $100." },
  { category: "payouts", q: "How often can I withdraw?", a: "Standard accounts: bi-weekly. Professional: weekly. Elite: on-demand with no waiting period." },
  { category: "payouts", q: "Is there a maximum payout?", a: "No maximum payout limit. You keep your profit share regardless of how much you make. Some traders have withdrawn over $100,000 in a single month." },
];

const marqueeItems = [
  "24/7 SUPPORT",
  "FAST RESPONSES",
  "LIVE CHAT",
  "DEDICATED TEAM",
  "GLOBAL COVERAGE",
];

function FAQItem({ faq, index, isOpen, onToggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="group"
    >
      <motion.button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-6 text-left transition-all duration-300 border ${isOpen
            ? "bg-white/[0.03] border-[#ff6b35]/30"
            : "border-white/10 hover:bg-white/[0.02] hover:border-white/20"
          }`}
      >
        <span className={`font-medium pr-4 transition-colors ${isOpen ? "text-[#ff6b35]" : ""}`}>{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? "text-[#ff6b35]" : "text-white/40"}`} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 py-6 text-white/50 font-light leading-relaxed bg-white/[0.01] border-x border-b border-[#ff6b35]/20">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredFaqs = useMemo(() => {
    let result = faqs;

    if (activeCategory !== "all") {
      result = result.filter(faq => faq.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(faq =>
        faq.q.toLowerCase().includes(query) || faq.a.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />
      <FloatingParticles count={15} color="#ff6b35" />

      <GlowingOrb size={400} className="top-20 -right-40" />
      <GlowingOrb size={350} color="#f7c59f" className="bottom-40 -left-40" />

      {/* Hero */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 z-10">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
          <span
            className="text-[20vw] font-black text-white/[0.015] leading-none tracking-tighter"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            FAQ
          </span>
        </div>

        <motion.div
          style={{ y: headerY }}
          className="container mx-auto px-6 lg:px-12 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs text-white/50 uppercase tracking-[0.2em] font-mono">
              <HelpCircle className="w-4 h-4 text-[#ff6b35]" />
              Got Questions?
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8"
          >
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              FAQ
            </span>
          </motion.h1>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative mb-8"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-5 bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#ff6b35]/50 transition-colors text-lg"
            />
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-5 py-3 border transition-all duration-300 ${activeCategory === cat.id
                    ? "bg-white text-black border-white"
                    : "border-white/10 hover:border-white/30"
                  }`}
              >
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? "text-black" : "text-[#ff6b35]"}`} />
                <span className="text-sm font-medium">{cat.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ List */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-2">
            {filteredFaqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}

            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 mb-2">No questions found matching &quot;{searchQuery}&quot;</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#ff6b35] text-sm hover:underline"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee speed={25} className="py-6 border-y border-white/5 bg-white/[0.01]">
        {marqueeItems.map((item, i) => (
          <span key={i} className="text-sm font-bold text-white/20 uppercase tracking-[0.3em] mx-8 flex items-center gap-4">
            <Sparkles className="w-4 h-4 text-[#ff6b35]" />
            {item}
          </span>
        ))}
      </Marquee>

      {/* Contact CTA */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="w-12 h-12 text-[#ff6b35] mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-4">STILL HAVE QUESTIONS?</h2>
            <p className="text-white/40 mb-8 max-w-lg mx-auto">
              Our support team is available 24/7 to help you with any questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7c59f] text-black font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Contact Support <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/rules"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 font-bold uppercase tracking-wider hover:bg-white/5 transition-all"
                >
                  View Trading Rules
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
