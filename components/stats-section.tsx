"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { DollarSign, Users, Award, TrendingUp } from "lucide-react";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  delay: number;
}

function StatItem({ icon: Icon, value, suffix, prefix = "", label, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1);
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0);
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="relative p-8 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity" />

        {/* Content */}
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div className="text-4xl lg:text-5xl font-display font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              {prefix}
              {formatNumber(count)}
              {suffix}
            </span>
          </div>
          <p className="text-foreground/60">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

const stats = [
  {
    icon: DollarSign,
    value: 12500000,
    suffix: "M+",
    prefix: "$",
    label: "Total Payouts",
  },
  {
    icon: Users,
    value: 15000,
    suffix: "+",
    label: "Active Traders",
  },
  {
    icon: Award,
    value: 5200,
    suffix: "+",
    label: "Funded Accounts",
  },
  {
    icon: TrendingUp,
    value: 90,
    suffix: "%",
    label: "Average Profit Split",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      <div className="container mx-auto px-4 lg:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Join a growing community of successful traders who have achieved
            their financial goals with AlphaTrader.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
