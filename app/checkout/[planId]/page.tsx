"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
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

interface CryptoCoin {
  symbol: string;
  name: string;
  color: string;
  networks?: string[];
}

const cryptoOptions: CryptoCoin[] = [
  { symbol: "BTC", name: "Bitcoin", color: "#F7931A", networks: ["btc"] },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA", networks: ["erc20"] },
  {
    symbol: "USDT",
    name: "Tether",
    color: "#26A17B",
    networks: ["erc20", "trc20"],
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    color: "#2775CA",
    networks: ["erc20", "trc20"],
  },
  { symbol: "SOL", name: "Solana", color: "#9945FF", networks: ["sol"] },
  { symbol: "LTC", name: "Litecoin", color: "#BFBBBB", networks: ["ltc"] },
];

interface PromoCode {
  code: string;
  discount: number;
  isValid: boolean;
}

const validPromoCodes: Record<string, number> = {
  ALPHA10: 10,
  WELCOME15: 15,
  TRADER20: 20,
  VIP25: 25,
};

const CRYPTO_DISCOUNT = 5; // 5% off for crypto payments

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.planId as string;

  const [plan, setPlan] = useState<PricingPlan | null>(null);
  const [email, setEmail] = useState("");

  console.log("Checkout Page Params:", params);
  console.log("Current PlanID:", planId);

  useEffect(() => {
    console.log("Searching for plan with ID:", planId);
    const foundPlan = PRICING_PLANS.find((p) => p.id === planId);
    console.log("Found Plan:", foundPlan);
    if (foundPlan) {
      setPlan(foundPlan);
    } else {
      console.error("Plan not found in constants!");
    }
  }, [planId]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("BTC");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
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

  // Auto-select network when crypto changes
  useEffect(() => {
    const coin = cryptoOptions.find((c) => c.symbol === selectedCrypto);
    if (coin?.networks?.length) {
      setSelectedNetwork(coin.networks[0]);
    }
  }, [selectedCrypto]);

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
    if (!plan) return { subtotal: 0, promoDiscount: 0, cryptoDiscount: 0, total: 0 };

    const subtotal = plan.price;
    const promoDiscount = appliedPromo
      ? (subtotal * appliedPromo.discount) / 100
      : 0;
    const afterPromo = subtotal - promoDiscount;
    const cryptoDiscount =
      paymentMethod === "crypto" ? (afterPromo * CRYPTO_DISCOUNT) / 100 : 0;
    const total = afterPromo - cryptoDiscount;

    return { subtotal, promoDiscount, cryptoDiscount, total };
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
          cryptoCoin: paymentMethod === "crypto" ? selectedCrypto : undefined,
          cryptoNetwork:
            paymentMethod === "crypto" ? selectedNetwork : undefined,
          email,
          promoCode: appliedPromo?.code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      } else {
        router.push(
          `/checkout/success?orderId=${data.sessionId || data.chargeId}`
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#F97316]" />
          <p className="text-[#A1A1AA]">Loading plan details...</p>
        </div>
      </div>
    );
  }

  const { subtotal, promoDiscount, cryptoDiscount, total } = calculateTotal();
  const activeCoin = cryptoOptions.find((c) => c.symbol === selectedCrypto);

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Header */}
      <header className="border-b border-[#3F3F46] bg-[#111113]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/pricing"
              className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Pricing</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-[#71717A]">
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
              className="bg-[#111113] border border-[#3F3F46] p-6 lg:p-8"
            >
              <h1 className="text-2xl font-display font-bold uppercase tracking-wide mb-6">
                Complete Your Purchase
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#A1A1AA]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[#09090B] border border-[#3F3F46] text-white placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all font-mono text-sm"
                    required
                  />
                  <p className="text-[10px] text-[#71717A] mt-1 uppercase tracking-wider">
                    Your account credentials will be sent here
                  </p>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-[#A1A1AA]">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 border-2 transition-all flex items-center gap-3 ${paymentMethod === "card"
                        ? "border-[#F97316] bg-[#F97316]/5"
                        : "border-[#27272A] hover:border-[#3F3F46]"
                        }`}
                    >
                      <div
                        className={`w-10 h-10 flex items-center justify-center ${paymentMethod === "card"
                          ? "bg-[#F97316]/20"
                          : "bg-[#18181B]"
                          }`}
                      >
                        <CreditCard
                          className={`w-5 h-5 ${paymentMethod === "card"
                            ? "text-[#F97316]"
                            : "text-[#71717A]"
                            }`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="text-left">
                        <p
                          className={`font-medium text-sm ${paymentMethod === "card"
                            ? "text-white"
                            : "text-[#A1A1AA]"
                            }`}
                        >
                          Card
                        </p>
                        <p className="text-[10px] text-[#71717A]">
                          Visa, Mastercard
                        </p>
                      </div>
                    </button>

                    {/* Crypto */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("crypto")}
                      className={`relative p-4 border-2 transition-all flex items-center gap-3 ${paymentMethod === "crypto"
                        ? "border-[#F97316] bg-[#F97316]/5"
                        : "border-[#27272A] hover:border-[#3F3F46]"
                        }`}
                    >
                      {/* Discount badge */}
                      <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-[#00FF88] text-black text-[9px] font-bold uppercase tracking-wider">
                        -5%
                      </div>
                      <div
                        className={`w-10 h-10 flex items-center justify-center ${paymentMethod === "crypto"
                          ? "bg-[#F97316]/20"
                          : "bg-[#18181B]"
                          }`}
                      >
                        <Zap
                          className={`w-5 h-5 ${paymentMethod === "crypto"
                            ? "text-[#F97316]"
                            : "text-[#71717A]"
                            }`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="text-left">
                        <p
                          className={`font-medium text-sm ${paymentMethod === "crypto"
                            ? "text-white"
                            : "text-[#A1A1AA]"
                            }`}
                        >
                          Crypto
                        </p>
                        <p className="text-[10px] text-[#71717A]">
                          6 coins accepted
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Crypto Coin Selector (shown when crypto selected) */}
                {paymentMethod === "crypto" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium mb-3 text-[#A1A1AA]">
                      Select Cryptocurrency
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {cryptoOptions.map((coin) => (
                        <button
                          key={coin.symbol}
                          type="button"
                          onClick={() => setSelectedCrypto(coin.symbol)}
                          className={`flex flex-col items-center gap-1.5 py-3 px-2 border transition-all ${selectedCrypto === coin.symbol
                            ? "border-[#F97316] bg-[#F97316]/5"
                            : "border-[#27272A] hover:border-[#3F3F46]"
                            }`}
                        >
                          <span
                            className="font-mono text-sm font-bold"
                            style={{
                              color:
                                selectedCrypto === coin.symbol
                                  ? coin.color
                                  : "#71717A",
                            }}
                          >
                            {coin.symbol}
                          </span>
                          <span className="text-[8px] text-[#71717A] uppercase tracking-wider">
                            {coin.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Network Selector (for USDT/USDC) */}
                    {activeCoin && activeCoin.networks && activeCoin.networks.length > 1 && (
                      <div className="mt-4">
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-2">
                          Network
                        </label>
                        <div className="flex gap-2">
                          {activeCoin.networks.map((network) => (
                            <button
                              key={network}
                              type="button"
                              onClick={() => setSelectedNetwork(network)}
                              className={`px-4 py-2 text-xs font-mono border transition-all ${selectedNetwork === network
                                ? "border-[#F97316] bg-[#F97316]/5 text-white"
                                : "border-[#27272A] text-[#71717A] hover:border-[#3F3F46]"
                                }`}
                            >
                              {network === "erc20" ? "ERC-20" : network === "trc20" ? "TRC-20" : network.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Crypto info */}
                    <div className="mt-4 p-3 bg-[#F97316]/5 border border-[#F97316]/20">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#F97316]" strokeWidth={1.5} />
                        <span className="text-xs text-[#F97316] font-medium">
                          5% discount applied automatically
                        </span>
                      </div>
                      <p className="text-[10px] text-[#71717A] mt-1 ml-6">
                        You&apos;ll receive a payment address after confirming your order.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Promo Code */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#A1A1AA]">
                    Promo Code (Optional)
                  </label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-[#00FF88]/5 border border-[#00FF88]/30">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#00FF88]" />
                        <span className="font-medium font-mono text-[#00FF88]">
                          {appliedPromo.code}
                        </span>
                        <span className="text-sm text-[#A1A1AA]">
                          - {appliedPromo.discount}% off
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="p-1 hover:bg-[#18181B] transition-colors"
                      >
                        <X className="w-4 h-4 text-[#71717A]" />
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
                        className="flex-1 px-4 py-3 bg-[#09090B] border border-[#3F3F46] text-white placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all font-mono text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 py-3 bg-[#18181B] border border-[#3F3F46] text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-all text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-sm text-[#FF3366] mt-1">{promoError}</p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 border-[#3F3F46] bg-[#09090B] text-[#F97316] focus:ring-[#F97316]/50 mt-0.5"
                  />
                  <label htmlFor="terms" className="text-sm text-[#A1A1AA]">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[#F97316] hover:underline"
                      target="_blank"
                    >
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link
                      href="/privacy"
                      className="text-[#F97316] hover:underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                    , and{" "}
                    <Link
                      href="/risk"
                      className="text-[#F97316] hover:underline"
                      target="_blank"
                    >
                      Risk Disclosure
                    </Link>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-[#FF3366]/5 border border-[#FF3366]/30 text-[#FF3366]">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 font-bold uppercase tracking-wider text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${paymentMethod === "crypto"
                    ? "bg-[#F97316] text-black hover:shadow-glow-magma"
                    : "bg-[#F97316] text-black hover:shadow-glow-magma"
                    }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      {paymentMethod === "crypto"
                        ? `Pay ${selectedCrypto} — $${total.toFixed(2)}`
                        : `Pay $${total.toFixed(2)}`}
                    </>
                  )}
                </button>

                {/* Security */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#27272A]">
                  <div className="flex items-center gap-2 text-[10px] text-[#71717A] uppercase tracking-wider">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#71717A] uppercase tracking-wider">
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
              className="bg-[#111113] border border-[#3F3F46] p-6 lg:p-8 lg:sticky lg:top-24"
            >
              <h2 className="text-lg font-display font-bold uppercase tracking-wide mb-6">
                Order Summary
              </h2>

              {/* Plan Card */}
              <div className="bg-[#09090B] p-5 border border-[#27272A] mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-1 bg-[#F97316]/10 text-[#F97316] uppercase">
                      {plan.type} Challenge
                    </span>
                    <h3 className="text-xl font-display font-bold mt-2 text-white">
                      {plan.name}
                    </h3>
                    <p className="text-[#A1A1AA] text-sm">
                      ${plan.account_size.toLocaleString()} Account
                    </p>
                  </div>
                  {plan.is_popular && (
                    <span className="px-2 py-1 bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                    <Check className="w-4 h-4 text-[#00FF88]" />
                    <span>
                      {plan.profit_target > 0
                        ? `${plan.profit_target}% Profit Target`
                        : "No Profit Target"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                    <Check className="w-4 h-4 text-[#00FF88]" />
                    <span>{plan.max_drawdown}% Max Drawdown</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                    <Check className="w-4 h-4 text-[#00FF88]" />
                    <span>{plan.profit_split}% Profit Split</span>
                  </li>
                  {plan.features.slice(0, 2).map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-[#A1A1AA]"
                    >
                      <Check className="w-4 h-4 text-[#00FF88]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A1A1AA]">Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-sm text-[#00FF88]">
                    <span>
                      Promo ({appliedPromo.code} −{appliedPromo.discount}%)
                    </span>
                    <span className="font-mono">
                      −${promoDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                {paymentMethod === "crypto" && cryptoDiscount > 0 && (
                  <div className="flex justify-between text-sm text-[#00FF88]">
                    <span>Crypto discount (−5%)</span>
                    <span className="font-mono">
                      −${cryptoDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="h-px bg-[#3F3F46]" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="font-mono text-[#F97316]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                {paymentMethod === "crypto" && (
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider text-right">
                    Paying with {selectedCrypto} on{" "}
                    {selectedNetwork === "erc20" ? "ERC-20" : selectedNetwork === "trc20" ? "TRC-20" : selectedNetwork.toUpperCase()} network
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="bg-[#09090B] p-4 border border-[#27272A]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-3">
                  Why BraxleyNevim
                </p>
                <ul className="space-y-2 text-sm text-[#A1A1AA]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F97316]" />
                    Instant account activation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F97316]" />
                    14-day money back guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F97316]" />
                    24/7 customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F97316]" />
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
