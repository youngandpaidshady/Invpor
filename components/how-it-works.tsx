"use client";

import { motion } from "framer-motion";
import { UserPlus, Target, Wallet, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Choose Your Challenge",
    description: "Select an account size that matches your trading experience and goals. From $5K to $400K.",
    color: "from-primary to-primary/50",
  },
  {
    step: "02",
    icon: Target,
    title: "Pass the Evaluation",
    description: "Demonstrate your skills by meeting the profit target while managing risk. No time limit.",
    color: "from-profit to-profit/50",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Get Funded",
    description: "Once you pass, receive your funded account instantly. Start trading with real capital.",
    color: "from-electric-violet to-electric-violet/50",
  },
  {
    step: "04",
    icon: Wallet,
    title: "Earn & Withdraw",
    description: "Keep up to 90% of your profits. Withdraw anytime within 24 hours.",
    color: "from-primary to-profit",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
            Simple Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get funded in four simple steps. Start your trading career today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="text-center">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-surface to-background border border-border mb-6 relative">
                    <span className={`text-4xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                      {step.step}
                    </span>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
