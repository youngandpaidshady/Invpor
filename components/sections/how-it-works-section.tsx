"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Target, ShieldCheck, Gem } from "lucide-react";

/**
 * How It Works Section — 21st.dev Spawn Engine Build
 * DNA: Timeline Story + Dark Premium + Scroll-Triggered Parallax + Layered Depth
 * Chaos: Glow Pulse + Scanning Line + Frosted Edge
 */

const steps = [
  {
    number: "01",
    title: "Choose Your Challenge",
    description: "Select an account size that fits your trading style. We offer 2-step, 1-step, and instant funding options. No hidden rules, just clear objectives.",
    icon: Target,
  },
  {
    number: "02",
    title: "Pass the Evaluation",
    description: "Trade with simulated funds and hit your profit target while staying within risk limits. No time pressure. Trade your edge at your own pace.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Get Funded",
    description: "Once you pass, we fund your account with real capital. Trade our money and keep up to 90% of profits with on-demand payouts available 24/7.",
    icon: Gem,
  },
];

const TimelineStep = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stepRef, { once: false, margin: "-20%" });
  const isEven = index % 2 === 0;

  return (
    <div ref={stepRef} className="relative z-10 w-full mb-24 lg:mb-40 last:mb-0 flex items-center justify-between flex-col md:flex-row">
      {/* Desktop Blank Space (to push content left or right) */}
      <div className={`hidden md:block w-[45%] ${!isEven ? 'order-1' : 'order-3'}`} />

      {/* Center Node (Orb) */}
      <div className="md:order-2 absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 z-20">
        {/* Glow pulse behind orb */}
        <motion.div
          initial={false}
          animate={{ scale: isInView ? [1, 1.4, 1] : 1, opacity: isInView ? [0.4, 0.8, 0.4] : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#C7A257]/30 rounded-full blur-md"
        />
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isInView ? "rgba(199, 162, 87, 0.15)" : "rgba(255, 255, 255, 0.03)",
            borderColor: isInView ? "rgba(199, 162, 87, 0.8)" : "rgba(255, 255, 255, 0.1)"
          }}
          transition={{ duration: 0.5 }}
          className="relative w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-md"
        >
          <step.icon className={`w-5 h-5 transition-colors duration-500 ${isInView ? 'text-[#C7A257]' : 'text-white/30'}`} />
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right order-1' : 'md:pl-16 md:text-left order-3'}`}
      >
        <div className={`p-8 rounded-2xl border transition-all duration-700 relative overflow-hidden group
           ${isInView ? 'border-[#C7A257]/30 bg-[#070707] shadow-[0_0_40px_rgba(199,162,87,0.08)]' : 'border-white/[0.05] bg-black/40'}
        `}>
          {/* Sheen effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#C7A257]/5 to-transparent -translate-x-full transition-transform duration-[1.5s] ease-in-out pointer-events-none ${isInView ? 'translate-x-[200%]' : ''}`} />

          <div className={`text-6xl font-display font-bold mb-4 opacity-10 transition-colors duration-700 absolute top-4 ${isEven ? 'right-4' : 'left-4'}`}>
            {step.number}
          </div>

          <h3 className={`text-2xl lg:text-3xl font-display font-semibold mb-4 text-white tracking-tight relative z-10 transition-all duration-500`}>
            {step.title}
          </h3>
          <p className="text-white/40 text-sm md:text-base leading-relaxed relative z-10">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export function HowItWorksSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll through the container to fill the central line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 lg:py-40 bg-[#010101] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-[0.03] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C7A257] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20 lg:mb-32"
        >
          <span className="eyebrow tracking-[0.3em] text-[#C7A257]/80 mb-6 block text-sm">
            THE PROTOCOL
          </span>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6 text-white uppercase tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7A257] to-[#e6d09e]">Works</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Three simple steps to start trading with funded capital. A frictionless journey designed for elite performance.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Static background dashed line */}
          <div className="absolute top-0 bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-white/[0.05] border border-dashed border-white/10 [border-width:0_0_0_1px]" />

          {/* Animated Gold Line filling up */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-[0px] md:left-1/2 md:-translate-x-[1px] w-[3px] bg-gradient-to-b from-transparent via-[#C7A257] to-[#C7A257] shadow-[0_0_15px_rgba(199,162,87,1)] origin-top z-0"
          />

          {/* Render Steps */}
          <div className="relative z-10 pt-10">
            {steps.map((step, index) => (
              <TimelineStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
