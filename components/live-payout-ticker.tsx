"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Payout {
  id: string;
  name: string;
  country: string;
  flag: string;
  amount: number;
  time: string;
}

// Sample payout data - in production, fetch from API
const samplePayouts: Payout[] = [
  { id: "1", name: "James M.", country: "US", flag: "🇺🇸", amount: 4250, time: "2 min ago" },
  { id: "2", name: "Sophie L.", country: "UK", flag: "🇬🇧", amount: 8900, time: "5 min ago" },
  { id: "3", name: "Marcus K.", country: "DE", flag: "🇩🇪", amount: 12500, time: "8 min ago" },
  { id: "4", name: "Elena R.", country: "ES", flag: "🇪🇸", amount: 3200, time: "12 min ago" },
  { id: "5", name: "Akira T.", country: "JP", flag: "🇯🇵", amount: 6700, time: "15 min ago" },
  { id: "6", name: "Carlos S.", country: "BR", flag: "🇧🇷", amount: 5100, time: "18 min ago" },
  { id: "7", name: "Nina P.", country: "FR", flag: "🇫🇷", amount: 9800, time: "22 min ago" },
  { id: "8", name: "David W.", country: "AU", flag: "🇦🇺", amount: 7300, time: "25 min ago" },
  { id: "9", name: "Lisa H.", country: "CA", flag: "🇨🇦", amount: 4600, time: "30 min ago" },
  { id: "10", name: "Omar A.", country: "AE", flag: "🇦🇪", amount: 11200, time: "35 min ago" },
];

export function LivePayoutTicker() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gold-300/5 via-gold-300/10 to-gold-300/5 dark:from-gold-300/10 dark:via-gold-300/15 dark:to-gold-300/10 border-y border-gold-300/10 dark:border-gold-300/20 py-3">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      {/* Ticker Content */}
      <div className="flex animate-ticker">
        {[...samplePayouts, ...samplePayouts].map((payout, index) => (
          <div
            key={`${payout.id}-${index}`}
            className="flex items-center gap-3 px-6 whitespace-nowrap"
          >
            <span className="text-lg">{payout.flag}</span>
            <span className="text-foreground/70">{payout.name}</span>
            <span className="bg-gradient-to-r from-gold-400 to-amber-500 bg-clip-text text-transparent font-mono font-bold">
              +${payout.amount.toLocaleString()}
            </span>
            <span className="text-muted-foreground text-sm">{payout.time}</span>
            <span className="text-gold-300/30 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===========================================
// Payout Notification Popup
// ===========================================

export function PayoutNotification() {
  const [currentPayout, setCurrentPayout] = useState<Payout | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomPayout = samplePayouts[Math.floor(Math.random() * samplePayouts.length)];
      setCurrentPayout({
        ...randomPayout,
        time: "Just now",
        amount: Math.floor(Math.random() * 15000) + 1000,
      });
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);
    
    // Then show every 15-30 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 15000 + 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && currentPayout && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-24 left-4 z-50 glass-card p-4 max-w-xs shadow-gold-soft dark:shadow-gold"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-xl shadow-gold-soft">
              {currentPayout.flag}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{currentPayout.name}</span> just received
              </p>
              <p className="text-lg font-bold bg-gradient-to-r from-gold-400 to-amber-500 bg-clip-text text-transparent font-mono">
                ${currentPayout.amount.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            {currentPayout.time}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ===========================================
// Stats Counter (Animated)
// ===========================================

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ 
  value, 
  prefix = "", 
  suffix = "", 
  duration = 2 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || hasAnimated || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const step = Math.ceil(end / 60);

          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, duration * 1000 / 60);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [value, duration, hasAnimated, isMounted]);

  return (
    <span ref={elementRef} className="font-mono tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ===========================================
// Live Stats Bar
// ===========================================

export function LiveStatsBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-6 px-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
        <span className="text-white/60 text-sm">Total Payouts:</span>
        <span className="text-white font-bold font-mono">
          $<AnimatedCounter value={12847500} />
        </span>
      </div>
      <div className="hidden sm:block w-px h-4 bg-white/10" />
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm">Funded Traders:</span>
        <span className="text-profit font-bold font-mono">
          <AnimatedCounter value={8432} suffix="+" />
        </span>
      </div>
      <div className="hidden sm:block w-px h-4 bg-white/10" />
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm">Avg. Payout Time:</span>
        <span className="text-white font-bold">24hrs</span>
      </div>
    </div>
  );
}
