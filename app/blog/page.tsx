/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Mail, TrendingUp, BookOpen, Brain, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { TiltCard } from "@/components/rules/tilt-card";

const blogPosts = [
    {
        id: 1,
        title: "Mastering Risk Management in 2026",
        excerpt: "Learn the advanced strategies used by funded traders to protect capital while maximizing growth. Discover how to calculate position sizing effectively.",
        category: "Education",
        date: "Feb 2, 2026",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1611974765215-fadbf4d96a98?q=80&w=1200",
        featured: true,
        author: "Alex Morgan"
    },
    {
        id: 2,
        title: "The Psychology of a Professional Trader",
        excerpt: "Why mindset dictates 80% of your trading success and how to cultivate resilience in the face of market volatility.",
        category: "Psychology",
        date: "Jan 28, 2026",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        author: "Sarah Chen"
    },
    {
        id: 3,
        title: "Understanding Market Liquidity",
        excerpt: "How to spot institutional order flow and trade with the smart money. A deep dive into order blocks and liquidity pools.",
        category: "Analysis",
        date: "Jan 25, 2026",
        readTime: "12 min",
        image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800",
        author: "Michael Ross"
    },
    {
        id: 4,
        title: "5 Common Mistakes in Prop Trading",
        excerpt: "Avoid these pitfalls to pass your evaluation challenge on the first attempt. Essential tips for new funded traders.",
        category: "Tips",
        date: "Jan 20, 2026",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800",
        author: "David Park"
    },
    {
        id: 5,
        title: "Algorithmic Trading Basics",
        excerpt: "An introduction to automated trading strategies and how to get started with Python for finance.",
        category: "Tech",
        date: "Jan 18, 2026",
        readTime: "10 min",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800",
        author: "Emma Wilson"
    },
    {
        id: 6,
        title: "Global Macro Outlook Q1 2026",
        excerpt: "Analysis of major economic trends affecting currency markets in the first quarter of the year.",
        category: "Analysis",
        date: "Jan 15, 2026",
        readTime: "15 min",
        image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=800",
        author: "Robert Taylor"
    }
];

