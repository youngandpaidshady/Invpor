"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  Mail,
  ArrowRight,
  Copy,
  Check,
  Rocket,
  BookOpen,
  MessageCircle,
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [copied, setCopied] = useState(false);

  // Mock order data (in production, fetch from API based on orderId)
  const orderData = {
    orderId: orderId || "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    planName: "Professional",
    planType: "2-Step Challenge",
    accountSize: 50000,
    amount: 299,
    email: "user@example.com",
    createdAt: new Date().toISOString(),
    credentials: {
      platform: "MetaTrader 5",
      server: "BraxleyNevim-Live",
      login: "AT" + Math.floor(100000 + Math.random() * 900000),
      password: "••••••••",
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Fire confetti or celebration animation
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      // Simple celebration effect using CSS
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-12 h-12 text-green-400" />
            </motion.div>
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400/30"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold mb-3"
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-foreground/60 text-lg"
          >
            Your challenge account is ready. Let&apos;s start trading!
          </motion.p>

          {/* Demo Mode Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-sm text-amber-400"
          >
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            Demo Mode — No real payment processed
          </motion.div>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-foreground/[0.02] border border-border rounded-2xl overflow-hidden mb-6"
        >
          {/* Header */}
          <div className="p-6 border-b border-border bg-foreground/[0.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Order ID</p>
                <p className="font-mono font-medium">{orderData.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground/60 mb-1">Amount Paid</p>
                <p className="text-2xl font-bold text-green-400">
                  ${orderData.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Plan Info */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Plan</p>
                <p className="font-semibold text-lg">{orderData.planName}</p>
                <p className="text-sm text-foreground/60">{orderData.planType}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground/60 mb-1">Account Size</p>
                <p className="font-semibold text-lg">
                  ${orderData.accountSize.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              Your Trading Credentials
            </h3>
            <div className="bg-background rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Platform</span>
                <span className="font-medium">{orderData.credentials.platform}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Server</span>
                <span className="font-medium">{orderData.credentials.server}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Login ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">
                    {orderData.credentials.login}
                  </span>
                  <button
                    onClick={() => handleCopy(orderData.credentials.login)}
                    className="p-1 hover:bg-foreground/10 rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-foreground/60" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Password</span>
                <span className="text-sm text-foreground/50">
                  Sent to your email
                </span>
              </div>
            </div>
            <p className="text-xs text-foreground/50 mt-3 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              Full credentials have been sent to {orderData.email}
            </p>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-foreground/[0.02] border border-border rounded-2xl p-6 mb-6"
        >
          <h3 className="font-semibold mb-4">Next Steps</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Check Your Email</p>
                <p className="text-sm text-foreground/60">
                  We&apos;ve sent your login credentials and setup instructions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Download MetaTrader 5</p>
                <p className="text-sm text-foreground/60">
                  Install the platform and login with your credentials
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Start Trading</p>
                <p className="text-sm text-foreground/60">
                  Review the rules and begin your challenge
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid sm:grid-cols-3 gap-4 mb-8"
        >
          <Link
            href="/rules"
            className="flex items-center gap-3 p-4 bg-foreground/[0.02] border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-medium">Trading Rules</span>
          </Link>
          <Link
            href="/faq"
            className="flex items-center gap-3 p-4 bg-foreground/[0.02] border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="font-medium">FAQ</span>
          </Link>
          <button onClick={() => alert("Downloading MT5 platform...")} type="button" className="flex items-center gap-3 p-4 bg-foreground/[0.02] border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Download className="w-5 h-5 text-primary" />
            <span className="font-medium">Download MT5</span>
          </button>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all text-lg"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-foreground/60">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
