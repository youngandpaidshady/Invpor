"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  XCircle,
  RefreshCw,
  MessageCircle,
  ArrowLeft,
  AlertTriangle,
  HelpCircle,
  Mail,
} from "lucide-react";

function FailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorCode = searchParams.get("error") || "payment_failed";
  const planId = searchParams.get("planId");

  const errorMessages: Record<string, { title: string; description: string }> = {
    payment_failed: {
      title: "Payment Failed",
      description:
        "Your payment could not be processed. Please check your payment details and try again.",
    },
    card_declined: {
      title: "Card Declined",
      description:
        "Your card was declined. Please try a different card or contact your bank.",
    },
    insufficient_funds: {
      title: "Insufficient Funds",
      description:
        "Your card has insufficient funds. Please try a different payment method.",
    },
    expired_card: {
      title: "Expired Card",
      description:
        "Your card has expired. Please use a valid card or try a different payment method.",
    },
    processing_error: {
      title: "Processing Error",
      description:
        "An error occurred while processing your payment. Please try again later.",
    },
    cancelled: {
      title: "Payment Cancelled",
      description:
        "Your payment was cancelled. No charges have been made to your account.",
    },
  };

  const error = errorMessages[errorCode] || errorMessages.payment_failed;

  const handleRetry = () => {
    if (planId) {
      router.push(`/checkout/${planId}`);
    } else {
      router.push("/pricing");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Error Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-red-400/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <XCircle className="w-12 h-12 text-red-400" />
            </motion.div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-3"
          >
            {error.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-foreground/60"
          >
            {error.description}
          </motion.p>
        </motion.div>

        {/* Error Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-foreground/[0.02] border border-border rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">What happened?</p>
              <p className="text-sm text-foreground/60">
                The payment processor was unable to complete your transaction.
                This could be due to:
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-foreground/60 ml-8">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              Incorrect card details
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              Card restrictions by your bank
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              Network or connectivity issues
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              Temporary payment system outage
            </li>
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 mb-8"
        >
          <button
            onClick={handleRetry}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/pricing"
            className="w-full py-4 bg-foreground/5 text-foreground font-semibold rounded-xl hover:bg-foreground/10 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Pricing
          </Link>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-foreground/[0.02] border border-border rounded-2xl p-6"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Need Help?
          </h3>
          <p className="text-sm text-foreground/60 mb-4">
            If you continue to experience issues, our support team is here to
            help. We&apos;ll get you started as quickly as possible.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href="/contact"
              className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Live Chat</p>
                <p className="text-xs text-foreground/50">Available 24/7</p>
              </div>
            </Link>
            <a
              href="mailto:support@braxleynevim.com"
              className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Email Support</p>
                <p className="text-xs text-foreground/50">Response in 24h</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-foreground/40 mt-6"
        >
          No charges were made to your account. Error code: {errorCode}
        </motion.p>
      </div>
    </div>
  );
}

export default function CheckoutFailedPage() {
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
      <FailedContent />
    </Suspense>
  );
}
