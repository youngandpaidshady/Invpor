"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { useRef, useState } from "react";

interface ChallengeCardProps {
  name: string;
  accountSize: string;
  price: string;
  originalPrice?: string;
  profitTarget: string;
  maxDrawdown: string;
  dailyDrawdown: string;
  profitSplit: string;
  features: string[];
  isPopular?: boolean;
  isInstant?: boolean;
  delay?: number;
}

export function ChallengeCard({
  name,
  accountSize,
  price,
  originalPrice,
  profitTarget,
  maxDrawdown,
  dailyDrawdown,
  profitSplit,
  features,
  isPopular = false,
  isInstant = false,
  delay = 0,
}: ChallengeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(spotlightY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(spotlightX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : "0deg",
        rotateY: isHovered ? rotateY : "0deg",
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${isPopular ? "lg:-mt-4 lg:scale-105 z-10" : ""}`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-background text-sm font-semibold rounded-full shadow-lg shadow-primary/25">
            <Star className="w-4 h-4 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      {/* Instant Badge */}
      {isInstant && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-violet-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-violet-500/25">
            <Zap className="w-4 h-4 fill-current" />
            Instant Funding
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className={`relative p-6 lg:p-8 bg-surface/80 backdrop-blur-sm rounded-2xl border transition-all duration-500 ${isPopular
            ? "border-primary/50 shadow-xl shadow-primary/10"
            : "border-white/10 hover:border-primary/30"
          }`}
      >
        {/* Lens Flare Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${spotlightX.get() * 100 + 50}% ${spotlightY.get() * 100 + 50}%, rgba(168, 255, 0, 0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-sm text-foreground/60 mb-2">{name}</p>
            <h3 className="text-4xl lg:text-5xl font-display font-bold text-[#F97316]">
              {accountSize}
            </h3>
          </div>

          {/* Price */}
          <div className="text-center mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center justify-center gap-2">
              {originalPrice && (
                <span className="text-lg text-foreground/40 line-through">
                  {originalPrice}
                </span>
              )}
              <span className="text-3xl font-bold text-foreground">{price}</span>
            </div>
            <p className="text-sm text-foreground/60 mt-1">One-time payment</p>
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Profit Target</span>
              <span className="font-semibold text-profit">{profitTarget}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Max Drawdown</span>
              <span className="font-semibold text-foreground">{maxDrawdown}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Daily Drawdown</span>
              <span className="font-semibold text-foreground">{dailyDrawdown}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Profit Split</span>
              <span className="font-semibold text-primary">{profitSplit}</span>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className={`w-full py-4 rounded-xl font-semibold transition-all hover:scale-105 ${isPopular
                ? "bg-primary text-background hover:shadow-lg hover:shadow-primary/25"
                : "bg-white/10 text-foreground hover:bg-white/20"
              }`}
          >
            {isInstant ? "Get Instant Funding" : "Start Challenge"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
