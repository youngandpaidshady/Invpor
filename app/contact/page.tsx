"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  Headphones,
  Zap
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function ContactPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

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

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
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

      {/* Light leaks */}
      <div
        className="fixed top-0 left-0 w-[50%] h-[50%] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 20% 30%, rgba(199,162,87,0.08) 0%, transparent 50%)",
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 z-10">
        {/* Massive background text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
          <span
            className="text-[18vw] font-black text-white/[0.015] leading-none tracking-tighter"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            HELLO
          </span>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter mb-6"
          >
            <span className="block">GET IN</span>
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #C7A257 0%, #F0D78C 50%, #C7A257 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              TOUCH
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/40 font-light"
          >
            Have a question? We&apos;d love to hear from you.
          </motion.p>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </section>

      {/* Contact Methods */}
      <section className="py-16 border-b border-white/10 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: "Live Chat", value: "24/5 Available", desc: "Instant support" },
              { icon: Mail, title: "Email", value: "support@braxleynevim.com", desc: "Response < 2hrs" },
              { icon: Headphones, title: "Discord", value: "Join Community", desc: "10k+ traders" },
            ].map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/10 p-8 text-center hover:border-[#C7A257]/30 transition-colors cursor-pointer"
              >
                <method.icon className="w-10 h-10 text-[#C7A257] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                <p className="text-white/80 font-mono text-sm mb-1">{method.value}</p>
                <p className="text-xs text-white/30 uppercase tracking-wider font-mono">{method.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black mb-8 tracking-tight">
                SEND US A<br />
                <span className="text-[#C7A257]">MESSAGE</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-3">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C7A257]/50 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C7A257]/50 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-3">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 text-white font-mono focus:outline-none focus:border-[#C7A257]/50 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-[#0a0a0a]">Select a topic...</option>
                    <option value="general" className="bg-[#0a0a0a]">General Inquiry</option>
                    <option value="support" className="bg-[#0a0a0a]">Technical Support</option>
                    <option value="billing" className="bg-[#0a0a0a]">Billing Question</option>
                    <option value="partnership" className="bg-[#0a0a0a]">Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-3">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C7A257]/50 transition-all resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                {submitted && (
                  <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono">
                    ✓ Message sent successfully. We&apos;ll respond within 2 hours.
                  </div>
                )}
                <button
                  type="submit"
                  className="group relative w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-[#C7A257] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="absolute inset-0 flex items-center justify-center gap-2 text-white font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Send Message →
                  </span>
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <div className="bg-white/[0.02] border border-white/10 p-8 mb-8">
                <h3 className="text-xl font-bold mb-6">Quick Info</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#C7A257] mt-1" />
                    <div>
                      <div className="font-mono text-sm mb-1">Response Time</div>
                      <div className="text-white/40 text-sm">Usually within 2 hours during business days</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="w-5 h-5 text-[#C7A257] mt-1" />
                    <div>
                      <div className="font-mono text-sm mb-1">Support Hours</div>
                      <div className="text-white/40 text-sm">24/5 — Sunday 22:00 to Friday 22:00 UTC</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#C7A257] mt-1" />
                    <div>
                      <div className="font-mono text-sm mb-1">Headquarters</div>
                      <div className="text-white/40 text-sm">London, United Kingdom</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#C7A257]/10 to-transparent border border-[#C7A257]/20 p-8">
                <h3 className="text-lg font-bold mb-4">Need Urgent Help?</h3>
                <p className="text-white/40 text-sm mb-6 font-light">
                  For time-sensitive issues, our live chat offers the fastest support.
                </p>
                <a href="mailto:support@braxleynevim.com?subject=Urgent%20Support%20Request" className="w-full py-3 border border-[#C7A257] text-[#C7A257] font-mono text-sm uppercase tracking-wider hover:bg-[#C7A257] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95">
                  <MessageCircle className="w-4 h-4" />
                  Email Support
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
