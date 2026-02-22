"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly: name, email address, phone number, government ID for verification, payment information, and trading activity data. We also automatically collect device information, IP addresses, browser type, and usage data through cookies and similar technologies.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to: provide and maintain our services, process transactions and send related information, verify your identity and prevent fraud, communicate with you about updates and promotions, analyze usage patterns to improve our services, and comply with legal obligations.`,
  },
  {
    title: "3. Information Sharing",
    content: `We may share your information with: payment processors to complete transactions, identity verification services, cloud service providers who host our platform, legal authorities when required by law, and professional advisors such as lawyers and accountants. We do not sell your personal information to third parties.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.`,
  },
  {
    title: "5. Your Rights",
    content: `Depending on your location, you may have rights to: access your personal data, correct inaccurate data, delete your data, restrict processing, data portability, and withdraw consent. To exercise these rights, contact us at privacy@braxleynevim.com.`,
  },
  {
    title: "6. Cookies and Tracking",
    content: `We use cookies and similar technologies to remember your preferences, analyze site traffic, and personalize content. You can control cookie settings through your browser, but disabling cookies may affect site functionality.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide services. We may retain certain information for legal compliance, dispute resolution, and enforcement of our agreements.`,
  },
  {
    title: "8. International Transfers",
    content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place as required by applicable data protection laws, including GDPR standard contractual clauses.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete the information immediately.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes via email or prominent notice on our website. Your continued use of our services constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
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
        className="fixed top-0 left-0 w-[50%] h-[40%] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 20% 20%, rgba(255,107,53,0.06) 0%, transparent 50%)",
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
            PRIVACY
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
              <Shield className="w-7 h-7 text-[#ff6b35]" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-black tracking-tight"
              >
                PRIVACY POLICY
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
              Your privacy is important to us. This Privacy Policy explains how BraxleyNevim collects, uses, discloses, and safeguards your information when you use our services.
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
              <h3 className="font-bold mb-3">Data Protection Officer</h3>
              <p className="text-white/40 text-sm font-mono">
                BraxleyNevim Ltd<br />
                Email: privacy@braxleynevim.com<br />
                Address: London, United Kingdom
              </p>
            </motion.div>

            {/* Related Links */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
              <Link href="/terms" className="text-[#ff6b35] hover:underline text-sm font-mono">Terms of Service →</Link>
              <Link href="/cookies" className="text-[#ff6b35] hover:underline text-sm font-mono">Cookie Policy →</Link>
              <Link href="/risk" className="text-[#ff6b35] hover:underline text-sm font-mono">Risk Disclosure →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
