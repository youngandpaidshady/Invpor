"use client";

import { ChallengeType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChallengeTabsProps {
  selectedType: ChallengeType;
  onSelect: (type: ChallengeType) => void;
}

const tabs: { type: ChallengeType; label: string; description: string }[] = [
  {
    type: "2-step",
    label: "2-Step Challenge",
    description: "Two phases, higher targets, better splits",
  },
  {
    type: "1-step",
    label: "1-Step Challenge",
    description: "Single phase, faster funding",
  },
  {
    type: "instant",
    label: "Instant Funding",
    description: "No evaluation, trade immediately",
  },
];

export function ChallengeTabs({ selectedType, onSelect }: ChallengeTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => onSelect(tab.type)}
          className={cn(
            "flex-1 py-4 px-5 rounded-lg border text-left transition-all",
            selectedType === tab.type
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-foreground/20 hover:bg-foreground/[0.02]"
          )}
        >
          <div className="font-semibold text-sm mb-1">{tab.label}</div>
          <div className="text-xs text-foreground/50">{tab.description}</div>
        </button>
      ))}
    </div>
  );
}
