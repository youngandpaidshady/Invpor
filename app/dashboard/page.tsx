"use client";

import { TrendingUp, DollarSign, Activity, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for equity curve
const equityData = [
  { date: "Day 1", equity: 25000 },
  { date: "Day 2", equity: 25200 },
  { date: "Day 3", equity: 25100 },
  { date: "Day 4", equity: 25300 },
  { date: "Day 5", equity: 25500 },
  { date: "Day 6", equity: 25700 },
  { date: "Day 7", equity: 25600 },
];

const activeRules = [
  { rule: "Max Daily Loss", status: "active", value: "$1,250" },
  { rule: "Max Drawdown", status: "active", value: "$1,250" },
  { rule: "Profit Target", status: "pending", value: "$2,000" },
  { rule: "Minimum Trading Days", status: "active", value: "5 days" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Account Balance</p>
              <p className="text-2xl font-bold text-foreground mt-1">$25,600</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="glass p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profit/Loss</p>
              <p className="text-2xl font-bold text-profit mt-1">+$600</p>
            </div>
            <TrendingUp className="h-8 w-8 text-profit" />
          </div>
        </div>
        <div className="glass p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-2xl font-bold text-foreground mt-1">68%</p>
            </div>
            <Target className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="glass p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Trades Today</p>
              <p className="text-2xl font-bold text-foreground mt-1">12</p>
            </div>
            <Activity className="h-8 w-8 text-electric-violet" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Curve */}
        <div className="lg:col-span-2 glass p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Equity Curve</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={equityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--surface))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="equity"
                stroke="hsl(var(--profit))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--profit))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active Rules */}
        <div className="glass p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Active Rules</h2>
          <div className="space-y-4">
            {activeRules.map((rule, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-surface rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{rule.rule}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rule.value}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    rule.status === "active"
                      ? "bg-profit/20 text-profit"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {rule.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
