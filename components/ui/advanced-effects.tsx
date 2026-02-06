"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Advanced Effects - Pure CSS / JS Implementation
 * Replaces framer-motion with native web technologies for stability
 */

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

export function MagneticButton({
    children,
    className = "",
    onClick
}: MagneticButtonProps) {
    // Simplified to a subtle scale/transform on hover without spring physics to avoid runtime complexity
    return (
        <button
            onClick={onClick}
            className={cn("transition-transform duration-200 hover:scale-105 active:scale-95", className)}
        >
            {children}
        </button>
    );
}

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export function AnimatedCounter({
    value,
    duration = 2,
    prefix = "",
    suffix = "",
    className = ""
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number;
                    const animate = (timestamp: number) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                        setCount(Math.floor(eased * value));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(value);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, duration, hasAnimated]);

    return (
        <div ref={ref} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </div>
    );
}

interface FloatingParticlesProps {
    count?: number;
    color?: string;
}

export function FloatingParticles({ count = 20, color = "#ff6b35" }: FloatingParticlesProps) {
    // Pure CSS floating particles
    const [particles, setParticles] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: count }, (_, i) => ({
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    backgroundColor: color,
                    opacity: 0.2,
                    animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                    animationDelay: `-${Math.random() * 20}s`
                }
            }))
        );
    }, [count, color]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={p.style}
                />
            ))}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); opacity: 0.1; }
                    50% { transform: translateY(-30px); opacity: 0.3; }
                    100% { transform: translateY(0px); opacity: 0.1; }
                }
            `}</style>
        </div>
    );
}

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setVisible(true);
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={ref} className={className}>
            {children.split("").map((char, i) => (
                <span
                    key={i}
                    className={cn(
                        "inline-block transition-all duration-500",
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{
                        transitionDelay: `${delay + i * 0.03}s`,
                        whiteSpace: char === " " ? "pre" : "normal"
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}

interface GlowingOrbProps {
    size?: number;
    color?: string;
    className?: string;
}

export function GlowingOrb({ size = 200, color = "#ff6b35", className = "" }: GlowingOrbProps) {
    return (
        <div
            className={`absolute rounded-full blur-3xl pointer-events-none animate-pulse-slow ${className}`}
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            }}
        >
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.2); opacity: 0.5; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    direction?: "left" | "right";
    className?: string;
}

export function Marquee({ children, speed = 20, direction = "left", className = "" }: MarqueeProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <div
                className="flex gap-8 whitespace-nowrap"
                style={{
                    animation: `marquee-${direction} ${speed}s linear infinite`
                }}
            >
                {children}
                {children}
            </div>
            <style jsx>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}

interface SplitTextProps {
    children: string;
    className?: string;
    delay?: number;
}

export function SplitText({ children, className = "", delay = 0 }: SplitTextProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setVisible(true);
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const words = children.split(" ");
    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className={cn(
                        "inline-block mr-[0.25em] transition-all duration-700 ease-out",
                        visible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-8 -rotate-12"
                    )}
                    style={{ transitionDelay: `${delay + i * 0.08}s` }}
                >
                    {word}
                </span>
            ))}
        </span>
    );
}
