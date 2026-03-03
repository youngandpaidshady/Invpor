"use client";

import Link from "next/link";

const links = {
  platform: [
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Trading Rules", href: "/rules" },
    { label: "FAQ", href: "/faq" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Affiliates", href: "/affiliates" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Refunds", href: "/refund" },
    { label: "Risk", href: "/risk" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-[#1C1C22]">
      <div className="container-wide">
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-arctic flex items-center justify-center">
                <span className="font-display text-[#050507] text-lg">A</span>
              </div>
              <span className="font-display text-lg tracking-wider text-[#E8E8ED]">
                ALPHA<span className="text-arctic">TRADER</span>
              </span>
            </Link>
            <p className="text-sm text-[#6B6B76] max-w-xs leading-relaxed mb-6 font-body">
              Proprietary trading firm.
              $200K funding. 90% profit split.
              On-demand payouts.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 border border-[#2A2A32] flex items-center justify-center text-[#6B6B76] hover:border-arctic hover:text-arctic transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-[#2A2A32] flex items-center justify-center text-[#6B6B76] hover:border-arctic hover:text-arctic transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" /></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-[#2A2A32] flex items-center justify-center text-[#6B6B76] hover:border-arctic hover:text-arctic transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="eyebrow mb-6">PLATFORM</h4>
            <ul className="space-y-3">
              {links.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#6B6B76] hover:text-arctic transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-6">COMPANY</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#6B6B76] hover:text-arctic transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-6">LEGAL</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#6B6B76] hover:text-arctic transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#1C1C22] flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#4A4A54] font-mono tracking-wider">
          <p>&copy; {new Date().getFullYear()} BraxleyNevim. All rights reserved.</p>
          <p className="text-center lg:text-right max-w-md">
            Trading involves substantial risk. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}

