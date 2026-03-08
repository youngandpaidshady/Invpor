"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = {
  platform: [
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Challenges", href: "/challenges" },
    { label: "Trading Rules", href: "/rules" },
    { label: "FAQ", href: "/faq" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Scaling Plan", href: "/scaling" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refunds" },
    { label: "Risk Disclosure", href: "/risk" },
  ],
};

export function Footer() {
  const pathname = usePathname();

  // Hide on auth and dashboard routes
  const hiddenRoutes = ["/login", "/signup", "/forgot-password", "/verify-email", "/reset-password", "/dashboard"];
  if (hiddenRoutes.some((route) => pathname.startsWith(route))) return null;

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.06] overflow-hidden">
      {/* Ambient gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,162,87,0.06)_0%,transparent_60%)]" />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-wide relative z-10">
        {/* Main Footer Grid */}
        <div className="py-16 lg:py-20 grid grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-9 h-9 bg-gradient-to-br from-[#C7A257] to-[#A8843F] flex items-center justify-center rounded-lg transition-shadow group-hover:shadow-[0_0_20px_rgba(199,162,87,0.3)]">
                <span className="font-display text-black text-lg font-bold">B</span>
              </div>
              <span className="font-display text-lg tracking-wider text-white/90">
                BRAXLEY<span className="text-[#C7A257]">NEVIM</span>
              </span>
            </Link>
            <p className="text-[13px] text-white/30 max-w-xs leading-relaxed mb-8 font-body">
              Proprietary trading firm providing funded accounts up to $200,000 with up to 90% profit share. On-demand payouts. No time limits.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                {
                  label: "X",
                  svg: (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  ),
                },
                {
                  label: "Discord",
                  svg: (
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963a.075.075 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                  ),
                },
                {
                  label: "Telegram",
                  svg: (
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-[#C7A257] hover:border-[#C7A257]/30 hover:bg-[#C7A257]/[0.05] transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    {social.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="lg:col-span-2 lg:col-start-auto">
              <h4 className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-white/20 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-200 font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 font-mono tracking-wider">
            &copy; {new Date().getFullYear()} BraxleyNevim Ltd. All rights reserved.
          </p>
          <p className="text-[10px] text-white/15 font-mono text-center lg:text-right max-w-lg leading-relaxed">
            Trading foreign exchange and other financial instruments carries substantial risk.
            Past performance does not guarantee future results. This is not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
