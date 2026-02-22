"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Check,
    ChevronLeft,
    Loader2,
    Copy,
    AlertTriangle,
    Wallet,
    ArrowRight,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { PRICING_PLANS } from "@/lib/constants";
import { PricingPlan } from "@/lib/types";
import { CRYPTO_WALLETS, getWalletAddress, CRYPTO_DISCOUNT_PERCENT } from "@/lib/crypto-wallets";

function CryptoPaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const planId = searchParams.get("planId");
    const orderId = searchParams.get("orderId");
    const amountParam = searchParams.get("amount");
    const coinSymbol = searchParams.get("coin");
    const networkId = searchParams.get("network");
    const email = searchParams.get("email");

    const [plan, setPlan] = useState<PricingPlan | null>(null);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
    const [copied, setCopied] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (planId) {
            const foundPlan = PRICING_PLANS.find((p) => p.id === planId);
            if (foundPlan) setPlan(foundPlan);
        }
    }, [planId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePaymentSent = () => {
        setIsChecking(true);
        // Simulate checking blockchain
        setTimeout(() => {
            router.push(`/checkout/success?orderId=${orderId}`);
        }, 2000);
    };

    if (!plan || !amountParam || !coinSymbol || !networkId) {
        return (
            <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#F97316]" />
                    <p className="text-[#A1A1AA]">Loading payment details...</p>
                </div>
            </div>
        );
    }

    const originalAmount = parseFloat(amountParam);
    const discountAmount = (originalAmount * CRYPTO_DISCOUNT_PERCENT) / 100;
    const finalAmount = originalAmount - discountAmount;

    const walletAddress = getWalletAddress(coinSymbol, networkId);
    const wallet = CRYPTO_WALLETS.find((w) => w.symbol === coinSymbol);
    const network = wallet?.networks.find((n) => n.id === networkId);

    if (!walletAddress) {
        return (
            <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">
                <div className="text-center max-w-md px-4">
                    <AlertTriangle className="w-12 h-12 text-[#FF3366] mx-auto mb-4" />
                    <h1 className="text-xl font-bold mb-2">Wallet Address Not Found</h1>
                    <p className="text-[#A1A1AA] mb-6">
                        Could not find a wallet address for {coinSymbol} on {networkId}.
                        Please return to checkout and try again.
                    </p>
                    <Link
                        href={`/checkout/${planId}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#18181B] border border-[#3F3F46] hover:bg-[#27272A] transition-colors font-medium rounded-lg"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Return to Checkout
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#09090B] text-white">
            {/* Header */}
            <header className="border-b border-[#3F3F46] bg-[#111113]/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link
                            href={`/checkout/${planId}`}
                            className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span>Cancel Payment</span>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-[#71717A]">
                            <div className={`w-2 h-2 rounded-full ${timeLeft < 300 ? 'bg-red-500 animate-pulse' : 'bg-[#00FF88]'}`} />
                            <span className="font-mono">{formatTime(timeLeft)}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

                    {/* Payment Details */}
                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#111113] border border-[#3F3F46] p-6 lg:p-8 relative overflow-hidden"
                        >
                            {/* Background sheen */}
                            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-[#F97316]/10 blur-3xl rounded-full pointer-events-none"></div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center border border-[#F97316]/20">
                                    <Wallet className="w-5 h-5 text-[#F97316]" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-display font-bold uppercase tracking-wide">
                                        Send Payment
                                    </h1>
                                    <p className="text-xs text-[#A1A1AA]">
                                        Transfer the exact amount to the address below
                                    </p>
                                </div>
                            </div>

                            {/* Amount Display */}
                            <div className="bg-[#09090B] border border-[#27272A] p-4 mb-6 text-center">
                                <p className="text-[#A1A1AA] text-xs uppercase tracking-wider mb-1">Total Amount</p>
                                <div className="text-3xl font-mono font-bold text-white mb-1">
                                    ${finalAmount.toFixed(2)} <span className="text-lg text-[#71717A]">USD</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-2 py-1 bg-[#F97316]/10 rounded text-xs text-[#F97316] font-medium">
                                    <Check className="w-3 h-3" />
                                    5% Crypto Discount Applied
                                </div>
                            </div>

                            {/* QR Code & Address */}
                            <div className="space-y-6">
                                <div className="flex justify-center">
                                    <div className="p-4 bg-white rounded-xl shadow-lg">
                                        <QRCodeSVG
                                            value={walletAddress}
                                            size={180}
                                            level="M"
                                            includeMargin={false}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium uppercase tracking-wider text-[#71717A] mb-2 text-center">
                                        {wallet?.name} ({network?.name}) Address
                                    </label>
                                    <div className="relative group">
                                        <div className="w-full bg-[#09090B] border border-[#3F3F46] rounded px-4 py-3 font-mono text-sm break-all text-center group-hover:border-[#F97316]/50 transition-colors">
                                            {walletAddress}
                                        </div>
                                        <button
                                            onClick={() => handleCopy(walletAddress)}
                                            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                        >
                                            <div className="flex items-center gap-2 text-white font-medium">
                                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                <span>{copied ? 'Copied!' : 'Click to Copy'}</span>
                                            </div>
                                        </button>
                                    </div>
                                    <p className="text-center text-[10px] text-[#A1A1AA] mt-2 flex items-center justify-center gap-1.5">
                                        <AlertTriangle className="w-3 h-3 text-[#FF3366]" />
                                        Only send <strong>{coinSymbol}</strong> on <strong>{network?.name}</strong> network.
                                    </p>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="mt-8 pt-6 border-t border-[#27272A]">
                                <button
                                    onClick={handlePaymentSent}
                                    disabled={isChecking}
                                    className="w-full py-4 bg-[#F97316] text-black font-bold uppercase tracking-wider hover:shadow-glow-magma transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isChecking ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            I have sent the payment
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-[10px] text-[#71717A] mt-3">
                                    Click this button after you have confirmed the transaction in your wallet.
                                </p>
                            </div>

                        </motion.div>
                    </div>

                    {/* Right: Summary */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#111113] border border-[#3F3F46] p-6 text-sm"
                        >
                            <h3 className="font-display font-bold uppercase tracking-wide mb-4 text-[#A1A1AA]">Order Details</h3>

                            <div className="flex justify-between items-start mb-4 pb-4 border-b border-[#27272A]">
                                <div>
                                    <div className="font-bold text-white text-lg">{plan.name}</div>
                                    <div className="text-[#71717A]">${plan.account_size.toLocaleString()} Account</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono text-[#A1A1AA] line-through">${originalAmount.toFixed(2)}</div>
                                    <div className="font-mono text-[#F97316] font-bold">${finalAmount.toFixed(2)}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-[#A1A1AA]">Order ID</span>
                                    <span className="font-mono text-white text-xs">{orderId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A1A1AA]">Email</span>
                                    <span className="font-mono text-white text-xs">{email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A1A1AA]">Time Remaining</span>
                                    <span className={`font-mono ${timeLeft < 300 ? 'text-[#FF3366]' : 'text-[#00FF88]'} text-xs`}>
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 p-3 bg-[#27272A]/50 rounded border border-[#3F3F46] text-xs text-[#A1A1AA] leading-relaxed">
                                <p className="mb-2">
                                    <strong className="text-white">Important:</strong> Payment is detected automatically, but may take {network?.estimatedTime} depending on network congestion.
                                </p>
                                <p>
                                    Your account credentials will be emailed to you immediately after confirmation.
                                </p>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default function CryptoPaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#F97316]" />
                    <p className="text-[#A1A1AA]">Loading payment details...</p>
                </div>
            </div>
        }>
            <CryptoPaymentContent />
        </Suspense>
    );
}
