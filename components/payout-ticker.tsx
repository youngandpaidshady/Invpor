"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const names = [
  "Jose", "Matej", "Artur", "Johnny", "Chibane", "John", "Shiva", 
  "Siddhant", "Florin", "Tewodros", "Vigen", "Steven", "Maria", 
  "Alex", "David", "Emma", "Michael", "Lisa", "James", "Anna"
];

const countries = ["🇺🇸", "🇬🇧", "🇩🇪", "🇫🇷", "🇪🇸", "🇮🇹", "🇳🇱", "🇦🇪", "🇸🇬", "🇦🇺"];

interface Payout {
  id: number;
  name: string;
  amount: string;
  country: string;
}

function generatePayout(id: number): Payout {
  const name = names[Math.floor(Math.random() * names.length)];
  const amount = ((Math.floor(Math.random() * 400) + 10) * 100).toLocaleString();
  const country = countries[Math.floor(Math.random() * countries.length)];
  return { id, name, amount: `$${amount}`, country };
}

export default function PayoutTicker() {
  const [payouts, setPayouts] = useState<Payout[]>([]);

  useEffect(() => {
    // Generate initial payouts
    const initial = Array.from({ length: 20 }, (_, i) => generatePayout(i));
    setPayouts(initial);
  }, []);

  return (
    <section className="py-6 bg-surface border-y border-border overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 px-6 border-r border-border">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-profit"></span>
            </span>
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              Recent Payouts
            </span>
          </div>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{ x: [0, -2000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...payouts, ...payouts].map((payout, index) => (
              <div
                key={`${payout.id}-${index}`}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <span className="text-lg">{payout.country}</span>
                <span className="text-sm text-muted-foreground">{payout.name}</span>
                <span className="text-sm font-bold text-profit">{payout.amount}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
