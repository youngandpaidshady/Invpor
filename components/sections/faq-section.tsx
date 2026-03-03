"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground/60 mb-6">
              Everything you need to know about our funding program. Can&apos;t find an answer?
              Our support team is available 24/7.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Contact Support
            </Link>
          </motion.div>

          {/* Right Column - FAQ Items */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-foreground/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-foreground/[0.02] transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-sm text-foreground/60 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
