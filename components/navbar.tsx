"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/challenges", label: "Challenges" },
  { href: "/rules", label: "Rules" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hide on auth and dashboard routes
  const hiddenRoutes = ["/login", "/signup", "/forgot-password", "/verify-email", "/reset-password", "/dashboard"];
  const isHidden = hiddenRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (isHidden) return null;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-[#0a0a09]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
          }`}
      >
        <nav className="container-wide">
          <div className="h-[72px] flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-9 h-9 bg-gradient-to-br from-[#C7A257] to-[#A8843F] flex items-center justify-center rounded-lg overflow-hidden"
              >
                {/* Logo glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-display text-black text-lg font-bold relative z-10">B</span>
              </motion.div>
              <span className="font-display text-lg tracking-wider text-white/90 hidden sm:block">
                BRAXLEY <span className="text-[#C7A257]">NEVIM</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className="relative px-4 py-2 group">
                    {/* Active indicator pill */}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveIndicator"
                        className="absolute inset-0 bg-white/[0.06] rounded-lg"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <motion.span
                      whileHover={{ y: -1 }}
                      className={`relative z-10 text-[13px] font-body font-medium tracking-wide transition-colors duration-200 ${isActive
                        ? "text-white"
                        : "text-white/40 group-hover:text-white/80"
                        }`}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:block text-[13px] text-white/40 hover:text-white transition-colors duration-200 font-body font-medium px-4 py-2"
              >
                Sign In
              </Link>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/pricing"
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C7A257] to-[#B8933E] text-black text-[11px] font-bold font-mono uppercase tracking-[0.1em] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(199,162,87,0.15)] hover:shadow-[0_0_30px_rgba(199,162,87,0.3)] transition-shadow duration-300"
                >
                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="relative z-10">Get Funded</span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Mobile toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" strokeWidth={1.5} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" strokeWidth={1.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mounted && isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-[72px] left-0 right-0 z-40 lg:hidden"
            >
              <div className="mx-4 mt-2 bg-[#111110]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                {/* Noise texture */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative p-4 space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-body font-medium transition-all ${isActive
                            ? "text-white bg-white/[0.06]"
                            : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                            }`}
                        >
                          {link.label}
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C7A257]" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom actions */}
                <div className="relative p-4 pt-2 border-t border-white/[0.06]">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-center py-3 rounded-xl border border-white/[0.08] text-white/60 text-sm font-body font-medium hover:bg-white/[0.04] transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/pricing"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-[#C7A257] to-[#B8933E] text-black text-sm font-bold font-mono uppercase tracking-wider"
                    >
                      Get Funded
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
