"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By creating an account, purchasing a challenge, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you may not access or use our services.`,
  },
  {
    title: "2. Eligibility",
    content: `To use our services, you must: be at least 18 years of age, have the legal capacity to enter into binding contracts, not be prohibited from using our services under applicable laws, and not be a resident of a restricted jurisdiction.`,
  },
  {
    title: "3. Restricted Jurisdictions",
    content: `Due to regulatory requirements, we cannot offer our services to residents of the following jurisdictions: North Korea, Iran, Syria, Cuba, Crimea region, and any other jurisdiction subject to comprehensive sanctions by the United States, European Union, or United Kingdom.`,
  },
  {
    title: "4. Account Registration",
    content: `When creating an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.`,
  },
  {
    title: "5. Challenge and Evaluation Programs",
    content: `Our evaluation challenges are conducted on simulated (demo) trading accounts. No real money is at risk during the evaluation phases. You must comply with all trading rules specified for your challenge type, including profit targets, maximum drawdown limits, daily drawdown limits, and minimum trading days.`,
  },
  {
    title: "6. Funded Accounts",
    content: `Upon successful completion of the evaluation, you may be offered a funded account. Funded account terms, including profit sharing percentages and withdrawal policies, are specified at the time of offer and may be updated from time to time.`,
  },
  {
    title: "7. Payments and Refunds",
    content: `All challenge fees are due at the time of purchase. We accept various payment methods as displayed on our website. For our refund policy, please refer to our Refund Policy page.`,
  },
  {
    title: "8. Prohibited Activities",
    content: `You agree not to: use our services for any illegal purpose, manipulate trading results through fraudulent means, share account credentials with third parties, use prohibited automated trading systems, engage in any activity that could harm our systems, copy trades from other prop firm accounts, or use our services if employed by a competing firm.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `To the maximum extent permitted by law, BraxleyNevim Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms of Service shall be governed by and construed in accordance with the laws of England and Wales. Any disputes shall first be attempted to be resolved through good-faith negotiation, then through binding arbitration in London, United Kingdom.`,
  },
];

export default function TermsPage() {
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
          background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.06) 0%, transparent 50%)",
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
            TERMS
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
              <FileText className="w-7 h-7 text-[#ff6b35]" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-black tracking-tight"
              >
                TERMS OF SERVICE
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
              Welcome to BraxleyNevim. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.
            </p>
          </motion.div>
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
              <h3 className="font-bold mb-3">Contact Information</h3>
              <p className="text-white/40 text-sm font-mono">
                BraxleyNevim Ltd<br />
                Email: legal@braxleynevim.com<br />
                Address: London, United Kingdom
              </p>
            </motion.div>

            {/* Related Links */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
              <Link href="/privacy" className="text-[#ff6b35] hover:underline text-sm font-mono">Privacy Policy →</Link>
              <Link href="/refunds" className="text-[#ff6b35] hover:underline text-sm font-mono">Refund Policy →</Link>
              <Link href="/risk" className="text-[#ff6b35] hover:underline text-sm font-mono">Risk Disclosure →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
