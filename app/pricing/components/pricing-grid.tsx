"use client";

import { PricingPlan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";
import Link from "next/link";

interface PricingGridProps {
  plans: PricingPlan[];
  discount: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatAccountSize(size: number): string {
  if (size >= 1000) {
    return `$${(size / 1000).toFixed(0)}K`;
  }
  return formatCurrency(size);
}

export function PricingGrid({ plans, discount }: PricingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
      {plans.map((plan) => {
        const finalPrice = discount > 0 
          ? Math.round(plan.price * (1 - discount / 100)) 
          : plan.price;

        return (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col p-5 rounded-xl border transition-all",
              plan.is_popular
                ? "border-primary bg-primary/[0.02] ring-1 ring-primary/10"
                : "border-border hover:border-foreground/20"
            )}
          >
            {/* Popular Badge */}
            {plan.is_popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-primary text-background text-xs font-semibold rounded-full">
                <Star className="w-3 h-3" />
                Popular
              </div>
            )}

            {/* Account Size */}
            <div className="text-center mb-4 pt-2">
              <div className="text-2xl font-bold">
                {formatAccountSize(plan.account_size)}
              </div>
              <div className="text-xs text-foreground/50">{plan.name}</div>
            </div>

            {/* Price */}
            <div className="text-center mb-5">
              {discount > 0 && (
                <div className="text-sm text-foreground/40 line-through mb-1">
                  {formatCurrency(plan.price)}
                </div>
              )}
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(finalPrice)}
              </div>
              <div className="text-xs text-foreground/50 mt-1">One-time fee</div>
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-5 text-sm">
              {plan.profit_target > 0 && (
                <div className="flex justify-between">
                  <span className="text-foreground/60">Profit Target</span>
                  <span className="font-medium">{plan.profit_target}%</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-foreground/60">Max Drawdown</span>
                <span className="font-medium">{plan.max_drawdown}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Daily Drawdown</span>
                <span className="font-medium">{plan.daily_drawdown}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Profit Split</span>
                <span className="font-semibold text-primary">
                  {plan.profit_split}%
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="flex-1 space-y-2 mb-5">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/70">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/checkout/${plan.id}`}
              className={cn(
                "w-full py-2.5 text-center text-sm font-semibold rounded-lg transition-colors",
                plan.is_popular
                  ? "bg-primary text-background hover:bg-primary/90"
                  : "bg-foreground/5 hover:bg-foreground/10"
              )}
            >
              Get Started
            </Link>
          </div>
        );
      })}
    </div>
  );
}
