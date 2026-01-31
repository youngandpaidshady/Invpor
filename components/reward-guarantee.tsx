"use client";

import { motion } from "framer-motion";
import { Shield, Clock, CreditCard, Zap } from "lucide-react";

export default function RewardGuarantee() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-surface to-profit/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Main guarantee */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-profit/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-profit" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Reward Guarantee</h3>
              <p className="text-muted-foreground">
                Get paid within <span className="text-profit font-semibold">2 business days</span> or we pay an extra{" "}
                <span className="text-profit font-semibold">$500</span>
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>On-Demand Payouts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4 text-primary" />
              <span>Crypto & Bank Transfer</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              <span>100% Profit Split Available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
