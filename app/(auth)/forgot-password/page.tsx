"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Loader2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

/**
 * Forgot Password Page - Brutalist Cinematic Design
 */
export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

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

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSubmittedEmail(data.email);
      setSuccess(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
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
          className="absolute top-0 right-0 w-[50%] h-[50%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, rgba(74,222,128,0.1) 0%, transparent 50%)",
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
              CHECK YOUR<br />
              <span className="text-emerald-400">EMAIL</span>
            </h1>

            <p className="text-white/40 mb-4 font-light">
              We&apos;ve sent a password reset link to:
            </p>
            <p className="text-white font-mono text-sm mb-8 bg-white/[0.02] p-3 border border-white/5">
              {submittedEmail}
            </p>

            <div className="bg-white/[0.02] border border-white/5 p-4 mb-8 text-left">
              <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">Didn&apos;t receive it?</p>
              <ul className="text-xs text-white/40 space-y-1">
                <li>• Check spam folder</li>
                <li>• Verify email address</li>
                <li>• Wait a few minutes</li>
              </ul>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  setSubmittedEmail("");
                }}
                className="w-full py-3 border border-white/10 text-white/60 font-mono text-sm uppercase tracking-wider hover:border-white/20 hover:text-white transition-all"
              >
                Try Different Email
              </button>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Light leaks */}
      <div
        className="absolute top-0 right-0 w-[50%] h-[50%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 30%, rgba(255,107,53,0.1) 0%, transparent 50%)",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <span
          className="text-[20vw] font-black text-white/[0.015] leading-none tracking-tighter"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          RESET
        </span>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-6 lg:p-10 flex justify-between items-center z-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white flex items-center justify-center font-black text-black text-lg group-hover:bg-[#ff6b35] transition-colors">
            A
          </div>
          <span className="text-white/60 font-medium hidden sm:block group-hover:text-white transition-colors">
            BraxleyNevim
          </span>
        </Link>
        <div className="text-xs text-white/30 uppercase tracking-[0.3em] font-mono">
          Password Reset
        </div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-6 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#ff6b35]" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-black text-white mb-4 tracking-tight"
          >
            FORGOT<br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              PASSWORD?
            </span>
          </motion.h1>
          <p className="text-white/40 font-light">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/50 to-transparent" />

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 mb-6 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-mono">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  autoFocus
                  className={`w-full pl-12 pr-4 py-4 bg-white/[0.02] border text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#ff6b35]/50 focus:bg-white/[0.04] transition-all ${errors.email ? "border-red-500/50" : "border-white/10"
                    }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-2 font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-[#ff6b35] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-white font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Reset Password →
              </span>
            </button>

            {/* Back to Login */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-white/40 hover:text-white transition-colors font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </form>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12"
        />
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
