"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-electric-violet/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full border border-primary/30 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Limited Time: 20% OFF All Challenges</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to Start Your
            <span className="block text-gradient bg-gradient-to-r from-primary via-profit to-electric-violet bg-clip-text text-transparent">
              Trading Journey?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join over 10,000 traders who have already transformed their trading careers. Get funded today and start earning real profits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/challenges"
              className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold text-lg overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center space-x-2"
            >
              <span className="relative z-10">Get Funded Now</span>
              <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 border border-border hover:border-primary/50 rounded-xl font-semibold text-lg flex items-center justify-center transition-all hover:bg-surface/50"
            >
              Talk to Sales
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span className="text-sm text-muted-foreground">256-bit SSL Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="text-sm text-muted-foreground">Instant Activation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <span className="text-sm text-muted-foreground">Money-Back Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
