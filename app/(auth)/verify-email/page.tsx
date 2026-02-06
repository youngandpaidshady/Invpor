"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type VerificationState = "loading" | "success" | "error" | "pending";

/**
 * Verify Email Page - Brutalist Cinematic Design
 */
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<VerificationState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const checkVerification = async () => {
      const supabase = createClient();
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        setError(sessionError.message);
        setState("error");
        return;
      }

      if (session?.user?.email_confirmed_at) {
        setState("success");
        return;
      }

      if (session?.user?.email) {
        setEmail(session.user.email);
      }
      setState("pending");
    };

    checkVerification();
  }, [searchParams]);

  const handleResendEmail = async () => {
    if (!email) return;

    setIsResending(true);
    setResendSuccess(false);

    try {
      const supabase = createClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (resendError) {
        setError(resendError.message);
        return;
      }

      setResendSuccess(true);
    } catch {
      setError("Failed to resend verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // Loading state
  if (state === "loading") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#ff6b35] mb-4" />
          <p className="text-white/40 font-mono text-sm uppercase tracking-wider">Verifying...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (state === "success") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
        {/* Film grain */}
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Light leak - green for success */}
        <div
          className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, rgba(74,222,128,0.15) 0%, transparent 50%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 relative z-10"
        >
          <div className="bg-white/[0.03] border border-white/10 p-10 text-center relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>

            <h1 className="text-3xl font-black text-white mb-4 tracking-tight">
              EMAIL<br />
              <span className="text-emerald-400">VERIFIED</span>
            </h1>

            <p className="text-white/40 mb-8 font-light">
              Your email has been successfully verified. You now have full access to your account.
            </p>

            <Link
              href="/dashboard"
              className="group relative block w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-white font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Go to Dashboard →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (state === "error") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
        {/* Film grain */}
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Light leak - red for error */}
        <div
          className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, rgba(239,68,68,0.1) 0%, transparent 50%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 relative z-10"
        >
          <div className="bg-white/[0.03] border border-white/10 p-10 text-center relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>

            <h1 className="text-3xl font-black text-white mb-4 tracking-tight">
              VERIFICATION<br />
              <span className="text-red-400">FAILED</span>
            </h1>

            <p className="text-white/40 mb-8 font-light">
              {error || "We couldn't verify your email. The link may have expired."}
            </p>

            <div className="space-y-4">
              <Link
                href="/signup"
                className="group relative block w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Try Again
                  <ArrowRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-[#ff6b35] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                href="/login"
                className="block text-sm text-white/40 hover:text-white transition-colors font-mono"
              >
                ← Back to Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Pending verification state
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Light leak */}
      <div
        className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 30%, rgba(255,107,53,0.1) 0%, transparent 50%)",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <span
          className="text-[20vw] font-black text-white/[0.015] leading-none tracking-tighter"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          VERIFY
        </span>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-6 lg:p-10 flex justify-between items-center z-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white flex items-center justify-center font-black text-black text-lg group-hover:bg-[#ff6b35] transition-colors">
            A
          </div>
          <span className="text-white/60 font-medium hidden sm:block group-hover:text-white transition-colors">
            AlphaTrader
          </span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-6 relative z-10"
      >
        <div className="bg-white/[0.03] border border-white/10 p-10 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/50 to-transparent" />

          <div className="w-20 h-20 bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center mx-auto mb-8">
            <Mail className="w-10 h-10 text-[#ff6b35]" />
          </div>

          <h1 className="text-3xl font-black text-white mb-4 tracking-tight">
            VERIFY YOUR<br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              EMAIL
            </span>
          </h1>

          <p className="text-white/40 mb-2 font-light">
            We sent a verification link to:
          </p>
          {email && (
            <p className="text-white font-mono text-sm mb-6 bg-white/[0.02] p-3 border border-white/5">
              {email}
            </p>
          )}

          {resendSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 mb-6 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <p className="text-sm font-mono">Verification email sent!</p>
            </motion.div>
          )}

          <div className="bg-white/[0.02] border border-white/5 p-4 mb-6 text-left">
            <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">Didn&apos;t receive it?</p>
            <ul className="text-xs text-white/40 space-y-1">
              <li>• Check spam folder</li>
              <li>• Verify email address</li>
              <li>• Wait a few minutes</li>
            </ul>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={isResending || resendSuccess}
              className="w-full py-3 border border-white/10 text-white/60 font-mono text-sm uppercase tracking-wider hover:border-white/20 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Resend Email
                </>
              )}
            </button>
            <Link
              href="/login"
              className="block text-sm text-white/40 hover:text-white transition-colors font-mono"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
          <Loader2 className="w-12 h-12 animate-spin text-[#ff6b35]" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
