"use client";

import { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

/**
 * FAQ — 21st.dev Spawn Engine Build
 * DNA: Glassmorphism Accordion + Radial Spotlight + Spring Physics + Gold Prestige
 * Chaos: Noise grain, holographic sheen sweep, glow pulse, shadow elevation
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "How quickly can I get funded?",
    a: "Once you pass the evaluation, your live funded account is set up within 24 hours. There's no time limit on the evaluation itself — take as long as you need.",
  },
  {
    q: "What's the profit split?",
    a: "You keep 90% of all profits you generate. We take 10%. No hidden fees, no changing terms. 90% from day one.",
  },
  {
    q: "How fast are payouts processed?",
    a: "Payouts are processed within 24 hours on demand. We support both cryptocurrency and direct bank wire transfers.",
  },
  {
    q: "What are the trading rules?",
    a: "The key parameters are: 8% profit target, 5% maximum daily drawdown, and 10% maximum total drawdown. Overnight and weekend holding is permitted.",
  },
  {
    q: "What happens if I fail the evaluation?",
    a: "You can retry at a discounted rate. If you fail while staying within the risk limits, you'll receive a free retry after 30 days.",
  },
  {
    q: "Is this real capital?",
    a: "Yes. Once funded, you're trading with real capital on live markets. The profits you earn are real and withdrawable.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onClick,
  index,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(199,162,87,0.08), transparent 80%)`;

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
      className="group relative overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen z-[1]"
        style={{ background: spotlight }}
      />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 z-[1] mix-blend-overlay opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Holographic sheen sweep */}
      <div className="absolute inset-0 z-[2] -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent skew-x-[30deg] pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-1000 ease-in-out" />

      {/* Card surface */}
      <div
        className={`relative z-10 border backdrop-blur-xl transition-all duration-300 ${isOpen
            ? "bg-white/[0.04] border-[#C7A257]/20 shadow-[0_0_30px_rgba(199,162,87,0.04)]"
            : "bg-white/[0.015] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          }`}
      >
        <button
          onClick={onClick}
          className="relative z-10 w-full px-5 sm:px-6 py-5 sm:py-6 text-left flex items-start justify-between gap-6 outline-none focus-visible:ring-1 focus-visible:ring-[#C7A257]/50"
          aria-expanded={isOpen}
        >
          <span
            className={`font-display text-base sm:text-lg lg:text-xl uppercase tracking-tight transition-colors duration-300 ${isOpen
                ? "text-[#C7A257]"
                : "text-white/80 group-hover:text-white"
              }`}
          >
            {faq.q}
          </span>

          <div className="shrink-0 pt-0.5">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center justify-center w-7 h-7 border transition-all duration-300 ${isOpen
                  ? "bg-[#C7A257] text-black border-[#C7A257]"
                  : "bg-white/[0.03] text-white/30 border-white/[0.08] group-hover:text-white/60 group-hover:border-white/[0.15]"
                }`}
            >
              {isOpen ? (
                <Minus className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
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
              <div className="px-5 sm:px-6 pb-6 pt-0 text-white/40 font-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
                {faq.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-[#010101] relative py-24 lg:py-36 overflow-hidden border-b border-white/[0.04]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-noise opacity-[0.2] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[#C7A257]/[0.03] rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-[#C7A257]/[0.02] rounded-full blur-[150px] pointer-events-none translate-y-1/2" />

      <div className="container-wide relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-white/[0.03] border border-white/[0.08] mb-6 backdrop-blur-sm">
            <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A257]" />
          </div>
          <h2 className="font-display text-4xl lg:text-7xl uppercase text-white mb-6 tracking-tight">
            FREQUENTLY <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7A257] via-[#F0D78C] to-[#C7A257]">
              ASKED
            </span>
          </h2>
          <p className="text-white/30 text-base sm:text-lg font-body max-w-xl mx-auto leading-relaxed">
            Everything you need to know. Clear rules, no ambiguity.
          </p>
        </motion.div>

        {/* Accordions */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
