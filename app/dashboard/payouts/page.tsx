"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Filter,
  Download,
  X,
  Building2,
  Wallet,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";

type PayoutStatus = "pending" | "processing" | "completed" | "rejected";

interface Payout {
  id: string;
  amount: number;
  method: "bank" | "crypto";
  status: PayoutStatus;
  challengeName: string;
  requestedAt: string;
  processedAt?: string;
  transactionId?: string;
}

const mockPayouts: Payout[] = [
  {
    id: "pay-001",
    amount: 2500,
    method: "bank",
    status: "completed",
    challengeName: "$50K Funded Account",
    requestedAt: "2026-01-20",
    processedAt: "2026-01-23",
    transactionId: "TXN-84729301",
  },
  {
    id: "pay-002",
    amount: 1200,
    method: "crypto",
    status: "processing",
    challengeName: "$50K Funded Account",
    requestedAt: "2026-01-28",
  },
  {
    id: "pay-003",
    amount: 800,
    method: "bank",
    status: "pending",
    challengeName: "$25K Funded Account",
    requestedAt: "2026-01-30",
  },
  {
    id: "pay-004",
    amount: 500,
    method: "crypto",
    status: "rejected",
    challengeName: "$25K Funded Account",
    requestedAt: "2026-01-15",
    processedAt: "2026-01-16",
  },
];

const statusConfig: Record<
  PayoutStatus,
  { label: string; color: string; bgColor: string; icon: typeof Clock }
> = {
  pending: {
    label: "Pending",
    color: "text-amber-400",
    bgColor: "bg-amber-400/20",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
    icon: AlertCircle,
  },
  completed: {
    label: "Completed",
    color: "text-green-400",
    bgColor: "bg-green-400/20",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-400",
    bgColor: "bg-red-400/20",
    icon: XCircle,
  },
};

