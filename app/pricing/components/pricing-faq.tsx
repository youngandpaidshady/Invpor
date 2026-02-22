"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";

const faqs = [
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, and cryptocurrency payments (BTC, ETH, USDT). All payments are processed securely.",
  },
  {
    q: "Can I get a refund if I fail the challenge?",
    a: "Yes, we offer a 14-day money-back guarantee if you haven't placed any trades. Once you start trading, the standard refund policy applies based on your progress.",
  },
  {
    q: "What's the difference between challenge types?",
    a: "2-Step challenges have two evaluation phases with lower profit targets per phase. 1-Step has a single phase with a higher target. Instant Funding skips evaluation entirely but has stricter drawdown rules and lower profit splits.",
  },
  {
    q: "How long does it take to get funded?",
    a: "Once you pass all phases, your funded account is set up within 24-48 business hours. Instant Funding accounts are ready immediately after purchase.",
  },
  {
    q: "Are there any recurring fees?",
    a: "No, the challenge fee is a one-time payment. There are no monthly subscriptions or hidden fees. You only pay once to start your evaluation.",
  },
  {
    q: "Can I hold positions overnight or over weekends?",
    a: "Yes, overnight holding is allowed for all account types. Weekend holding is allowed for 2-Step and 1-Step challenges but restricted for Instant Funding accounts.",
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
        className="relative z-10 w-full px-5 py-5 text-left flex items-start justify-between gap-6 outline-none focus-visible:ring-1 focus-visible:ring-[#C7A257]/50"
      >
        <span className={`font-display text-base tracking-tight transition-colors duration-300 ${isOpen ? "text-[#C7A257]" : "text-white group-hover:text-[#C7A257]/80"
          }`}>
          {faq.q}
        </span>

        <div className="shrink-0 pt-0.5">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex items-center justify-center w-6 h-6 border transition-colors duration-300 ${isOpen
              ? "bg-[#C7A257] text-black border-[#C7A257]"
              : "bg-white/[0.03] text-white/40 border-white/[0.08] group-hover:text-white"
              }`}
          >
            {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
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
            <div className="px-5 pb-5 pt-0 text-white/50 font-body text-sm leading-relaxed max-w-2xl border-t border-transparent">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-display text-2xl lg:text-3xl uppercase text-white tracking-tight">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <div className="flex flex-col gap-2">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            faq={faq}
            index={idx}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </div>
  );
}
