"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Tag, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-r from-primary via-amber-500 to-primary bg-[length:200%_auto] animate-gradient overflow-hidden"
        >
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-center gap-4 py-3 text-background">
              <div className="hidden sm:flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">FLASH SALE</span>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className="font-medium">
                  Use code <span className="font-bold">BN25</span> for 25% off
                </span>
              </div>

              <div className="hidden md:flex items-center gap-2 bg-background/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">
                  {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>

              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-background/20 rounded transition-colors"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
