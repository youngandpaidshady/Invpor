"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  Bitcoin,
  Shield,
  Check,
  ChevronLeft,
  Loader2,
  Tag,
  X,
  AlertCircle,
  Lock,
  Zap,
} from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
import { PricingPlan } from "@/lib/types";

type PaymentMethod = "card" | "crypto";

interface PromoCode {
  code: string;
  discount: number; // percentage
  isValid: boolean;
}

// Mock promo codes (in production, validate via API)
const validPromoCodes: Record<string, number> = {
  ALPHA10: 10,
  WELCOME15: 15,
  TRADER20: 20,
  VIP25: 25,
};

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.planId as string;

  const [plan, setPlan] = useState<PricingPlan | null>(null);
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const foundPlan = PRICING_PLANS.find((p) => p.id === planId);
    if (foundPlan) {
      setPlan(foundPlan);
    }
  }, [planId]);

  const handleApplyPromo = () => {
    setPromoError("");
    const upperCode = promoCode.toUpperCase().trim();
    
    if (!upperCode) {
      setPromoError("Please enter a promo code");
      return;
    }

    if (validPromoCodes[upperCode]) {
      setAppliedPromo({
        code: upperCode,
        discount: validPromoCodes[upperCode],
        isValid: true,
      });
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError("");
  };

  const calculateTotal = () => {
    if (!plan) return { subtotal: 0, discount: 0, total: 0 };
    
    const subtotal = plan.price;
    const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
    const total = subtotal - discount;
    
    return { subtotal, discount, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan?.id,
          challengeType: plan?.type,
          accountSize: plan?.account_size,
          price: calculateTotal().total,
          paymentMethod,
          email,
          promoCode: appliedPromo?.code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // In production, redirect to Stripe/Crypto checkout
      // For demo, redirect to success page
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Demo: redirect to success page
        router.push(`/checkout/success?orderId=${data.sessionId || data.chargeId}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-foreground/60">Loading plan details...</p>
        </div>
      </div>
    );
  }

  const { subtotal, discount, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/pricing"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Pricing</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Checkout Form */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-foreground/[0.02] border border-border rounded-2xl p-6 lg:p-8"
            >
              <h1 className="text-2xl font-bold mb-4">Complete Your Purchase</h1>
              
              {/* Demo Mode Banner */}
              <div className="mb-6 p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-sm text-amber-400">
                  <strong>Demo Mode</strong> — No real payments are processed
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                  <p className="text-xs text-foreground/50 mt-1">
                    Your account credentials will be sent to this email
                  </p>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          paymentMethod === "card"
                            ? "bg-primary/20"
                            : "bg-foreground/5"
                        }`}
                      >
                        <CreditCard
                          className={`w-5 h-5 ${
                            paymentMethod === "card"
                              ? "text-primary"
                              : "text-foreground/60"
                          }`}
                        />
                      </div>
                      <div className="text-left">
                        <p
                          className={`font-medium ${
                            paymentMethod === "card"
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          Card
                        </p>
                        <p className="text-xs text-foreground/50">
                          Visa, Mastercard
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("crypto")}
                      className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        paymentMethod === "crypto"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          paymentMethod === "crypto"
                            ? "bg-primary/20"
                            : "bg-foreground/5"
                        }`}
                      >
                        <Bitcoin
                          className={`w-5 h-5 ${
                            paymentMethod === "crypto"
                              ? "text-primary"
                              : "text-foreground/60"
                          }`}
                        />
                      </div>
                      <div className="text-left">
                        <p
                          className={`font-medium ${
                            paymentMethod === "crypto"
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          Crypto
                        </p>
                        <p className="text-xs text-foreground/50">
                          BTC, ETH, USDT
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Promo Code */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Promo Code (Optional)
                  </label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-green-400/10 border border-green-400/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-400" />
                        <span className="font-medium text-green-400">
                          {appliedPromo.code}
                        </span>
                        <span className="text-sm text-foreground/60">
                          - {appliedPromo.discount}% off
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-foreground/60" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError("");
                        }}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 py-3 bg-foreground/5 border border-border rounded-lg hover:bg-foreground/10 transition-colors font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-sm text-red-400 mt-1">{promoError}</p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary/50 mt-0.5"
                  />
                  <label htmlFor="terms" className="text-sm text-foreground/70">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                    , and{" "}
                    <Link
                      href="/risk"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      Risk Disclosure
                    </Link>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-400/10 border border-red-400/30 rounded-lg text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <Lock className="w-4 h-4" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-foreground/[0.02] border border-border rounded-2xl p-6 lg:p-8 lg:sticky lg:top-24"
            >
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>

              {/* Plan Card */}
              <div className="bg-background rounded-xl p-5 border border-border mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">
                      {plan.type} Challenge
                    </span>
                    <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
                    <p className="text-foreground/60">
                      ${plan.account_size.toLocaleString()} Account
                    </p>
                  </div>
                  {plan.is_popular && (
                    <span className="px-2 py-1 bg-amber-400/20 text-amber-400 text-xs font-medium rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>
                      {plan.profit_target > 0
                        ? `${plan.profit_target}% Profit Target`
                        : "No Profit Target"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{plan.max_drawdown}% Max Drawdown</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{plan.profit_split}% Profit Split</span>
                  </li>
                  {plan.features.slice(0, 2).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({appliedPromo.discount}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-border" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-background rounded-xl p-4 border border-border">
                <p className="text-sm font-medium mb-3">Why choose AlphaTrader?</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Instant account activation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    14-day money back guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    24/7 customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Fast payouts via bank or crypto
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
