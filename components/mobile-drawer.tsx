"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  X,
  Twitter,
  MessageCircle,
  Send,
  ChevronDown,
  Zap,
  Target,
  Clock,
  Flame,
  Trophy,
  Users,
  BookOpen,
  HelpCircle,
  Calculator,
  FileText,
  Wallet,
  TrendingUp,
  Shield,
  Gift,
  Star,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Challenges",
    items: [
      { icon: Target, label: "2-Step Challenge", href: "#challenges" },
      { icon: Zap, label: "1-Step Challenge", href: "#challenges", badge: "Popular" },
      { icon: Clock, label: "Instant Funding", href: "#challenges", badge: "New" },
      { icon: Flame, label: "Blitz Challenge", href: "#challenges" },
    ],
  },
  {
    title: "Trading",
    items: [
      { icon: TrendingUp, label: "Trading Rules", href: "#" },
      { icon: Calculator, label: "Profit Calculator", href: "#" },
      { icon: Shield, label: "Scaling Program", href: "#" },
      { icon: Wallet, label: "Payouts", href: "#" },
    ],
  },
  {
    title: "Resources",
    items: [
      { icon: BookOpen, label: "Trading Academy", href: "#" },
      { icon: FileText, label: "Blog", href: "#" },
      { icon: HelpCircle, label: "FAQ", href: "#faq" },
      { icon: MessageCircle, label: "Support", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { icon: Users, label: "About Us", href: "#" },
      { icon: Trophy, label: "Leaderboard", href: "#" },
      { icon: Gift, label: "Affiliates", href: "#" },
      { icon: Star, label: "Reviews", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.gg", label: "Discord" },
  { icon: Send, href: "https://t.me", label: "Telegram" },
];

function AccordionSection({ section, onClose }: { section: MenuSection; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-4 text-left"
      >
        <span className="font-semibold text-foreground">{section.title}</span>
        <ChevronDown
          className={`w-5 h-5 text-foreground/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-2 space-y-1">
              {section.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="flex-1 text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary uppercase">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-white/10 z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center font-display font-bold text-background">
                  A
                </div>
                <div>
                  <span className="font-display font-bold text-lg">
                    <span className="text-[#F97316]">
                      Alpha
                    </span>
                    <span className="text-foreground">Trader</span>
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Quick Actions */}
              <div className="p-4 space-y-2">
                <Link
                  href="#challenges"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#F97316] text-black font-semibold rounded-xl shadow-lg shadow-[#F97316]/20"
                >
                  <span>Get Funded</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl font-medium text-sm hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={onClose}
                    className="flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl font-medium text-sm hover:bg-white/10 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="px-2">
                {menuSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionSection section={section} onClose={onClose} />
                  </motion.div>
                ))}
              </div>

              {/* Quick Link - Pricing */}
              <div className="px-4 py-4 border-t border-white/5">
                <Link
                  href="#pricing"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      View Pricing
                    </div>
                    <div className="text-xs text-foreground/50">
                      Starting from $49
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-surface/30">
              {/* Social Links */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Support Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-foreground/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
