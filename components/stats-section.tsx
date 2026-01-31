"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  { icon: DollarSign, value: 50, suffix: "M+", label: "Total Payouts", color: "text-profit" },
  { icon: Users, value: 10, suffix: "K+", label: "Active Traders", color: "text-primary" },
  { icon: TrendingUp, value: 85, suffix: "%", label: "Success Rate", color: "text-profit" },
  { icon: Award, value: 500, suffix: "+", label: "Funded Accounts", color: "text-electric-violet" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const formatValue = (val: number) => {
    if (val >= 1000) {
      return (val / 1000).toFixed(1);
    }
    return val.toString();
  };

  return (
    <span ref={ref} className="text-5xl font-bold">
      {formatValue(count)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-electric-violet/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Platform Statistics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of traders building their futures with AlphaTrader
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Glowing pulse effect */}
                <div className={`absolute inset-0 ${stat.color} opacity-20 blur-2xl rounded-lg`} />
                
                <div className="relative glass p-8 rounded-lg border border-border text-center hover-glow">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-lg bg-surface ${stat.color} bg-opacity-10`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`mb-2 ${stat.color}`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
