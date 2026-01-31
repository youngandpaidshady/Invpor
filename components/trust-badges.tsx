"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "MetaTrader 4", logo: "MT4" },
  { name: "MetaTrader 5", logo: "MT5" },
  { name: "TradingView", logo: "TV" },
  { name: "cTrader", logo: "cT" },
  { name: "NinjaTrader", logo: "NT" },
];

export default function TrustBadges() {
  return (
    <section className="py-16 border-y border-border bg-surface/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            Trusted by 10,000+ traders worldwide
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-transparent hover:border-border hover:bg-surface/50 transition-all cursor-default">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {partner.logo}
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">4.9/5</p>
            <p className="text-sm text-muted-foreground">Trustpilot Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">99.9%</p>
            <p className="text-sm text-muted-foreground">Uptime SLA</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">&lt;24h</p>
            <p className="text-sm text-muted-foreground">Payout Speed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">256-bit</p>
            <p className="text-sm text-muted-foreground">SSL Encryption</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
