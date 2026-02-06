"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Forex Trader",
    country: "🇺🇸 USA",
    image: "/avatars/1.jpg",
    content:
      "Best prop firm I've worked with. The rules are fair, support is incredible, and I got my first payout within 24 hours. Highly recommend!",
    rating: 5,
    payout: "$12,450",
  },
  {
    name: "Sarah Williams",
    role: "Day Trader",
    country: "🇬🇧 UK",
    image: "/avatars/2.jpg",
    content:
      "The instant funding option changed everything for me. No more waiting weeks to get funded. Started trading the same day I signed up.",
    rating: 5,
    payout: "$8,200",
  },
  {
    name: "David Mueller",
    role: "Swing Trader",
    country: "🇩🇪 Germany",
    image: "/avatars/3.jpg",
    content:
      "I've tried 5 different prop firms. AlphaTrader has the best combination of fair rules, great support, and fast payouts. Worth every penny.",
    rating: 5,
    payout: "$22,100",
  },
  {
    name: "Emma Rodriguez",
    role: "Scalper",
    country: "🇪🇸 Spain",
    image: "/avatars/4.jpg",
    content:
      "The scaling program is amazing. Started with $25K, now trading $200K. The team genuinely wants you to succeed.",
    rating: 5,
    payout: "$15,750",
  },
  {
    name: "James Thompson",
    role: "Position Trader",
    country: "🇦🇺 Australia",
    image: "/avatars/5.jpg",
    content:
      "No time limits on the challenge was a game changer. I could trade my strategy properly without rushing. Passed on my first try.",
    rating: 5,
    payout: "$9,890",
  },
  {
    name: "Lisa Park",
    role: "Algo Trader",
    country: "🇰🇷 Korea",
    image: "/avatars/6.jpg",
    content:
      "Full EA support and excellent execution. My algorithms work exactly as backtested. The spreads are competitive too.",
    rating: 5,
    payout: "$18,300",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-surface/30">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,255,0,0.03)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 lg:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
            Trader{" "}
            <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Join thousands of profitable traders who have achieved their goals
            with AlphaTrader.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 bg-background/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-primary/30 transition-all group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center text-background font-bold">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-foreground/60">
                    {testimonial.role} • {testimonial.country}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-foreground/60">Payout</div>
                  <div className="font-bold text-profit">{testimonial.payout}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trustpilot Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-primary fill-primary" />
            ))}
          </div>
          <p className="text-foreground/60">
            Rated <span className="font-bold text-foreground">4.9/5</span> on
            Trustpilot from 2,500+ reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}
