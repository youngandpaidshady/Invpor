"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Settings,
  ChevronLeft,
  Bell,
  LogOut,
  Target,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { BottomTabBar } from "@/components/ui/bottom-tab-bar";

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/challenges", icon: Target, label: "Challenges" },
  { href: "/dashboard/trades", icon: BarChart3, label: "Trade History" },
  { href: "/dashboard/payouts", icon: Wallet, label: "Payouts" },
  { href: "/dashboard/kyc", icon: ShieldCheck, label: "KYC Verification" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-card/50 backdrop-blur-xl border-r border-border transition-all duration-300 z-40 ${isCollapsed ? "w-20" : "w-64"
          } hidden lg:block`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-border/50">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-serif font-bold text-primary-foreground text-sm">A</span>
              </div>
              <span className="font-serif font-bold text-lg tracking-tight">AlphaTrader</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center hover:bg-muted transition-colors ${isCollapsed ? "mx-auto" : ""}`}
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  } ${isCollapsed ? "justify-center" : ""}`}
              >
                <link.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
                {!isCollapsed && <span className="font-medium">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-card/20 backdrop-blur-sm">
          <button
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full ${isCollapsed ? "justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isCollapsed ? "lg:ml-20" : "lg:ml-64"} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="h-20 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Link href="/" className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-serif font-bold text-primary-foreground text-sm">A</span>
              </div>
            </Link>
            <div className="hidden sm:block">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">Account Status</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-emerald-500 text-sm">Active & Funded</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-primary" />
            </button>
            <div className="h-8 w-px bg-border/50" />
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="font-medium text-sm">John Doe</div>
                <div className="text-xs text-muted-foreground">$25,000 Challenge</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#E8C878] flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20">
                JD
              </div>
            </div>
            {/* Mobile Menu Trigger would go here */}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto">{children}</main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
}