const categories = [
    { name: "All", icon: <Zap className="w-4 h-4" /> },
    { name: "Analysis", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "Education", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Psychology", icon: <Brain className="w-4 h-4" /> },
];

function GridPostCard({ post, index }: { post: any, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full group relative rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(199, 162, 87, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <Link href={`/blog/${post.id}`} className="flex flex-col h-full relative z-10">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-mono uppercase tracking-wider rounded-md">
                            {post.category}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-white/40 font-mono mb-4">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#C7A257] transition-colors leading-tight">
                        {post.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-6 line-clamp-2 font-light leading-relaxed">
                        {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-white/40">
                            <div className="w-6 h-6 bg-white/10 overflow-hidden rounded-full border border-white/10">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt={post.author} />
                            </div>
                            {post.author}
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#C7A257] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

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

    const filteredPosts = activeCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    const featuredPost = blogPosts.find(p => p.featured);
    const otherPosts = filteredPosts.filter(p => !p.featured || activeCategory !== "All");

    return (
        <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
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
                className="fixed top-0 right-0 w-[60%] h-[50%] pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.08) 0%, transparent 50%)",
                    transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                }}
            />
            <div
                className="fixed bottom-0 left-0 w-[40%] h-[40%] pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse at 20% 80%, rgba(255,107,53,0.06) 0%, transparent 50%)",
                }}
            />

            {/* Hero Section */}
            <motion.section
                style={{ y: heroY }}
                className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 z-10"
            >
                {/* Animated Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
                {/* Massive background text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
                    <span
                        className="text-[25vw] font-black text-white/[0.015] leading-none tracking-tighter"
                        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                    >
                        BLOG
                    </span>
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs text-white/50 uppercase tracking-[0.2em] font-mono">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Updated Daily
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8"
                        >
                            <span className="block">TRADER</span>
                            <span
                                className="block text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(135deg, #C7A257 0%, #E8D099 50%, #C7A257 100%)",
                                    WebkitBackgroundClip: "text",
                                }}
                            >
                                INSIGHTS
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg lg:text-xl text-white/40 max-w-xl leading-relaxed mb-10 font-light"
                        >
                            Expert analysis, psychology tips, and educational guides to help you master the markets.
                        </motion.p>

                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative max-w-xl group"
                        >
                            <div className="absolute inset-[-2px] bg-gradient-to-r from-[#C7A257]/0 via-[#C7A257]/20 to-[#C7A257]/0 opacity-0 group-focus-within:opacity-100 transition-opacity rounded-md blur-sm" />
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#C7A257] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-md border border-white/10 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C7A257]/50 focus:bg-white/5 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
            </motion.section>

            {/* Content Section */}
            <section className="relative z-10 pb-32 container mx-auto px-6 lg:px-12">

                {/* Categories Bar (Floating Pill Archetype) */}
                <div className="mb-16 py-6 border-b border-white/5">
                    <div className="flex items-center justify-between gap-4 overflow-x-auto">
                        <div className="flex gap-2 p-1.5 bg-white/[0.02] border border-white/5 rounded-full relative">
                            {categories.map((cat, i) => {
                                const isActive = activeCategory === cat.name;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`relative z-10 flex items-center gap-2 px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors duration-300 rounded-full ${isActive ? "text-[#0a0a0a]" : "text-white/60 hover:text-white"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeCategoryPill"
                                                className="absolute inset-0 bg-[#C7A257] rounded-full shadow-[0_0_20px_rgba(199,162,87,0.3)]"
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            />
                                        )}
                                        <span className="relative z-20 flex items-center gap-2">
                                            {cat.icon}
                                            {cat.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="hidden lg:block text-xs font-mono text-white/20 uppercase tracking-wider tabular-nums">
                            {filteredPosts.length} Articles
                        </div>
                    </div>
                </div>

                {/* Featured Post */}
                {activeCategory === "All" && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-20"
                    >
                        <Link href={`/blog/${featuredPost.id}`} className="group block h-full">
                            <TiltCard gradientColor="from-[#C7A257]/20" className="rounded-2xl">
                                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-transparent p-2">
                                    <div className="relative h-72 lg:h-auto overflow-hidden rounded-xl">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 bg-[#C7A257] text-white text-xs font-mono uppercase tracking-wider rounded-md">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center p-6 lg:p-10 lg:pl-0">
                                        <div className="flex items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-wider mb-6">
                                            <span className="text-[#C7A257]">{featuredPost.category}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredPost.date}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredPost.readTime}</span>
                                        </div>
                                        <h2 className="text-3xl lg:text-5xl font-black mb-6 group-hover:text-[#C7A257] transition-colors leading-tight tracking-tight">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-lg text-white/40 mb-8 line-clamp-3 font-light leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-white/10 border border-white/10 overflow-hidden rounded-full flex-shrink-0">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${featuredPost.author}`} alt={featuredPost.author} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="text-sm">
                                                    <div className="font-medium text-white/80">{featuredPost.author}</div>
                                                    <div className="text-white/30 text-xs font-mono">Author</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#C7A257] font-mono text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                                                Read <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </Link>
                    </motion.div>
                )}

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherPosts.map((post, index) => (
                        <GridPostCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </section>

            {/* Newsletter Section (Marketing Block Archetype) */}
            <section className="pb-32 container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="relative border border-white/10 p-8 lg:p-16 rounded-2xl bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                    {/* Glowing background blob */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7A257]/10 blur-[100px] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3" />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C7A257]/50 to-transparent" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <div className="w-14 h-14 bg-[#C7A257]/10 border border-[#C7A257]/20 flex items-center justify-center mb-8 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                <Mail className="w-7 h-7 text-[#C7A257]" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
                                SUBSCRIBE TO<br />
                                <span className="text-[#C7A257]">THE WEEKLY</span>
                            </h2>
                            <p className="text-lg text-white/40 mb-8 max-w-md font-light">
                                Join 10,000+ traders getting weekly insights, market analysis, and exclusive tips.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-5 py-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C7A257]/50 focus:bg-white/5 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                />
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); alert("Subscription successful!"); }}
                                    className="shimmer-button inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-lg overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(199,162,87,0.3)] hover:shadow-[0_0_30px_rgba(199,162,87,0.5)]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">Subscribe <ArrowRight className="w-4 h-4" /></span>
                                </button>
                            </div>
                            <p className="text-xs text-white/20 mt-4 flex items-center gap-2 font-mono">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                No spam, unsubscribe anytime
                            </p>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                                        <div className="w-10 h-10 bg-[#C7A257]/20 border border-[#C7A257]/30 rounded-lg flex items-center justify-center text-[#C7A257] font-black">A</div>
                                        <div>
                                            <div className="font-bold text-sm">BraxleyNevim Weekly</div>
                                            <div className="text-xs text-white/30 font-mono">Just now</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-4 w-3/4 bg-white/5 rounded-sm" />
                                        <div className="h-4 w-full bg-white/[0.02] rounded-sm" />
                                        <div className="h-4 w-5/6 bg-white/[0.02] rounded-sm" />
                                        <div className="h-32 w-full bg-gradient-to-br from-[#C7A257]/10 to-transparent border border-white/5 rounded-md mt-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
