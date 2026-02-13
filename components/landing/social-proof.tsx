"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Social Proof — Magma Theme
 * Orange accents for funded amounts, framer-motion entrance
 */

const testimonials = [
  {
    quote: "Withdrew $12K in my first month. No games, no delays.",
    author: "Alex K.",
    handle: "@alexk_trades",
    funded: "$100K",
    withdrawn: "$12,400",
  },
  {
    quote: "Finally a prop firm that pays. Processed my withdrawal in 4 hours.",
    author: "Sam R.",
    handle: "@samr_fx",
    funded: "$50K",
    withdrawn: "$8,200",
  },
  {
    quote: "The evaluation rules actually make sense. Passed in 3 weeks.",
    author: "Jordan T.",
    handle: "@jordan_trades",
    funded: "$200K",
    withdrawn: "$24,600",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section bg-[#09090B]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 lg:mb-24"
        >
          <p className="eyebrow mb-4">TRADERS</p>
          <h2 className="heading-lg text-white">
            WHAT THEY<br />
            <span className="text-[#F97316]">SAY</span>
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-px bg-[#3F3F46]"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-[#09090B] p-8 lg:p-10"
            >
              <blockquote className="text-lg text-white/70 leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between pt-6 border-t border-[#27272A]">
                <div>
                  <div className="font-medium text-white">{t.author}</div>
                  <div className="text-xs text-[#71717A] font-mono">
                    {t.handle}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#71717A] mb-1">FUNDED</div>
                  <div className="font-mono text-[#F97316]">{t.funded}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <div className="mt-12 pt-8 border-t border-[#27272A] flex flex-wrap justify-center gap-8 lg:gap-16 text-center">
          <div>
            <div className="font-mono text-xl text-white">4.9/5</div>
            <div className="text-[10px] uppercase tracking-wider text-[#71717A] mt-1">
              TRUSTPILOT
            </div>
          </div>
          <div>
            <div className="font-mono text-xl text-white">2,847</div>
            <div className="text-[10px] uppercase tracking-wider text-[#71717A] mt-1">
              REVIEWS
            </div>
          </div>
          <div>
            <div className="font-mono text-xl text-[#F97316]">$12.8M</div>
            <div className="text-[10px] uppercase tracking-wider text-[#71717A] mt-1">
              TOTAL PAID
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
