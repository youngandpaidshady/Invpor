"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the evaluation process work?",
    answer: "Our evaluation is straightforward: meet the profit target (8%) while staying within the maximum drawdown limit (5%). There's no time limit, so you can trade at your own pace. Once you pass, you're immediately funded and can start earning real profits.",
  },
  {
    question: "What's the profit split?",
    answer: "You keep up to 90% of all profits you generate. We believe traders should be rewarded for their skills. The exact split depends on your account tier—higher account sizes unlock higher profit splits.",
  },
  {
    question: "How fast are payouts processed?",
    answer: "We process payouts within 24 hours of your request. You can choose between crypto (Bitcoin, Ethereum, USDT) or traditional bank transfer. There are no hidden fees or minimum withdrawal amounts.",
  },
  {
    question: "What trading platforms do you support?",
    answer: "We support all major trading platforms including MetaTrader 4, MetaTrader 5, cTrader, and TradingView. You can trade forex, indices, commodities, and crypto—whatever suits your strategy best.",
  },
  {
    question: "What happens if I hit the drawdown limit?",
    answer: "If you exceed the maximum drawdown, your evaluation or funded account is closed. However, you can always start fresh with a new challenge. We also offer reset options at a discounted rate if you're close to passing.",
  },
  {
    question: "Are there any trading restrictions?",
    answer: "We allow most trading strategies including scalping, swing trading, and news trading. The only restrictions are on high-frequency trading (HFT) bots and arbitrage strategies. You can hold positions overnight and over weekends.",
  },
  {
    question: "How do I get started?",
    answer: "Simply choose your account size, complete the purchase, and you'll receive your trading credentials within minutes. Start trading immediately—there's no waiting period or additional verification required.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
            Got Questions?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about AlphaTrader
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass rounded-xl p-6 flex items-center justify-between text-left hover:border-primary/50 transition-colors border border-transparent"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-surface flex items-center justify-center">
                  {openIndex === index ? (
                    <Minus className="h-4 w-4 text-primary" />
                  ) : (
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
