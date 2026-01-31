"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const promoCode = "ALPHA35";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    toast.success("Promo code copied!", {
      description: `Use code ${promoCode} at checkout for 35% off`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative bg-gradient-to-r from-primary via-profit to-electric-violet"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
            {/* Promo Text */}
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary-foreground animate-pulse" />
              <span className="text-sm font-bold text-primary-foreground">
                BOGO + 35% OFF
              </span>
              <span className="text-sm text-primary-foreground/80">
                Limited Time Offer
              </span>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-1 text-primary-foreground">
              <div className="bg-black/20 rounded px-2 py-1 text-xs font-mono font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-black/20 rounded px-2 py-1 text-xs font-mono font-bold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-black/20 rounded px-2 py-1 text-xs font-mono font-bold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>

            {/* Promo Code */}
            <button
              onClick={copyCode}
              className="flex items-center gap-2 bg-black/20 hover:bg-black/30 transition-colors rounded-full px-4 py-1.5"
            >
              <span className="text-sm font-mono font-bold text-primary-foreground">
                {promoCode}
              </span>
              {copied ? (
                <Check className="h-4 w-4 text-primary-foreground" />
              ) : (
                <Copy className="h-4 w-4 text-primary-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/20 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X className="h-4 w-4 text-primary-foreground" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
