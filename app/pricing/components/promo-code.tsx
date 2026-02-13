"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tag, Check, AlertCircle, Loader2 } from "lucide-react";

interface PromoCodeProps {
  onApply: (discount: number) => void;
  currentDiscount: number;
}

// Demo promo codes
const VALID_CODES: Record<string, { discount: number; label: string }> = {
  ALPHA10: { discount: 10, label: "10% off" },
  ALPHA20: { discount: 20, label: "20% off" },
  WELCOME: { discount: 15, label: "15% off (New customer)" },
};

export function PromoCode({ onApply, currentDiscount }: PromoCodeProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;

    setStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const promoCode = VALID_CODES[code.toUpperCase()];
    if (promoCode) {
      setStatus("success");
      setMessage(`${promoCode.label} applied!`);
      onApply(promoCode.discount);
    } else {
      setStatus("error");
      setMessage("Invalid promo code");
      onApply(0);
    }
  };

  const handleClear = () => {
    setCode("");
    setStatus("idle");
    setMessage("");
    onApply(0);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="font-semibold mb-1">Have a promo code?</h3>
        <p className="text-sm text-foreground/50">
          Enter it below to get a discount on your purchase
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            placeholder="Enter code"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-transparent text-sm",
              "placeholder:text-foreground/30 focus:outline-none focus:ring-1",
              status === "success"
                ? "border-primary/50 focus:ring-primary/30"
                : status === "error"
                  ? "border-red-500/50 focus:ring-red-500/30"
                  : "border-border focus:ring-primary/30"
            )}
            disabled={status === "success"}
          />
        </div>

        {status === "success" ? (
          <button
            onClick={handleClear}
            className="px-5 py-2.5 text-sm font-medium text-foreground/60 bg-foreground/5 rounded-lg hover:bg-foreground/10 transition-colors"
          >
            Clear
          </button>
        ) : (
          <button
            onClick={handleApply}
            disabled={!code.trim() || status === "loading"}
            className={cn(
              "px-5 py-2.5 text-sm font-medium rounded-lg transition-colors",
              "bg-primary text-background hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Apply"
            )}
          </button>
        )}
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={cn(
            "flex items-center justify-center gap-2 mt-3 text-sm",
            status === "success" ? "text-primary" : "text-red-500"
          )}
        >
          {status === "success" ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {message}
        </div>
      )}

      {/* Current Discount Display */}
      {currentDiscount > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
          <span className="text-sm text-primary font-medium">
            You&apos;re saving {currentDiscount}% on all plans!
          </span>
        </div>
      )}
    </div>
  );
}