const fundedAccounts = [
  { id: "fa-001", name: "$50K Funded Account", availableBalance: 4230 },
  { id: "fa-002", name: "$25K Funded Account", availableBalance: 1450 },
];

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function PayoutsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "crypto">("bank");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<PayoutStatus | "all">("all");
  const [isFunded, setIsFunded] = useState<boolean | null>(null);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [fundedAccounts, setFundedAccounts] = useState<{ id: string; name: string; availableBalance: number }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsFunded(false); return; }

      // Check for funded challenges
      const { data: challenges } = await supabase
        .from("challenges")
        .select("id, account_size, current_balance, start_balance, status")
        .eq("user_id", user.id)
        .eq("status", "funded");

      if (!challenges || challenges.length === 0) {
        setIsFunded(false);
        return;
      }

      setIsFunded(true);
      setFundedAccounts(challenges.map(c => ({
        id: c.id,
        name: `$${(c.account_size || 0).toLocaleString()} Funded Account`,
        availableBalance: Math.max(0, (c.current_balance || 0) - (c.start_balance || 0)),
      })));

      // Fetch payout history
      const { data: payoutData } = await supabase
        .from("payouts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (payoutData) {
        setPayouts(payoutData.map((p: { id: string; amount: number; method: string; status: string; challenge_id: string; created_at: string; processed_at?: string; transaction_id?: string }) => ({
          id: p.id,
          amount: p.amount,
          method: (p.method || "bank") as "bank" | "crypto",
          status: (p.status || "pending") as PayoutStatus,
          challengeName: `Challenge ${p.challenge_id?.slice(-6) || ""} `,
          requestedAt: p.created_at,
          processedAt: p.processed_at,
          transactionId: p.transaction_id,
        })));
      }
    };
    loadData();
  }, []);

  // Loading state
  if (isFunded === null) {
    return <div className="flex items-center justify-center min-h-[400px] text-foreground/60">Loading...</div>;
  }

  // If user is not funded, show Locked View
  if (!isFunded) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Payouts</h1>
          <p className="text-foreground/60">
            Request and track your withdrawals
          </p>
        </div>

        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-2xl bg-foreground/[0.02] text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Payouts Locked</h2>
          <p className="text-foreground/60 max-w-md mb-8">
            Payouts are only available for funded traders. Complete your evaluation phase to unlock withdrawals and keep up to 90% of your profits.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              Return to Dashboard
            </Link>
            <Link href="/rules" className="px-6 py-3 border border-border font-semibold rounded-lg hover:bg-muted transition-colors">
              View Trading Rules
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredPayouts = payouts.filter(
    (payout) => filterStatus === "all" || payout.status === filterStatus
  );

  const totalWithdrawn = payouts
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payouts
    .filter((p) => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalAvailable = fundedAccounts.reduce(
    (sum, a) => sum + a.availableBalance,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsModalOpen(false);
    setSelectedAccount("");
    setAmount("");
    setPaymentMethod("bank");
  };

  const selectedAccountData = fundedAccounts.find(
    (a) => a.id === selectedAccount
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Payouts</h1>
          <p className="text-foreground/60">
            Request and track your withdrawals
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Request Payout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Total Withdrawn</p>
          <p className="text-2xl font-bold text-green-400">
            ${totalWithdrawn.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-400">
            ${pendingAmount.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Available to Withdraw</p>
          <p className="text-2xl font-bold">${totalAvailable.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as PayoutStatus | "all")
            }
            className="pl-10 pr-8 py-2.5 bg-foreground/[0.02] border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button type="button" onClick={() => alert("Exporting payouts...")} className="px-4 py-2.5 border border-border rounded-lg hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Payouts Table */}
      <div className="bg-foreground/[0.02] border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-foreground/60 border-b border-border bg-foreground/[0.02]">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Account</th>
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-8 h-8 text-foreground/30" />
                    </div>
                    <p className="text-foreground/60">No payouts found</p>
                  </td>
                </tr>
              ) : (
                filteredPayouts.map((payout) => {
                  const status = statusConfig[payout.status];
                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={payout.id}
                      className="border-b border-border/50 last:border-0 hover:bg-foreground/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">
                            {new Date(payout.requestedAt).toLocaleDateString()}
                          </p>
                          {payout.processedAt && (
                            <p className="text-xs text-foreground/60">
                              Processed{" "}
                              {new Date(payout.processedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">{payout.challengeName}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 capitalize">
                          {payout.method === "bank" ? (
                            <Building2 className="w-4 h-4 text-foreground/60" />
                          ) : (
                            <Wallet className="w-4 h-4 text-foreground/60" />
                          )}
                          {payout.method === "bank"
                            ? "Bank Transfer"
                            : "Crypto"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        ${payout.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${status.bgColor} ${status.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-foreground/60">
                        {payout.transactionId || "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Payout Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-background border border-border rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold">Request Payout</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-foreground/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Select Account */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Account
                  </label>
                  <select
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-foreground/[0.02] border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  >
                    <option value="">Choose an account</option>
                    {fundedAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} — ${account.availableBalance.toLocaleString()} available
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      min={100}
                      max={selectedAccountData?.availableBalance || 0}
                      className="w-full pl-10 pr-4 py-3 bg-foreground/[0.02] border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Enter amount"
                    />
                  </div>
                  {selectedAccountData && (
                    <p className="text-sm text-foreground/60 mt-1">
                      Max: ${selectedAccountData.availableBalance.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bank")}
                      className={`p-4 rounded-lg border transition-all flex flex-col items-center gap-2 ${paymentMethod === "bank"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-foreground/30"
                        }`}
                    >
                      <Building2
                        className={`w-6 h-6 ${paymentMethod === "bank"
                          ? "text-primary"
                          : "text-foreground/60"
                          }`}
                      />
                      <span
                        className={`text-sm font-medium ${paymentMethod === "bank"
                          ? "text-primary"
                          : "text-foreground/60"
                          }`}
                      >
                        Bank Transfer
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("crypto")}
                      className={`p-4 rounded-lg border transition-all flex flex-col items-center gap-2 ${paymentMethod === "crypto"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-foreground/30"
                        }`}
                    >
                      <Wallet
                        className={`w-6 h-6 ${paymentMethod === "crypto"
                          ? "text-primary"
                          : "text-foreground/60"
                          }`}
                      />
                      <span
                        className={`text-sm font-medium ${paymentMethod === "crypto"
                          ? "text-primary"
                          : "text-foreground/60"
                          }`}
                      >
                        Crypto
                      </span>
                    </button>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-foreground/5 rounded-lg p-4">
                  <p className="text-sm text-foreground/70">
                    <strong>Processing Time:</strong>{" "}
                    {paymentMethod === "bank"
                      ? "1-3 business days"
                      : "Within 24 hours"}
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedAccount || !amount}
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Request Payout
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
