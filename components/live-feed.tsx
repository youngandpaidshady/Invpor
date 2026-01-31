"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Award, CheckCircle } from "lucide-react";

interface FeedItem {
  id: number;
  type: "payout" | "funded" | "achievement" | "trade";
  name: string;
  amount?: string;
  achievement?: string;
  time: string;
}

const names = [
  "John D.", "Sarah M.", "Alex K.", "Maria L.", "David R.", "Emma S.",
  "Michael T.", "Lisa P.", "James W.", "Anna B.", "Robert H.", "Sophie C.",
];

const achievements = [
  "reached Elite status", "completed 100 trades", "hit 10% profit target",
  "maintained 0% drawdown", "funded for $100K account", "first payout received",
];

function generateFeedItem(id: number): FeedItem {
  const types: FeedItem["type"][] = ["payout", "funded", "achievement", "trade"];
  const type = types[Math.floor(Math.random() * types.length)];
  const name = names[Math.floor(Math.random() * names.length)];

  switch (type) {
    case "payout":
      return {
        id,
        type,
        name,
        amount: `$${(Math.floor(Math.random() * 50) + 1) * 100}`,
        time: "Just now",
      };
    case "funded":
      return {
        id,
        type,
        name,
        amount: `$${[5000, 25000, 50000, 100000][Math.floor(Math.random() * 4)].toLocaleString()}`,
        time: "Just now",
      };
    case "achievement":
      return {
        id,
        type,
        name,
        achievement: achievements[Math.floor(Math.random() * achievements.length)],
        time: "Just now",
      };
    case "trade":
      return {
        id,
        type,
        name,
        amount: `+$${(Math.floor(Math.random() * 20) + 1) * 50}`,
        time: "Just now",
      };
  }
}

function FeedIcon({ type }: { type: FeedItem["type"] }) {
  switch (type) {
    case "payout":
      return <DollarSign className="h-4 w-4 text-profit" />;
    case "funded":
      return <CheckCircle className="h-4 w-4 text-primary" />;
    case "achievement":
      return <Award className="h-4 w-4 text-electric-violet" />;
    case "trade":
      return <TrendingUp className="h-4 w-4 text-profit" />;
  }
}

function FeedMessage({ item }: { item: FeedItem }) {
  switch (item.type) {
    case "payout":
      return (
        <span>
          <span className="font-medium text-foreground">{item.name}</span>
          <span className="text-muted-foreground"> received a payout of </span>
          <span className="font-medium text-profit">{item.amount}</span>
        </span>
      );
    case "funded":
      return (
        <span>
          <span className="font-medium text-foreground">{item.name}</span>
          <span className="text-muted-foreground"> got funded with </span>
          <span className="font-medium text-primary">{item.amount}</span>
        </span>
      );
    case "achievement":
      return (
        <span>
          <span className="font-medium text-foreground">{item.name}</span>
          <span className="text-muted-foreground"> {item.achievement}</span>
        </span>
      );
    case "trade":
      return (
        <span>
          <span className="font-medium text-foreground">{item.name}</span>
          <span className="text-muted-foreground"> closed a trade </span>
          <span className="font-medium text-profit">{item.amount}</span>
        </span>
      );
  }
}

export default function LiveFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Initial feed
    const initial = Array.from({ length: 5 }, (_, i) => generateFeedItem(i));
    setFeed(initial);
    setCounter(5);

    // Add new items periodically
    const interval = setInterval(() => {
      setCounter((prev) => {
        const newId = prev + 1;
        setFeed((prevFeed) => [generateFeedItem(newId), ...prevFeed.slice(0, 4)]);
        return newId;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-profit"></span>
            </span>
            <h3 className="text-lg font-semibold text-foreground">Live Activity</h3>
          </div>
          <p className="text-sm text-muted-foreground">Real-time platform updates</p>
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {feed.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-lg p-4 flex items-center space-x-4"
              >
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center flex-shrink-0">
                  <FeedIcon type={item.type} />
                </div>
                <div className="flex-1 text-sm">
                  <FeedMessage item={item} />
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
