"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Check,
  ArrowRight,
} from "lucide-react";
import { signupSchema, SignupInput } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

const passwordRequirements = [
  { label: "8+ characters", regex: /.{8,}/ },
  { label: "Uppercase", regex: /[A-Z]/ },
  { label: "Number", regex: /[0-9]/ },
];

/**
 * Signup Page - Brutalist Cinematic Design
 * Matching the homepage aesthetic
 */
export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agree_terms: false as unknown as true,
    },
  });

  const watchPassword = watch("password", "");

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

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("This email is already registered. Please sign in instead.");
        } else {
          setError(signUpError.message);
        }
        return;
      }

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
          <div className="bg-white/[0.03] border border-white/10 p-10 text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10 text-emerald-400" />
            </div>

            <h1 className="text-3xl font-black text-white mb-4 tracking-tight">
              CHECK YOUR<br />
              <span className="text-emerald-400">EMAIL</span>
            </h1>

            <p className="text-white/40 mb-8 font-light">
              We&apos;ve sent a verification link to your inbox. Click it to activate your account.
            </p>

            <div className="bg-white/[0.02] border border-white/5 p-4 mb-8">
              <p className="text-xs text-white/40 font-mono">
                Didn&apos;t receive it? Check spam or{" "}
                <button
                  onClick={() => setSuccess(false)}
                  className="text-[#C7A257] hover:underline"
                >
                  try again
                </button>
              </p>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors"
            >
              ← Back to Sign In
            </Link>
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

      {/* Dramatic light leaks */}
      <div
        className="absolute top-0 left-0 w-[50%] h-[50%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 20%, rgba(199,162,87,0.12) 0%, transparent 50%)",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[40%] h-[40%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 80%, rgba(199,162,87,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <span
          className="text-[25vw] font-black text-white/[0.015] leading-none tracking-tighter"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          JOIN
        </span>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-6 lg:p-10 flex justify-between items-center z-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white flex items-center justify-center font-black text-black text-lg group-hover:bg-[#C7A257] transition-colors">
            A
          </div>
          <span className="text-white/60 font-medium hidden sm:block group-hover:text-white transition-colors">
            BraxleyNevim
          </span>
        </Link>
        <div className="text-xs text-white/30 uppercase tracking-[0.3em] font-mono">
          Create Account
        </div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-6 relative z-10 mt-16"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight"
          >
            START YOUR<br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #C7A257 0%, #F0D78C 50%, #C7A257 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              JOURNEY
            </span>
          </motion.h1>
          <p className="text-white/40 font-light">
            Create your account and get funded
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C7A257]/50 to-transparent" />

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-3">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  {...register("full_name")}
                  type="text"
                  autoComplete="name"
                  className={`w-full pl-12 pr-4 py-4 bg-white/[0.02] border text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C7A257]/50 focus:bg-white/[0.04] transition-all ${errors.full_name ? "border-red-500/50" : "border-white/10"
                    }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.full_name && (
                <p className="text-red-400 text-xs mt-2 font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.full_name.message}
                </p>
              )}
            </div>

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
                  className={`w-full pl-12 pr-4 py-4 bg-white/[0.02] border text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C7A257]/50 focus:bg-white/[0.04] transition-all ${errors.email ? "border-red-500/50" : "border-white/10"
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

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className={`w-full pl-12 pr-12 py-4 bg-white/[0.02] border text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C7A257]/50 focus:bg-white/[0.04] transition-all ${errors.password ? "border-red-500/50" : "border-white/10"
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Requirements - Inline */}
              <div className="mt-3 flex gap-4">
                {passwordRequirements.map((req) => {
                  const isMet = req.regex.test(watchPassword || "");
                  return (
                    <div
                      key={req.label}
                      className={`flex items-center gap-1.5 text-xs font-mono ${isMet ? "text-emerald-400" : "text-white/30"
                        }`}
                    >
                      <Check className={`w-3 h-3 ${isMet ? "opacity-100" : "opacity-30"}`} />
                      {req.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                {...register("agree_terms")}
                type="checkbox"
                id="agree_terms"
                className="w-4 h-4 mt-0.5 bg-white/[0.02] border border-white/20 rounded-none accent-[#C7A257]"
              />
              <label htmlFor="agree_terms" className="text-xs text-white/40 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-[#C7A257] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#C7A257] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agree_terms && (
              <p className="text-red-400 text-xs font-mono flex items-center gap-1.5 -mt-2">
                <AlertCircle className="w-3 h-3" />
                {errors.agree_terms.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-[#C7A257] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-white font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Create Account →
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/30 mt-8 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#C7A257] hover:text-[#C7A257]/80 font-semibold transition-colors"
          >
            Sign In →
          </Link>
        </p>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12"
        />
      </motion.div>

      {/* Vertical text decoration */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 z-10">
        <span className="text-xs text-white/10 uppercase tracking-[0.4em] font-mono writing-vertical">
          Trade Our Capital
        </span>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
