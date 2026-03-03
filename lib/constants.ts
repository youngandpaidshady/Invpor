// ===========================================
// Application Constants
// ===========================================

import { PricingPlan } from "./types";

export const APP_NAME = "BraxleyNevim";
export const APP_DESCRIPTION = "Get funded up to $200,000. Trade with our capital, keep up to 90% of profits.";

// ===========================================
// Pricing Plans
// ===========================================

export const PRICING_PLANS: PricingPlan[] = [
  // 2-Step Challenge
  {
    id: "2step-10k",
    name: "Starter",
    type: "2-step",
    account_size: 10000,
    price: 149,
    profit_target: 8,
    max_drawdown: 10,
    daily_drawdown: 5,
    profit_split: 80,
    features: ["No time limit", "Free retry on profit", "Bi-weekly payouts"],
  },
  {
    id: "2step-25k",
    name: "Standard",
    type: "2-step",
    account_size: 25000,
    price: 279,
    profit_target: 8,
    max_drawdown: 10,
    daily_drawdown: 5,
    profit_split: 80,
    features: ["No time limit", "Free retry on profit", "Bi-weekly payouts"],
  },
  {
    id: "2step-50k",
    name: "Professional",
    type: "2-step",
    account_size: 50000,
    price: 379,
    profit_target: 8,
    max_drawdown: 10,
    daily_drawdown: 5,
    profit_split: 85,
    features: ["No time limit", "Free retry on profit", "Weekly payouts", "Priority support"],
    is_popular: true,
  },
  {
    id: "2step-100k",
    name: "Expert",
    type: "2-step",
    account_size: 100000,
    price: 599,
    profit_target: 8,
    max_drawdown: 10,
    daily_drawdown: 5,
    profit_split: 90,
    features: ["No time limit", "Free retry on profit", "On-demand payouts", "Personal manager"],
  },
  {
    id: "2step-200k",
    name: "Elite",
    type: "2-step",
    account_size: 200000,
    price: 1299,
    profit_target: 8,
    max_drawdown: 10,
    daily_drawdown: 5,
    profit_split: 90,
    features: ["No time limit", "Free retry on profit", "On-demand payouts", "Personal manager", "VIP Discord"],
  },
  // 1-Step Challenge
  {
    id: "1step-10k",
    name: "Quick Start",
    type: "1-step",
    account_size: 10000,
    price: 189,
    profit_target: 10,
    max_drawdown: 6,
    daily_drawdown: 4,
    profit_split: 80,
    features: ["Single phase", "No time limit", "Bi-weekly payouts"],
  },
  {
    id: "1step-25k",
    name: "Accelerated",
    type: "1-step",
    account_size: 25000,
    price: 349,
    profit_target: 10,
    max_drawdown: 6,
    daily_drawdown: 4,
    profit_split: 85,
    features: ["Single phase", "No time limit", "Weekly payouts"],
    is_popular: true,
  },
  {
    id: "1step-50k",
    name: "Fast Track",
    type: "1-step",
    account_size: 50000,
    price: 549,
    profit_target: 10,
    max_drawdown: 6,
    daily_drawdown: 4,
    profit_split: 85,
    features: ["Single phase", "No time limit", "Weekly payouts", "Priority support"],
  },
  {
    id: "1step-100k",
    name: "Pro Track",
    type: "1-step",
    account_size: 100000,
    price: 899,
    profit_target: 10,
    max_drawdown: 6,
    daily_drawdown: 4,
    profit_split: 90,
    features: ["Single phase", "No time limit", "On-demand payouts", "Personal manager"],
  },
  // Instant Funding
  {
    id: "instant-10k",
    name: "Direct",
    type: "instant",
    account_size: 10000,
    price: 449,
    profit_target: 0,
    max_drawdown: 6,
    daily_drawdown: 3,
    profit_split: 65,
    features: ["No evaluation", "Trade immediately", "Bi-weekly payouts"],
  },
  {
    id: "instant-25k",
    name: "Direct Pro",
    type: "instant",
    account_size: 25000,
    price: 799,
    profit_target: 0,
    max_drawdown: 6,
    daily_drawdown: 3,
    profit_split: 75,
    features: ["No evaluation", "Trade immediately", "Weekly payouts"],
    is_popular: true,
  },
  {
    id: "instant-50k",
    name: "Direct Elite",
    type: "instant",
    account_size: 50000,
    price: 1499,
    profit_target: 0,
    max_drawdown: 6,
    daily_drawdown: 3,
    profit_split: 80,
    features: ["No evaluation", "Trade immediately", "On-demand payouts", "Priority support"],
  },
];

// ===========================================
// Trading Rules
// ===========================================

export const TRADING_RULES = {
  allowed_instruments: [
    "Forex (Major & Minor pairs)",
    "Indices (US30, NAS100, SPX500)",
    "Commodities (Gold, Silver, Oil)",
    "Crypto (BTC, ETH)",
  ],
  prohibited: [
    "Martingale strategies",
    "Grid trading without stop loss",
    "News trading (2 min before/after)",
    "Copy trading from other prop accounts",
  ],
  requirements: [
    "Minimum 5 trading days",
    "Maximum 1:100 leverage",
    "Stop loss required on all trades",
    "No holding over weekends (optional)",
  ],
};

// ===========================================
// Company Info
// ===========================================

export const COMPANY_INFO = {
  name: "BraxleyNevim Ltd",
  founded: 2023,
  headquarters: "London, UK",
  support_email: "support@braxleynevimalphatrade.com",
  social: {
    twitter: "https://twitter.com/braxleynevim",
    discord: "https://discord.gg/braxleynevim",
    telegram: "https://t.me/braxleynevim",
  },
};

// ===========================================
// Navigation
// ===========================================

export const NAV_LINKS = {
  main: [
    { label: "Challenges", href: "/challenges" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ],
  footer: {
    platform: [
      { label: "Challenges", href: "/challenges" },
      { label: "Pricing", href: "/pricing" },
      { label: "Trading Rules", href: "/rules" },
      { label: "Scaling Program", href: "/scaling" },
    ],
    resources: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Affiliates", href: "/affiliates" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Risk Disclosure", href: "/risk" },
      { label: "Refund Policy", href: "/refunds" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
};
