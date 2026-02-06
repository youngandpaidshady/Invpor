"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Up to 90% profit split",
  "No time limits",
  "Instant payouts",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Trusted by 10,000+ traders worldwide
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
          >
            Get Funded Up To{" "}
            <span className="text-primary">$200,000</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-foreground/60 mb-8 max-w-2xl"
          >
            Trade with our capital and keep up to 90% of the profits. 
            Pass our evaluation and get funded. No hidden fees, no tricks.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors group"
            >
              View Challenges
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground/5 border border-foreground/10 font-semibold rounded-lg hover:bg-foreground/10 transition-colors"
            >
              How It Works
            </Link>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-foreground/10"
          >
            <div className="flex items-center gap-6 text-sm text-foreground/50">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">$8M+</span>
                <span>Paid to traders</span>
              </div>
              <div className="w-px h-4 bg-foreground/20" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">4.8/5</span>
                <span>Trustpilot rating</span>
              </div>
              <div className="w-px h-4 bg-foreground/20 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-semibold text-foreground">24h</span>
                <span>Payout processing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
