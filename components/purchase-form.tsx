"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const purchaseSchema = z.object({
  challengeId: z.string().min(1, "Please select a challenge"),
  paymentMethod: z.enum(["stripe", "crypto"], {
    required_error: "Please select a payment method",
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface PurchaseFormProps {
  challengeId: string;
  challengePrice: number;
  accountSize: string;
}

export default function PurchaseForm({
  challengeId,
  challengePrice,
  accountSize,
}: PurchaseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      challengeId,
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: PurchaseFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Server-side price verification
      const response = await fetch("/api/purchase/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId: data.challengeId,
          price: challengePrice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Verification failed");
      }

      // Initialize payment session
      const paymentResponse = await fetch("/api/purchase/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId: data.challengeId,
          paymentMethod: data.paymentMethod,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Failed to create payment session");
      }

      const { sessionUrl } = await paymentResponse.json();
      window.location.href = sessionUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register("challengeId")} value={challengeId} />

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Payment Method
        </label>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
            <input
              type="radio"
              value="stripe"
              {...register("paymentMethod")}
              className="text-primary"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground">Credit/Debit Card</p>
              <p className="text-sm text-muted-foreground">Secure payment via Stripe</p>
            </div>
          </label>
          <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
            <input
              type="radio"
              value="crypto"
              {...register("paymentMethod")}
              className="text-primary"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground">Cryptocurrency</p>
              <p className="text-sm text-muted-foreground">Pay with Bitcoin, Ethereum, etc.</p>
            </div>
          </label>
        </div>
        {errors.paymentMethod && (
          <p className="mt-2 text-sm text-red-500">{errors.paymentMethod.message}</p>
        )}
      </div>

      {/* Terms Agreement */}
      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("agreeToTerms")}
            className="mt-1 text-primary rounded"
          />
          <span className="text-sm text-muted-foreground">
            I agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/risk" className="text-primary hover:underline">
              Risk Disclosure
            </a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-2 text-sm text-red-500">{errors.agreeToTerms.message}</p>
        )}
      </div>

      {/* Price Summary */}
      <div className="glass p-4 rounded-lg border border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Account Size</span>
          <span className="font-medium text-foreground">{accountSize}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">${challengePrice}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>Purchase Challenge</span>
        )}
      </button>
    </form>
  );
}
