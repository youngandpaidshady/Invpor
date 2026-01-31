"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Funded Trader",
    avatar: "MC",
    country: "🇺🇸 USA",
    profit: "$47,200",
    rating: 5,
    text: "AlphaTrader changed my life. I went from struggling to pay bills to earning a consistent income trading. The evaluation was fair, and the support team is incredible. Best decision I ever made.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Elite Trader",
    avatar: "SW",
    country: "🇬🇧 UK",
    profit: "$128,500",
    rating: 5,
    text: "After failing with two other prop firms, I found AlphaTrader. Their rules are realistic, and the profit split is unbeatable. I've withdrawn over $100k in the past year alone.",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    role: "Senior Trader",
    avatar: "AH",
    country: "🇦🇪 UAE",
    profit: "$89,300",
    rating: 5,
    text: "The dashboard is phenomenal—real-time stats, instant notifications, and the fastest payouts I've ever experienced. This is what a professional trading platform should look like.",
  },
  {
    id: 4,
    name: "Elena Kowalski",
    role: "Funded Trader",
    avatar: "EK",
    country: "🇩🇪 Germany",
    profit: "$34,800",
    rating: 5,
    text: "I was skeptical at first, but AlphaTrader proved me wrong. The evaluation process is straightforward, and once funded, you truly feel like part of a professional trading operation.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const next = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
            Success Stories
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Traders Who Made It
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful traders who transformed their careers with AlphaTrader
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-2xl p-8 md:p-12 border border-border"
              >
                <Quote className="h-12 w-12 text-primary/20 mb-6" />
                
                <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                  "{testimonials[current].text}"
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                      {testimonials[current].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[current].role} · {testimonials[current].country}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <div className="flex items-center space-x-1 mb-1">
                      {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total Earnings: <span className="text-profit font-semibold">{testimonials[current].profit}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAutoPlay(false);
                      setCurrent(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === current ? "w-8 bg-primary" : "w-2 bg-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={prev}
                  className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
