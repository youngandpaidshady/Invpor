"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

/**
 * About Page - Editorial Magazine Style
 * 
 * Not corporate. Not AI-generated. Human.
 * Tell a real story.
 */

const team = [
  {
    initials: "AC",
    name: "Alex Chen",
    role: "Founder",
    quote: "Got tired of prop firms treating traders like ATMs.",
    color: "#ff6b35"
  },
  {
    initials: "SW",
    name: "Sarah Williams",
    role: "Head of Trading",
    quote: "15 years at Goldman taught me what NOT to do.",
    color: "#10b981"
  },
  {
    initials: "MJ",
    name: "Marcus Johnson",
    role: "CTO",
    quote: "Built systems. Broke systems. Now I build them right.",
    color: "#3b82f6"
  },
];

const timeline = [
  { year: "2021", event: "Had enough", desc: "Quit our jobs. Started in a garage. (Cliché, we know.)" },
  { year: "2022", event: "First 1,000", desc: "Hit 1,000 funded traders. Realized we were onto something." },
  { year: "2023", event: "$5M paid", desc: "Crossed $5 million in payouts. Still no VC money." },
  { year: "2024", event: "10,000+", desc: "Global community. Still bootstrapped. Still trader-owned." },
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
              Issue №024 — About
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
                We&apos;re not
              </span>
              <span className="block text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter">
                a <span className="text-[#ff6b35] italic font-light">prop firm.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 text-xl lg:text-2xl text-white/50 font-light max-w-xl leading-relaxed"
            >
              We&apos;re traders who got sick of the bullshit.
              So we built something different.
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
              Most prop firms are designed for you to fail.
            </p>

            <p className="mt-6 text-lg text-white/40 font-light leading-relaxed">
              Impossible targets. Hidden fees. Rules that contradict each other.
              Support that doesn&apos;t speak English. Payouts that never come.
              <span className="text-white/60"> We&apos;ve been there.</span>
            </p>

            <p className="mt-6 text-lg text-white/40 font-light leading-relaxed">
              We lost money. We lost time. We lost faith in the industry.
              <span className="text-[#ff6b35]"> Then we got angry.</span>
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
              The idiots behind this
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
              What we actually believe
            </span>

            <div className="mt-12 space-y-6">
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                <span className="text-[#ff6b35]">→</span> Your success = our success. Literally. We only profit when you do.
              </p>
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                <span className="text-[#ff6b35]">→</span> Rules should be simple enough to fit on a napkin.
              </p>
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                <span className="text-[#ff6b35]">→</span> Payouts should be fast. Same-day or we failed.
              </p>
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                <span className="text-[#ff6b35]">→</span> Support should be humans, not chatbots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Direct */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-white/30 text-sm uppercase tracking-[0.3em] mb-4">
            Still reading?
          </p>
          <h2 className="text-4xl lg:text-6xl font-black mb-8">
            Prove us right.<br />
            <span className="text-[#ff6b35]">Get funded.</span>
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/pricing"
              data-cursor="GO"
              className="px-10 py-5 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-[#ff6b35] transition-colors"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Edition marker */}
      <div className="fixed bottom-6 left-6 text-[10px] text-white/10 font-mono tracking-wider z-40">
        №024
      </div>

      <Footer />
    </main>
  );
}
