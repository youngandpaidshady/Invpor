"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-foreground/[0.02] transition-colors"
            >
              <span className="font-medium text-sm pr-4">{faq.q}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 shrink-0 text-foreground/40 transition-transform",
                  openIndex === idx && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200",
                openIndex === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 pt-0 text-sm text-foreground/60 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
