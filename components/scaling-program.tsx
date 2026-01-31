"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, DollarSign, Star } from "lucide-react";

const scalingLevels = [
  {
    level: 1,
    capital: "$50,000",
    profitSplit: "80%",
    requirement: "Pass Evaluation",
    color: "from-muted to-muted/50",
  },
  {
    level: 2,
    capital: "$100,000",
    profitSplit: "85%",
    requirement: "10% Profit",
    color: "from-primary/50 to-primary/30",
  },
  {
    level: 3,
    capital: "$200,000",
    profitSplit: "90%",
    requirement: "20% Total Profit",
    color: "from-profit/50 to-profit/30",
  },
  {
    level: 4,
    capital: "$400,000",
    profitSplit: "95%",
    requirement: "30% Total Profit",
    color: "from-electric-violet/50 to-electric-violet/30",
  },
  {
    level: 5,
    capital: "$800,000",
    profitSplit: "100%",
    requirement: "Elite Status",
    color: "from-primary to-profit",
    elite: true,
  },
];

export default function ScalingProgram() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
            Grow With Us
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Scaling Program
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scale your account up to <span className="text-profit font-semibold">$800,000</span> and keep up to <span className="text-profit font-semibold">100%</span> of your profits
          </p>
        </motion.div>

        {/* Scaling timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-muted via-primary to-profit" />

            {scalingLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Level indicator */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center border-4 border-background ${
                      level.elite ? "ring-2 ring-profit ring-offset-2 ring-offset-background" : ""
                    }`}
                  >
                    {level.elite ? (
                      <Star className="h-6 w-6 text-foreground fill-foreground" />
                    ) : (
                      <span className="text-lg font-bold text-foreground">{level.level}</span>
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-24 md:ml-0 flex-1 glass rounded-xl p-6 ${
                    index % 2 === 0 ? "md:mr-[calc(50%+2rem)]" : "md:ml-[calc(50%+2rem)]"
                  } ${level.elite ? "border-profit/50" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {level.elite ? "Elite Level" : `Level ${level.level}`}
                      </p>
                      <p className="text-2xl font-bold text-foreground">{level.capital}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Profit Split</p>
                      <p className={`text-2xl font-bold ${level.elite ? "text-profit" : "text-primary"}`}>
                        {level.profitSplit}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>Requirement: {level.requirement}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Automatic Scaling</h3>
            <p className="text-sm text-muted-foreground">
              Hit your targets and your account scales automatically
            </p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-profit/10 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-profit" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Up to 100% Profits</h3>
            <p className="text-sm text-muted-foreground">
              Keep everything you earn at Elite status
            </p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-electric-violet/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-electric-violet" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No Cap on Growth</h3>
            <p className="text-sm text-muted-foreground">
              Continue scaling as long as you're profitable
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
