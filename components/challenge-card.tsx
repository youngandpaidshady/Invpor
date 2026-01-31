"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

function LensFlare({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const xPercent = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const yPercent = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const unsubscribeX = xPercent.on("change", (latest) => {
      setPos((prev) => ({ ...prev, x: latest }));
    });
    const unsubscribeY = yPercent.on("change", (latest) => {
      setPos((prev) => ({ ...prev, y: latest }));
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [xPercent, yPercent]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, hsl(var(--primary) / 0.15), transparent 40%)`,
      }}
    />
  );
}

interface ChallengeCardProps {
  accountSize: string;
  profitTarget: string;
  maxDrawdown: string;
  price: string;
  popular?: boolean;
  index: number;
}

export default function ChallengeCard({
  accountSize,
  profitTarget,
  maxDrawdown,
  price,
  popular = false,
  index,
}: ChallengeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 500,
    damping: 100,
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 500,
    damping: 100,
  });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2.5deg", "-2.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative perspective-1000"
    >
      {popular && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg">
            Most Popular
          </span>
        </motion.div>
      )}
      <div className="relative glass rounded-lg p-6 h-full flex flex-col border border-border overflow-hidden group">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Lens Flare Effect */}
        {isHovered && (
          <LensFlare mouseX={mouseXSpring} mouseY={mouseYSpring} />
        )}

        <div className="relative z-10 flex-1 space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-2">{accountSize}</h3>
            <p className="text-4xl font-bold text-primary">{price}</p>
          </div>

          {/* Rules */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-profit mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Profit Target</p>
                <p className="text-sm text-muted-foreground">{profitTarget}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Max Drawdown</p>
                <p className="text-sm text-muted-foreground">{maxDrawdown}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Profit Split</p>
                <p className="text-sm text-muted-foreground">Up to 90%</p>
              </div>
            </div>
          </div>

          {/* Features with animated checkmarks */}
          <div className="space-y-2 pt-4 border-t border-border">
            {["No Time Limit", "One-Step Challenge", "Instant Evaluation"].map((feature, idx) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + idx * 0.1 }}
                className="flex items-center space-x-2 text-sm text-muted-foreground"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.1 + 0.2 }}
                >
                  <Check className="h-4 w-4 text-profit" />
                </motion.div>
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/challenges/${accountSize.toLowerCase().replace(/\s+/g, "-")}`}
          className="relative z-10 mt-6 w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-center block"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
}
