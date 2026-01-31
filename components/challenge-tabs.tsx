"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChallengeCard from "./challenge-card";
import { Zap, Target, Rocket, Crown } from "lucide-react";

const challengeTypes = [
  {
    id: "1-step",
    label: "1 Step",
    icon: Zap,
    description: "One phase to prove your skills",
    badge: null,
    challenges: [
      { accountSize: "$15,000", profitTarget: "10%", maxDrawdown: "6%", price: "$115", popular: false },
      { accountSize: "$25,000", profitTarget: "10%", maxDrawdown: "6%", price: "$161", popular: false },
      { accountSize: "$50,000", profitTarget: "10%", maxDrawdown: "6%", price: "$232", popular: true },
      { accountSize: "$100,000", profitTarget: "10%", maxDrawdown: "6%", price: "$401", popular: false },
    ],
  },
  {
    id: "2-step",
    label: "2 Step",
    icon: Target,
    description: "Two phases with higher leverage",
    badge: "Most Popular",
    challenges: [
      { accountSize: "$5,000", profitTarget: "8% / 6%", maxDrawdown: "10%", price: "$17", popular: false },
      { accountSize: "$25,000", profitTarget: "8% / 6%", maxDrawdown: "10%", price: "$96", popular: false },
      { accountSize: "$50,000", profitTarget: "8% / 6%", maxDrawdown: "10%", price: "$187", popular: true },
      { accountSize: "$100,000", profitTarget: "8% / 6%", maxDrawdown: "10%", price: "$297", popular: false },
    ],
  },
  {
    id: "instant",
    label: "Instant",
    icon: Rocket,
    description: "Skip evaluation, trade immediately",
    badge: "New",
    challenges: [
      { accountSize: "$2,500", profitTarget: "N/A", maxDrawdown: "6%", price: "$79", popular: false },
      { accountSize: "$5,000", profitTarget: "N/A", maxDrawdown: "6%", price: "$149", popular: false },
      { accountSize: "$10,000", profitTarget: "N/A", maxDrawdown: "6%", price: "$279", popular: true },
      { accountSize: "$25,000", profitTarget: "N/A", maxDrawdown: "6%", price: "$599", popular: false },
    ],
  },
  {
    id: "blitz",
    label: "Blitz",
    icon: Crown,
    description: "Fast-track to funded status",
    badge: "Special",
    challenges: [
      { accountSize: "$10,000", profitTarget: "6%", maxDrawdown: "4%", price: "$89", popular: false },
      { accountSize: "$25,000", profitTarget: "6%", maxDrawdown: "4%", price: "$199", popular: true },
      { accountSize: "$50,000", profitTarget: "6%", maxDrawdown: "4%", price: "$349", popular: false },
      { accountSize: "$100,000", profitTarget: "6%", maxDrawdown: "4%", price: "$599", popular: false },
    ],
  },
];

export default function ChallengeTabs() {
  const [activeTab, setActiveTab] = useState("2-step");

  const activeChallenge = challengeTypes.find((c) => c.id === activeTab);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
            Flexible Options
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Choose Your Best Account
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Multiple challenge types to match your trading style and experience level
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {challengeTypes.map((type) => {
            const Icon = type.icon;
            const isActive = activeTab === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-surface text-muted-foreground hover:text-foreground hover:bg-surface/80 border border-border"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{type.label}</span>
                {type.badge && (
                  <span
                    className={`absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      type.badge === "Most Popular"
                        ? "bg-profit text-white"
                        : type.badge === "New"
                        ? "bg-electric-violet text-white"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {type.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active tab description */}
        <AnimatePresence mode="wait">
          {activeChallenge && (
            <motion.p
              key={activeChallenge.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center text-muted-foreground mb-8"
            >
              {activeChallenge.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Challenge cards */}
        <AnimatePresence mode="wait">
          {activeChallenge && (
            <motion.div
              key={activeChallenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {activeChallenge.challenges.map((challenge, index) => (
                <ChallengeCard
                  key={`${activeChallenge.id}-${challenge.accountSize}`}
                  {...challenge}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Refundable fee notice */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          💰 One-Time 100% Refundable Fee · 🔒 Secure Payment · ⚡ Instant Access
        </motion.p>
      </div>
    </section>
  );
}
