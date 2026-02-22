"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { loginSchema, LoginInput } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

/**
 * Login Page - Brutalist Cinematic Design
 * Matching the homepage aesthetic with dark bg, orange accents, film grain
 */
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
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

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else if (signInError.message.includes("Email not confirmed")) {
          setError("Please verify your email before logging in.");
        } else {
          setError(signInError.message);
        }
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dramatic light leak */}
      <div
        className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.12) 0%, transparent 50%)",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* Bottom light leak */}
      <div
        className="absolute bottom-0 left-0 w-[40%] h-[40%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 80%, rgba(255,107,53,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <span
          className="text-[30vw] font-black text-white/[0.015] leading-none tracking-tighter"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          LOGIN
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
          Secure Login
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight"
          >
            WELCOME<br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              BACK
            </span>
          </motion.h1>
          <p className="text-white/40 font-light">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 relative overflow-hidden">
          {/* Card accent line */}
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-mono text-white/40 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-mono text-[#ff6b35]/70 hover:text-[#ff6b35] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`w-full pl-12 pr-12 py-4 bg-white/[0.02] border text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#ff6b35]/50 focus:bg-white/[0.04] transition-all ${errors.password ? "border-red-500/50" : "border-white/10"
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-[#ff6b35] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-white font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Sign In →
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/30 mt-8 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#ff6b35] hover:text-[#ff6b35]/80 font-semibold transition-colors"
          >
            Start Challenge →
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
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 z-10">
        <span className="text-xs text-white/10 uppercase tracking-[0.4em] font-mono writing-vertical">
          Secure • Encrypted • Fast
        </span>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
