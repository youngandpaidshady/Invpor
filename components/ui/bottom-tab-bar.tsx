"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Target,
  BarChart3,
  Wallet,
  Settings,
  Shield,
} from "lucide-react";

const tabs = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/challenges", icon: Target, label: "Challenges" },
  { href: "/dashboard/trades", icon: BarChart3, label: "Trades" },
  { href: "/dashboard/payouts", icon: Wallet, label: "Payouts" },
  { href: "/dashboard/kyc", icon: Shield, label: "KYC" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] h-full px-3 transition-colors",
                isActive
                  ? "text-emerald-400"
                  : "text-zinc-500 active:text-zinc-300"
              )}
            >
              <tab.icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// ===========================================
// Safe Area CSS Helper
// ===========================================
// Add this to globals.css:
// .safe-area-bottom {
//   padding-bottom: env(safe-area-inset-bottom, 0px);
// }
