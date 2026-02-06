"use client";

import { ChallengeType } from "@/lib/types";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  selectedType: ChallengeType;
}

// Feature comparison data
const comparisonData = {
  "2-step": {
    phases: "2 Phases",
    profit_target_1: "8%",
    profit_target_2: "5%",
    max_drawdown: "10%",
    daily_drawdown: "5%",
    min_trading_days: "5 days",
    time_limit: "Unlimited",
    leverage: "1:100",
    profit_split_start: "80%",
    profit_split_max: "90%",
    free_retry: true,
    weekend_holding: true,
    news_trading: false,
    expert_advisors: true,
    scaling: true,
    first_payout: "Bi-weekly",
  },
  "1-step": {
    phases: "1 Phase",
    profit_target_1: "10%",
    profit_target_2: "-",
    max_drawdown: "6%",
    daily_drawdown: "4%",
    min_trading_days: "5 days",
    time_limit: "Unlimited",
    leverage: "1:100",
    profit_split_start: "80%",
    profit_split_max: "90%",
    free_retry: true,
    weekend_holding: true,
    news_trading: false,
    expert_advisors: true,
    scaling: true,
    first_payout: "Bi-weekly",
  },
  instant: {
    phases: "No Evaluation",
    profit_target_1: "None",
    profit_target_2: "-",
    max_drawdown: "6%",
    daily_drawdown: "3%",
    min_trading_days: "None",
    time_limit: "Unlimited",
    leverage: "1:50",
    profit_split_start: "60%",
    profit_split_max: "75%",
    free_retry: false,
    weekend_holding: false,
    news_trading: false,
    expert_advisors: true,
    scaling: true,
    first_payout: "Bi-weekly",
  },
};

const rows = [
  { key: "phases", label: "Evaluation Phases" },
  { key: "profit_target_1", label: "Phase 1 Target" },
  { key: "profit_target_2", label: "Phase 2 Target" },
  { key: "max_drawdown", label: "Max Drawdown" },
  { key: "daily_drawdown", label: "Daily Drawdown" },
  { key: "min_trading_days", label: "Min Trading Days" },
  { key: "time_limit", label: "Time Limit" },
  { key: "leverage", label: "Max Leverage" },
  { key: "profit_split_start", label: "Starting Profit Split" },
  { key: "profit_split_max", label: "Max Profit Split" },
  { key: "first_payout", label: "First Payout" },
  { key: "free_retry", label: "Free Retry", isBoolean: true },
  { key: "weekend_holding", label: "Weekend Holding", isBoolean: true },
  { key: "news_trading", label: "News Trading", isBoolean: true },
  { key: "expert_advisors", label: "Expert Advisors (EA)", isBoolean: true },
  { key: "scaling", label: "Scaling Program", isBoolean: true },
];

export function ComparisonTable({ selectedType }: ComparisonTableProps) {
  const data = comparisonData[selectedType];
  const typeLabels = {
    "2-step": "2-Step Challenge",
    "1-step": "1-Step Challenge",
    instant: "Instant Funding",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-8">
        {typeLabels[selectedType]} Features
      </h2>

      <div className="border border-border rounded-xl overflow-hidden">
        {rows.map((row, idx) => (
          <div
            key={row.key}
            className={cn(
              "flex items-center justify-between px-5 py-3.5 text-sm",
              idx !== rows.length - 1 && "border-b border-border",
              idx % 2 === 0 && "bg-foreground/[0.01]"
            )}
          >
            <span className="text-foreground/70">{row.label}</span>
            <span className="font-medium">
              {row.isBoolean ? (
                (data as Record<string, unknown>)[row.key] ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <X className="w-4 h-4 text-foreground/30" />
                )
              ) : (
                (data as Record<string, unknown>)[row.key] as string
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
