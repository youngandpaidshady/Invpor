"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Zap, TrendingUp, Clock, Flame } from "lucide-react";
import { ChallengeCard } from "./challenge-card";

const challengeTypes = [
  {
    id: "2-step",
    label: "2-Step",
    icon: TrendingUp,
    description: "Classic evaluation",
  },
  {
    id: "1-step",
    label: "1-Step",
    icon: Clock,
    description: "Faster funding",
    badge: "Popular",
  },
  {
    id: "instant",
    label: "Instant",
    icon: Zap,
    description: "No evaluation",
    badge: "New",
  },
  {
    id: "blitz",
    label: "Blitz",
    icon: Flame,
    description: "Aggressive targets",
  },
];

const challengeData = {
  "2-step": [
    {
      name: "Starter",
      accountSize: "$5,000",
      price: "$49",
      originalPrice: "$65",
      profitTarget: "8%",
      maxDrawdown: "10%",
      dailyDrawdown: "5%",
      profitSplit: "80%",
      features: ["No time limit", "Free retry", "Bi-weekly payouts", "Real market data"],
    },
    {
      name: "Standard",
      accountSize: "$25,000",
      price: "$179",
      originalPrice: "$239",
      profitTarget: "8%",
      maxDrawdown: "10%",
      dailyDrawdown: "5%",
      profitSplit: "85%",
      features: ["No time limit", "Free retry", "Weekly payouts", "Priority support"],
      isPopular: true,
    },
    {
      name: "Professional",
      accountSize: "$100,000",
      price: "$499",
      originalPrice: "$665",
      profitTarget: "8%",
      maxDrawdown: "10%",
      dailyDrawdown: "5%",
      profitSplit: "90%",
      features: ["No time limit", "Free retry", "Same-day payouts", "Personal manager"],
    },
  ],
  "1-step": [
    {
      name: "Quick Start",
      accountSize: "$10,000",
      price: "$99",
      originalPrice: "$132",
      profitTarget: "10%",
      maxDrawdown: "6%",
      dailyDrawdown: "4%",
      profitSplit: "80%",
      features: ["Single phase", "No time limit", "Weekly payouts", "Real market data"],
    },
    {
      name: "Accelerated",
      accountSize: "$50,000",
      price: "$299",
      originalPrice: "$399",
      profitTarget: "10%",
      maxDrawdown: "6%",
      dailyDrawdown: "4%",
      profitSplit: "85%",
      features: ["Single phase", "No time limit", "Bi-weekly payouts", "Priority support"],
      isPopular: true,
    },
    {
      name: "Elite",
      accountSize: "$200,000",
      price: "$999",
      originalPrice: "$1,332",
      profitTarget: "10%",
      maxDrawdown: "6%",
      dailyDrawdown: "4%",
      profitSplit: "90%",
      features: ["Single phase", "No time limit", "Same-day payouts", "Personal manager"],
    },
  ],
  instant: [
    {
      name: "Direct Start",
      accountSize: "$5,000",
      price: "$199",
      profitTarget: "N/A",
      maxDrawdown: "8%",
      dailyDrawdown: "4%",
      profitSplit: "70%",
      features: ["No evaluation", "Instant access", "Weekly payouts", "Real market data"],
      isInstant: true,
    },
    {
      name: "Direct Pro",
      accountSize: "$25,000",
      price: "$699",
      profitTarget: "N/A",
      maxDrawdown: "8%",
      dailyDrawdown: "4%",
      profitSplit: "75%",
      features: ["No evaluation", "Instant access", "Bi-weekly payouts", "Priority support"],
      isPopular: true,
      isInstant: true,
    },
    {
      name: "Direct Elite",
      accountSize: "$50,000",
      price: "$1,299",
      profitTarget: "N/A",
      maxDrawdown: "8%",
      dailyDrawdown: "4%",
      profitSplit: "80%",
      features: ["No evaluation", "Instant access", "Same-day payouts", "Personal manager"],
      isInstant: true,
    },
  ],
  blitz: [
    {
      name: "Speed Run",
      accountSize: "$10,000",
      price: "$79",
      originalPrice: "$105",
      profitTarget: "15%",
      maxDrawdown: "8%",
      dailyDrawdown: "4%",
      profitSplit: "80%",
      features: ["High targets", "7-day limit", "Quick funding", "Real market data"],
    },
    {
      name: "Rush",
      accountSize: "$50,000",
      price: "$249",
      originalPrice: "$332",
      profitTarget: "15%",
      maxDrawdown: "8%",
      dailyDrawdown: "4%",
      profitSplit: "85%",
      features: ["High targets", "7-day limit", "Quick funding", "Priority support"],
      isPopular: true,
    },
    {
      name: "Turbo",
      accountSize: "$100,000",
      price: "$449",
      originalPrice: "$599",
      profitTarget: "15%",
      maxDrawdown: "8%",
      dailyDrawdown: "4%",
      profitSplit: "90%",
      features: ["High targets", "7-day limit", "Quick funding", "Personal manager"],
    },
  ],
};

export function ChallengeTabs() {
  const [activeTab, setActiveTab] = useState("2-step");

  return (
    <section id="challenges" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
            Choose Your{" "}
            <span className="text-[#F97316]">
              Challenge
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Select the challenge type that fits your trading style and get funded
            with up to $200,000.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {challengeTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${activeTab === type.id
                  ? "bg-primary text-background"
                  : "bg-surface/50 border border-white/10 text-foreground/70 hover:text-foreground hover:border-white/20"
                }`}
            >
              <type.icon className="w-5 h-5" />
              <span>{type.label}</span>
              {type.badge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${activeTab === type.id
                      ? "bg-background/20 text-background"
                      : "bg-primary/20 text-primary"
                    }`}
                >
                  {type.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {challengeData[activeTab as keyof typeof challengeData].map(
              (challenge, index) => (
                <ChallengeCard
                  key={`${activeTab}-${index}`}
                  {...challenge}
                  delay={index * 0.1}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
