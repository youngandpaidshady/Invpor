"use client";

import { motion } from "framer-motion";
import { Check, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface ChallengeCardProps {
  accountSize: string;
  profitTarget: string;
  maxDrawdown: string;
  price: string;
  popular?: boolean;
  index: number;
}

export default function ChallengeCard({
  accountSize,
  profitTarget,
  maxDrawdown,
  price,
  popular = false,
  index,
}: ChallengeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="glass rounded-lg p-6 hover-glow h-full flex flex-col border border-border hover:border-primary transition-all">
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{accountSize}</h3>
            <p className="text-3xl font-bold text-primary">{price}</p>
          </div>

          {/* Rules */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-profit mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Profit Target</p>
                <p className="text-sm text-muted-foreground">{profitTarget}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Max Drawdown</p>
                <p className="text-sm text-muted-foreground">{maxDrawdown}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Profit Split</p>
                <p className="text-sm text-muted-foreground">Up to 90%</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-profit" />
              <span>No Time Limit</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-profit" />
              <span>One-Step Challenge</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-profit" />
              <span>Instant Evaluation</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/challenges/${accountSize.toLowerCase().replace(/\s+/g, "-")}`}
          className="mt-6 w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-center block"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
}
