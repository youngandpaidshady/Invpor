"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Shield, Zap, Award, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

// Animated trading chart component
function TradingChart() {
  const [points, setPoints] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial points
    const initialPoints = Array.from({ length: 50 }, (_, i) => {
      return 50 + Math.sin(i * 0.3) * 20 + Math.random() * 10;
    });
    setPoints(initialPoints);

    // Animate chart
    const interval = setInterval(() => {
      setPoints((prev) => {
        const newPoints = [...prev.slice(1)];
        const lastPoint = prev[prev.length - 1];
        const change = (Math.random() - 0.45) * 8;
        newPoints.push(Math.max(20, Math.min(80, lastPoint + change)));
        return newPoints;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const pathD = points.length > 0
    ? `M 0 ${100 - points[0]} ${points.map((p, i) => `L ${(i / (points.length - 1)) * 100} ${100 - p}`).join(" ")}`
    : "";

  const areaD = points.length > 0
    ? `${pathD} L 100 100 L 0 100 Z`
    : "";

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--profit))" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGradient)" />
      <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" />
    </svg>
  );
}

// Floating particle effect
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            y: [null, "-100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// Animated counter component
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    });
    return controls.stop;
  }, [value]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-electric-violet/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <FloatingParticles />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full border border-primary/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-profit"></span>
              </span>
              <span className="text-sm font-medium text-foreground">Live Trading Platform</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block text-foreground">Fund Your</span>
              <span className="block text-gradient bg-gradient-to-r from-primary via-profit to-electric-violet bg-clip-text text-transparent">
                Trading Career
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Pass our evaluation, trade with our capital up to <span className="text-foreground font-semibold">$400,000</span>, and keep up to <span className="text-profit font-semibold">90% of profits</span>. No risk, unlimited potential.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/challenges"
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold overflow-hidden flex items-center justify-center space-x-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                <span className="relative z-10">Get Funded Now</span>
                <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Link>
              <Link
                href="/about"
                className="group px-8 py-4 border border-border hover:border-primary/50 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all hover:bg-surface/50"
              >
                <Play className="h-5 w-5 text-primary" />
                <span>Watch Demo</span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-profit" />
                <span>Regulated & Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>Instant Payouts</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-electric-violet" />
                <span>4.9★ Trustpilot</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Trading Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main card */}
            <div className="glass-strong rounded-2xl p-6 border border-border/50 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Value</p>
                  <p className="text-3xl font-bold text-foreground">
                    $<AnimatedNumber value={127843} />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Today's P&L</p>
                  <p className="text-2xl font-bold text-profit">+$2,847</p>
                </div>
              </div>

              {/* Chart */}
              <div className="h-48 mb-6 rounded-lg overflow-hidden bg-surface/50">
                <TradingChart />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-surface/50">
                  <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                  <p className="text-lg font-bold text-profit">78%</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface/50">
                  <p className="text-xs text-muted-foreground mb-1">Trades</p>
                  <p className="text-lg font-bold text-foreground">156</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface/50">
                  <p className="text-xs text-muted-foreground mb-1">Drawdown</p>
                  <p className="text-lg font-bold text-primary">2.1%</p>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <motion.div
              className="absolute -bottom-4 -left-4 glass rounded-xl p-4 border border-profit/30 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-profit/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-profit" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">New Payout</p>
                  <p className="text-xs text-muted-foreground">John D. received $12,450</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2 border border-primary/30 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-xs text-muted-foreground">Top Trader</p>
                  <p className="text-sm font-bold text-foreground">+847% ROI</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
