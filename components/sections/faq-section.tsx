"use client";

import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How does the evaluation process work?",
    answer: "You'll trade a simulated account and need to hit a profit target (typically 8-10%) while staying within our drawdown rules. There's no time limit, so you can take as long as you need. Once you pass, we fund you with real capital.",
  },
  {
    question: "What are the drawdown rules?",
    answer: "We have two rules: a maximum overall drawdown (typically 10% from starting balance) and a daily drawdown limit (typically 5% from the day's starting balance). These are designed to ensure responsible risk management.",
  },
  {
    question: "How do I withdraw my profits?",
    answer: "You can request a payout through your dashboard at any time. We process withdrawals within 24 hours via bank transfer or cryptocurrency. There's no minimum withdrawal amount for funded accounts.",
  },
  {
    question: "What trading platforms do you support?",
    answer: "We support MetaTrader 4, MetaTrader 5, and cTrader. You can trade on desktop, web, or mobile apps. All platforms have access to the same instruments and conditions.",
  },
  {
    question: "Can I use Expert Advisors (EAs)?",
    answer: "Yes, you can use EAs and automated trading strategies. However, certain high-risk strategies like martingale or grid trading without stop losses are not allowed.",
  },
  {
    question: "What happens if I fail the evaluation?",
    answer: "If you breach the rules, your evaluation ends. However, if you reached the profit target but broke another rule, you may qualify for a free retry. Otherwise, you can purchase a new challenge at any time.",
  },
];

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
      transition={{ delay: index * 0.05 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
        style={{ background: spotlight }}
      />

      <button
        onClick={onToggle}
        className="relative z-10 w-full px-6 py-6 text-left flex items-start justify-between gap-6 outline-none focus-visible:ring-1 focus-visible:ring-[#C7A257]/50"
      >
        <span className={`font-display text-lg tracking-tight transition-colors duration-300 ${isOpen ? "text-[#C7A257]" : "text-white group-hover:text-[#C7A257]/80"
          }`}>
          {faq.question}
        </span>

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
            <div className="px-6 pb-6 pt-0 text-white/50 font-body text-base leading-relaxed border-t border-transparent">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 relative bg-[#010101] border-t border-white/[0.04]">
      <div className="absolute inset-0 noise-overlay opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="inline-block px-3 py-1 border border-[#C7A257]/20 bg-[#C7A257]/5 text-[#C7A257] text-[10px] font-mono uppercase tracking-[0.1em] mb-6">
              Knowledge Base
            </p>
            <h2 className="text-4xl lg:text-5xl font-display uppercase tracking-tight text-white mb-6">
              FREQUENTLY ASKED
              <br />
              <span className="text-[#C7A257]">QUESTIONS</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-8 max-w-md">
              Everything you need to know about our funding program. Can&apos;t find an answer?
              Our support team is available 24/7.
            </p>
            <Link
              href="/support"
              className="inline-flex h-12 items-center justify-center border border-white/10 bg-transparent px-6 font-mono text-xs tracking-widest text-white uppercase transition-all duration-300 hover:bg-white/5 active:scale-95 group"
            >
              Contact Support
              <ArrowUpRight className="w-3.5 h-3.5 ml-2 text-white/40 group-hover:text-white transition-colors" />
            </Link>
          </motion.div>

          {/* Right Column - FAQ Items */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

