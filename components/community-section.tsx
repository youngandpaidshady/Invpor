"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send, Twitter, Users, Trophy, TrendingUp } from "lucide-react";

const communityStats = [
  { icon: Users, value: "50K+", label: "Community Members" },
  { icon: Trophy, value: "1,200+", label: "Monthly Winners" },
  { icon: TrendingUp, value: "$2.5M+", label: "Monthly Payouts" },
];

const socialLinks = [
  {
    name: "Discord",
    icon: MessageCircle,
    description: "Join 30K+ traders sharing strategies and tips",
    members: "30,000+",
    href: "https://discord.gg",
    color: "from-indigo-500 to-violet-500",
  },
  {
    name: "Telegram",
    icon: Send,
    description: "Get instant updates and trade signals",
    members: "15,000+",
    href: "https://t.me",
    color: "from-sky-500 to-blue-500",
  },
  {
    name: "Twitter",
    icon: Twitter,
    description: "Follow us for news and announcements",
    members: "25,000+",
    href: "https://twitter.com",
    color: "from-sky-400 to-blue-400",
  },
];

export function CommunitySection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-surface/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,255,0,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">
              Join Our{" "}
              <span className="text-[#F97316]">
                Trading Community
              </span>
            </h2>
            <p className="text-lg text-foreground/60 mb-8">
              Connect with thousands of traders worldwide. Share strategies,
              learn from experts, and grow together. Our community is free to
              join and open to everyone.
            </p>

            {/* Community Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {communityStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-background/50 rounded-xl border border-white/10"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <ul className="space-y-3">
              {[
                "Daily market analysis and trade ideas",
                "Live trading sessions with pro traders",
                "Exclusive educational content",
                "Early access to new features",
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-foreground/80">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Social Cards */}
          <div className="space-y-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-6 p-6 bg-background/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-primary/30 transition-all"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <social.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{social.name}</h3>
                  <p className="text-sm text-foreground/60 mb-2">
                    {social.description}
                  </p>
                  <span className="text-sm font-medium text-primary">
                    {social.members} members
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
