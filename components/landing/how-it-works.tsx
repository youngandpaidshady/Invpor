"use client";

import Link from "next/link";

/**
 * How It Works - Clean Step Cards
 * Zero framer-motion, pure CSS
 */

const steps = [
  {
    num: "01",
    title: "CHOOSE",
    subtitle: "Your Challenge",
    description: "Select your account size from $10K to $200K. Pay once—no subscriptions, no hidden fees.",
    highlight: "Starting at $89",
    color: "#ff6b35",
  },
  {
    num: "02",
    title: "PROVE",
    subtitle: "Your Skills",
    description: "Trade our capital on a demo account. Hit the profit target while staying within risk limits.",
    highlight: "10% Target · 5% Max DD",
    color: "#3b82f6",
  },
  {
    num: "03",
    title: "EARN",
    subtitle: "Real Money",
    description: "Pass the evaluation and get funded with real capital. Withdraw profits anytime.",
    highlight: "Up to 90% Profit Split",
    color: "#10b981",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-40 bg-[#050505]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="text-xs text-white/30 uppercase tracking-[0.4em] font-mono block mb-6">
            The Process
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            Three steps to<br />
            <span className="text-[#ff6b35]">your funded account</span>
          </h2>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-12 gap-6 lg:gap-12 py-8 border-t border-white/5 hover:bg-white/[0.01] transition-colors"
            >
              <div className="col-span-2 lg:col-span-1">
                <span
                  className="text-5xl lg:text-7xl font-black font-mono opacity-20"
                  style={{ color: step.color }}
                >
                  {step.num}
                </span>
              </div>
              <div className="col-span-10 lg:col-span-3">
                <h3 className="text-2xl lg:text-3xl font-black text-white">{step.title}</h3>
                <span className="text-sm text-white/40 mt-1">{step.subtitle}</span>
              </div>
              <div className="col-span-12 lg:col-span-5">
                <p className="text-white/50 leading-relaxed">{step.description}</p>
              </div>
              <div className="col-span-12 lg:col-span-3 flex items-center lg:justify-end">
                <span
                  className="text-xs uppercase tracking-wider font-mono px-4 py-2 border"
                  style={{ borderColor: step.color, color: step.color }}
                >
                  {step.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/rules" className="text-white/40 text-sm uppercase tracking-wider hover:text-white transition-colors">
            Read full rules →
          </Link>
        </div>
      </div>
    </section>
  );
}
