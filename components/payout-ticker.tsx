"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const payouts = [
  { name: "Michael K.", amount: "$12,450", country: "🇺🇸" },
  { name: "Sarah L.", amount: "$8,200", country: "🇬🇧" },
  { name: "David M.", amount: "$15,750", country: "🇩🇪" },
  { name: "Emma R.", amount: "$6,890", country: "🇫🇷" },
  { name: "James W.", amount: "$22,100", country: "🇦🇺" },
  { name: "Lisa T.", amount: "$9,450", country: "🇨🇦" },
  { name: "Robert H.", amount: "$18,300", country: "🇳🇱" },
  { name: "Anna P.", amount: "$11,670", country: "🇪🇸" },
  { name: "Chris B.", amount: "$7,890", country: "🇮🇹" },
  { name: "Maria G.", amount: "$14,200", country: "🇧🇷" },
];

export function PayoutTicker() {
  return (
    <section className="py-6 bg-surface/50 border-y border-white/10 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 px-4 lg:px-6">
        <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
        <span className="text-sm font-medium text-foreground/60">
          Live Payouts
        </span>
      </div>

      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Ticker */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6"
        >
          {[...payouts, ...payouts].map((payout, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-2 bg-background/50 border border-white/10 rounded-full whitespace-nowrap"
            >
              <span className="text-lg">{payout.country}</span>
              <span className="font-medium text-foreground/80">
                {payout.name}
              </span>
              <span className="font-bold text-profit">{payout.amount}</span>
              <CheckCircle className="w-4 h-4 text-profit" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
