"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { RefreshCw, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

const eligibleCases = [
  "You passed the profit target but failed due to a drawdown rule violation",
  "Technical issues on our platform prevented you from trading properly",
  "You request a refund within 14 days of purchase without placing any trades",
  "You completed the challenge but experienced significant platform downtime",
];

const ineligibleCases = [
  "You violated trading rules (e.g., news trading restrictions, prohibited strategies)",
  "Your account was terminated for fraudulent activity",
  "More than 14 days have passed since purchase with trading activity",
  "You've already received a free retry for the same account",
  "You failed the challenge without meeting the profit target first",
];

const sections = [
  {
    title: "1. Standard Refund Policy",
    content: `All challenge fees are non-refundable once trading activity has commenced on your account. By purchasing a challenge, you acknowledge that you are purchasing access to our evaluation program, which is a service rendered immediately upon account activation.`,
  },
  {
    title: "2. 14-Day Cooling-Off Period",
    content: `If you have not placed any trades on your challenge account, you may request a full refund within 14 days of purchase. To qualify, you must not have executed any trades, including pending orders, on the account. This complies with EU consumer protection regulations.`,
  },
  {
    title: "3. Free Retry Policy",
    content: `We offer a free retry if you reached the profit target but failed due to a rule violation. You must have achieved the required profit percentage before the rule breach occurred. Free retries are issued as new challenge accounts of the same size and type.`,
  },
  {
    title: "4. Technical Issue Refunds",
    content: `If documented technical issues on our platform directly caused you to fail the challenge, you may be eligible for a free retry or refund. You must report the issue to support within 24 hours and provide evidence such as screenshots, trading logs, or error messages.`,
  },
  {
    title: "5. How to Request a Refund",
    content: `Email refunds@alphatrader.com with your account number, purchase details, and reason for the refund request. Include any supporting documentation. Refund decisions are typically communicated within 3-5 business days. Approved refunds are processed within 7-10 business days.`,
  },
  {
    title: "6. Dispute Resolution",
    content: `If your refund request is denied and you believe this is incorrect, you may appeal the decision by emailing appeals@alphatrader.com within 30 days of the denial. Include the original denial and any additional evidence supporting your claim.`,
  },
];

export default function RefundsPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />

      {/* Light leak */}
      <div
        className="fixed top-0 right-0 w-[50%] h-[40%] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 70% 30%, rgba(255,107,53,0.06) 0%, transparent 50%)",
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 z-10">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
          <span
            className="text-[15vw] font-black text-white/[0.015] leading-none tracking-tighter"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            REFUNDS
          </span>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-mono mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#ff6b35]/20 flex items-center justify-center">
              <RefreshCw className="w-7 h-7 text-[#ff6b35]" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-black tracking-tight"
              >
                REFUND POLICY
              </motion.h1>
              <p className="text-white/40 font-mono text-sm mt-1">Last updated: January 15, 2025</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl bg-white/[0.02] border border-white/10 p-6"
          >
            <p className="text-white/60 font-light leading-relaxed">
              We want you to be satisfied with your purchase. This policy outlines when refunds and free retries are available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Eligible */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-500/5 border border-emerald-500/20 p-6"
            >
              <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Eligible for Refund/Retry
              </h3>
              <ul className="space-y-3">
                {eligibleCases.map((item, i) => (
                  <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Ineligible */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-500/5 border border-red-500/20 p-6"
            >
              <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Not Eligible
              </h3>
              <ul className="space-y-3">
                {ineligibleCases.map((item, i) => (
                  <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-l-2 border-[#ff6b35]/30 pl-6"
              >
                <h2 className="text-xl font-bold mb-3 text-white">{section.title}</h2>
                <p className="text-white/50 font-light leading-relaxed text-sm">{section.content}</p>
              </motion.div>
            ))}

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/10 p-6 mt-12"
            >
              <h3 className="font-bold mb-3">Refund Requests</h3>
              <p className="text-white/40 text-sm font-mono">
                Email: refunds@alphatrader.com<br />
                Response Time: 3-5 business days<br />
                Processing Time: 7-10 business days
              </p>
            </motion.div>

            {/* Related Links */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
              <Link href="/terms" className="text-[#ff6b35] hover:underline text-sm font-mono">Terms of Service →</Link>
              <Link href="/support" className="text-[#ff6b35] hover:underline text-sm font-mono">Contact Support →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
