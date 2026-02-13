"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/**
 * FAQ — Magma Theme
 * Orange chevron when open, framer-motion entrance
 */

const faqs = [
  {
    q: "How quickly can I get funded?",
    a: "After passing the evaluation, you receive your funded account within 24 hours. Most traders pass within 2-4 weeks, but there's no time limit.",
  },
  {
    q: "What's the profit split?",
    a: "You keep 90% of all profits. We take 10%. No hidden fees, no scaling requirements to reach this split—it's 90% from day one.",
  },
  {
    q: "How fast are withdrawals?",
    a: "Withdrawals are processed within 24 hours. We pay via bank transfer, crypto, or your preferred payment method.",
  },
  {
    q: "What are the trading rules?",
    a: "8% profit target, 5% max daily drawdown, 10% max total drawdown. No time limits. You can hold trades overnight and over weekends.",
  },
  {
    q: "What if I fail the evaluation?",
    a: "You can retry at a discounted rate. We also offer a free retry after 30 days. Many of our top traders failed their first attempt.",
  },
  {
    q: "Is this real money?",
    a: "Yes. Once funded, you trade a live account with real capital. Your profits are real, and your withdrawals are real money in your account.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section bg-[#111113] border-y border-[#3F3F46]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-24"
        >
          {/* Left — Header */}
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="heading-lg text-white mb-6">
              COMMON<br />
              <span className="text-[#F97316]">QUESTIONS</span>
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Can&apos;t find what you&apos;re looking for?
              Contact our support team for a response within 2 hours.
            </p>
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-[#3F3F46]">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                    className="w-full py-6 flex items-start justify-between gap-4 text-left group"
                  >
                    <span
                      className={`text-lg transition-colors ${openIndex === i
                          ? "text-white"
                          : "text-[#A1A1AA] group-hover:text-white"
                        }`}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${openIndex === i
                          ? "rotate-180 text-[#F97316]"
                          : "text-[#71717A]"
                        }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 text-[#A1A1AA] leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
