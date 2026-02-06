"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Challenge",
    description: "Select an account size that fits your trading style. We offer 2-step, 1-step, and instant funding options.",
  },
  {
    number: "02",
    title: "Pass the Evaluation",
    description: "Trade with simulated funds and hit your profit target while staying within risk limits. No time pressure.",
  },
  {
    number: "03",
    title: "Get Funded",
    description: "Once you pass, we fund your account with real capital. Trade our money and keep up to 90% of profits.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            How It Works
          </h2>
          <p className="text-foreground/60">
            Three simple steps to start trading with funded capital.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent -translate-x-8" />
              )}
              
              <div className="text-5xl font-display font-bold text-primary/20 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
