"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

/**
 * About Page - Editorial Magazine Style
 */

const team = [
  {
    initials: "BN",
    name: "Executive Team",
    role: "Chief Executive Officer",
    quote: "Our mandate is simple — align our success with the success of every trader we fund.",
    color: "#ff6b35"
  },
  {
    initials: "TM",
    name: "Trading Division",
    role: "Head of Risk & Trading",
    quote: "Institutional-grade risk management is the foundation of sustainable funded trading.",
    color: "#10b981"
  },
  {
    initials: "TS",
    name: "Technology Division",
    role: "Chief Technology Officer",
    quote: "We engineer systems for reliability, speed, and transparency at every layer.",
    color: "#3b82f6"
  },
];

const timeline = [
  { year: "2021", event: "Founded", desc: "BraxleyNevim established with a mandate to build a trader-first proprietary funding firm." },
  { year: "2022", event: "1,000 Traders Funded", desc: "Reached our first milestone of 1,000 funded accounts across multiple asset classes." },
  { year: "2023", event: "$5M in Payouts", desc: "Exceeded $5 million in total trader payouts. Privately held, self-funded, zero external capital." },
  { year: "2024", event: "Global Expansion", desc: "Operating across 60+ countries with an active community of over 10,000 funded traders." },
];

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3]);

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
    <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Film grain */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-white/[0.02]" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-white/[0.02]" />
      </div>

      <Navbar />

      {/* Hero - Editorial manifesto */}
      <motion.section
        style={{ opacity: headerOpacity }}
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden"
      >
        {/* Light leak */}
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 40% 40%, rgba(255,107,53,0.1) 0%, transparent 50%)",
            transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 lg:ml-[8%]"
          >
            <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
              About BraxleyNevim
            </span>
          </motion.div>

          {/* Manifesto headline */}
          <div className="lg:ml-[8%] max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="block text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter">
                Built by
              </span>
              <span className="block text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter">
                <span className="text-[#ff6b35] italic font-light">traders.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 text-xl lg:text-2xl text-white/50 font-light max-w-xl leading-relaxed"
            >
              BraxleyNevim is a proprietary trading firm engineered around one principle:
              when traders succeed, we succeed.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* The Problem - Editorial storytelling */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:ml-[8%] max-w-3xl">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
              The problem
            </span>

            <p className="mt-8 text-3xl lg:text-4xl font-light text-white/80 leading-relaxed">
              The funded trading industry needed a higher standard.
            </p>

            <p className="mt-6 text-lg text-white/40 font-light leading-relaxed">
              Too many firms operate with opaque rules, unreasonable drawdown parameters, and delayed payouts.
              Traders deserve clear terms, fair evaluations, and a firm that pays on time — every time.
              <span className="text-white/60"> That conviction is what drives BraxleyNevim.</span>
            </p>

            <p className="mt-6 text-lg text-white/40 font-light leading-relaxed">
              We studied the shortcomings of existing firms and built our infrastructure from the ground up —
              <span className="text-[#ff6b35]"> transparent parameters, rapid payouts, and dedicated support.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats - Editorial/Magazine large numbers */}
      <section className="py-20 border-t border-white/[0.05] bg-white/[0.01]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl lg:text-8xl font-extralight text-white tracking-tight">
                $12<span className="text-[#ff6b35]">M</span>
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-2">
                Paid to traders
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-6xl lg:text-8xl font-extralight text-white tracking-tight">
                10<span className="text-white/40">K</span>
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-2">
                Funded traders
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl lg:text-8xl font-extralight text-white tracking-tight">
                50<span className="text-white/40">+</span>
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-2">
                Countries
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-6xl lg:text-8xl font-extralight text-white tracking-tight">
                0
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-2">
                VC dollars taken
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline - Editorial vertical */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:ml-[8%] max-w-3xl">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
              Timeline
            </span>

            <div className="mt-12 space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative pl-20"
                >
                  <span className="absolute left-0 text-4xl font-extralight text-[#ff6b35] opacity-50 group-hover:opacity-100 transition-opacity">
                    {item.year}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-white">{item.event}</p>
                    <p className="mt-1 text-white/40 font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team - Editorial portraits */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:ml-[8%]">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
              Leadership
            </span>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  {/* Avatar - Large initial */}
                  <div
                    className="w-24 h-24 flex items-center justify-center text-4xl font-black text-black mb-6 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>

                  <p className="text-xl font-bold text-white">{member.name}</p>
                  <p className="text-sm text-[#ff6b35] mb-4">{member.role}</p>
                  <p className="text-white/40 font-light italic">&ldquo;{member.quote}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values - Direct, not corporate */}
      <section className="py-20 border-t border-white/[0.05] bg-white/[0.01]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:ml-[8%] max-w-3xl">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
              Our Principles
            </span>

            <div className="mt-12 space-y-6">
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                <span className="text-[#ff6b35]">→</span> Alignment of interest — our revenue model is built on trader profitability, not on failed evaluations.
              </p>
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                <span className="text-[#ff6b35]">→</span> Transparent parameters — every rule is documented, consistent, and publicly available before purchase.
              </p>
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                <span className="text-[#ff6b35]">→</span> Rapid settlement — payouts processed within 24 hours of approval, with full audit trails.
              </p>
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                <span className="text-[#ff6b35]">→</span> Dedicated support — every inquiry handled by experienced professionals, not automated systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Direct */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-white/30 text-sm uppercase tracking-[0.3em] mb-4">
            Ready to begin?
          </p>
          <h2 className="text-4xl lg:text-6xl font-black mb-8">
            Start your evaluation.<br />
            <span className="text-[#ff6b35]">Trade with our capital.</span>
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/pricing"
              className="shimmer-button inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C7A257] text-black text-sm font-bold font-mono uppercase tracking-[0.15em] rounded-lg shadow-[0_0_20px_rgba(199,162,87,0.2)] hover:shadow-[0_0_30px_rgba(199,162,87,0.4)] transition-all active:scale-95"
            >
              Get Funded →
            </Link>
          </div>
        </div>
      </section>

      {/* Edition marker */}
      <div className="fixed bottom-6 left-6 text-[10px] text-white/10 font-mono tracking-wider z-40">
        BraxleyNevim Ltd
      </div>

      <Footer />
    </main>
  );
}
