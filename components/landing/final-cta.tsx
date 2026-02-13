"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/**
 * Final CTA — Magma Theme
 * Orange radial spotlight, magma glow CTA, framer-motion entrance
 */

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 lg:py-40 bg-[#09090B] overflow-hidden">
      {/* Orange spotlight */}
      <div className="absolute inset-0 magma-spotlight" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 container-wide"
      >
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">READY?</p>

          <h2 className="font-display text-display-xl font-bold uppercase leading-[0.85] tracking-[-0.03em] text-white mb-8">
            START<br />
            <span className="text-[#F97316]">TRADING</span>
          </h2>

          <p className="text-xl text-[#A1A1AA] max-w-lg mb-10 leading-relaxed">
            $200K capital. 90% profit split.<br />
            24-hour payouts. No games.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/pricing" className="btn-primary">
              GET FUNDED NOW
            </Link>
            <Link href="/faq" className="btn-secondary">
              READ THE RULES
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-[#27272A]">
            <div className="flex flex-wrap gap-8 text-xs text-[#71717A] font-mono">
              <span>15,247 traders funded</span>
              <span>$12.8M paid out</span>
              <span>4.9/5 Trustpilot</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
