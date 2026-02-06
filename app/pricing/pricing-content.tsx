"use client";

import { useState } from "react";
import { ChallengeType } from "@/lib/types";
import { PRICING_PLANS } from "@/lib/constants";
import { ChallengeTabs } from "./components/challenge-tabs";
import { PricingGrid } from "./components/pricing-grid";
import { ComparisonTable } from "./components/comparison-table";
import { PromoCode } from "./components/promo-code";
import { PricingFAQ } from "./components/pricing-faq";

/**
 * Pricing Content (Client Component)
 * 
 * Manages state for:
 * - Selected challenge type
 * - Promo code discount
 */

export function PricingContent() {
  const [selectedType, setSelectedType] = useState<ChallengeType>("2-step");
  const [discount, setDiscount] = useState<number>(0);

  const filteredPlans = PRICING_PLANS.filter(
    (plan) => plan.type === selectedType
  );

  return (
    <>
      {/* Header */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Choose Your Challenge
            </h1>
            <p className="text-foreground/60">
              Select a challenge type and account size that matches your trading 
              style. All plans include real market data and 24/7 support.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Type Tabs */}
      <section className="pb-8">
        <div className="container mx-auto px-4 lg:px-6">
          <ChallengeTabs
            selectedType={selectedType}
            onSelect={setSelectedType}
          />
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <PricingGrid plans={filteredPlans} discount={discount} />
        </div>
      </section>

      {/* Promo Code */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <PromoCode onApply={setDiscount} currentDiscount={discount} />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-foreground/[0.02]">
        <div className="container mx-auto px-4 lg:px-6">
          <ComparisonTable selectedType={selectedType} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <PricingFAQ />
        </div>
      </section>
    </>
  );
}
