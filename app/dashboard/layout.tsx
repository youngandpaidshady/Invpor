"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { createClient } from "@/lib/supabase/client";

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
  const router = useRouter();

  // Real user data from Supabase
  const [userName, setUserName] = useState("Trader");
  const [userInitials, setUserInitials] = useState("T");
  const [accountStatus, setAccountStatus] = useState<"challenge" | "funded">("challenge");
  const [accountSize, setAccountSize] = useState(0);
  const [phaseName, setPhaseName] = useState("Phase 1");

  useEffect(() => {
    const loadUserData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Trader";
      setUserName(name);
      setUserInitials(name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2));

      // Fetch active challenge
      const { data: challenge } = await supabase
        .from("challenges")
        .select("status, account_size, phase, type")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (challenge) {
        setAccountSize(challenge.account_size || 0);
        setAccountStatus(challenge.status === "funded" ? "funded" : "challenge");
        setPhaseName(challenge.status === "funded" ? "Funded" : `Phase ${challenge.phase || 1}`);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#050505]/80 backdrop-blur-2xl border-r border-white/[0.06] shadow-[4px_0_24px_rgba(0,0,0,0.5)] transition-all duration-300 z-40 ${isCollapsed ? "w-20" : "w-64"
          } hidden lg:block`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-border/50">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C7A257] to-[#A8843F] flex items-center justify-center shadow-[0_0_15px_rgba(199,162,87,0.2)]">
                <span className="font-display font-bold text-black text-sm">B</span>
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">BRAXLEY<span className="text-[#C7A257]">NEVIM</span></span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-all ${isCollapsed ? "mx-auto" : ""}`}
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
                className={`group flex items-center gap-3 px-3 py-3 rounded-lg font-body transition-all ${isActive
                  ? "bg-[rgba(199,162,87,0.1)] text-[#C7A257] shadow-[inset_2px_0_0_#C7A257]"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  } ${isCollapsed ? "justify-center" : ""}`}
              >
                <link.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-[#C7A257]" : "group-hover:text-white"}`} />
                {!isCollapsed && <span className="font-medium">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06] bg-[#050505]/40 backdrop-blur-md">
          <button
            type="button"
            onClick={() => window.location.href = "/"}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-body text-white/50 hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all w-full ${isCollapsed ? "justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isCollapsed ? "lg:ml-20" : "lg:ml-64"} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="h-20 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/[0.06] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Link href="/" className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C7A257] to-[#A8843F] flex items-center justify-center">
                <span className="font-display font-bold text-black text-sm">B</span>
              </div>
            </Link>
            <div className="hidden sm:block">
              <div className="text-[10px] font-mono text-[#A0A0A0] uppercase tracking-[0.2em] mb-1">Account Equity</div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse-live ${accountStatus === 'funded' ? 'bg-[#22C55E]' : 'bg-[#C7A257]'}`} />
                <span className={`font-mono font-medium text-[13px] tracking-wider ${accountStatus === 'funded' ? 'text-[#22C55E]' : 'text-[#C7A257]'}`}>
                  {phaseName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" onClick={() => alert("You have 1 new notification.")} className="relative w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.04] transition-all">
              <Bell className="w-5 h-5 text-white/50" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#C7A257] shadow-[0_0_10px_#C7A257]" />
            </button>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="font-body font-medium text-sm text-white">{userName}</div>
                <div className="text-xs text-[#A0A0A0] font-mono tracking-wide">${accountSize.toLocaleString()} Challenge</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C7A257] to-[#A8843F] flex items-center justify-center text-black font-bold font-mono tracking-widest shadow-[0_0_15px_rgba(199,162,87,0.3)]">
                {userInitials}
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
