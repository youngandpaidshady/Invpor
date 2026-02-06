"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Navbar - Hydration-Safe Implementation
 * 
 * Mobile menu only renders AFTER client mount to avoid hydration mismatch
 */

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/rules", label: "Rules" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsScrolled(window.scrollY > 20);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Consistent class on server and client - only add scroll effect after mount
  const headerClass = mounted && isScrolled
    ? "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5"
    : "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <span className="font-black text-black text-sm">A</span>
            </div>
            <span className="font-bold text-white tracking-tight">
              ALPHA<span className="text-white/40">TRADER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Link
              href="/login"
              className="hidden lg:block text-sm text-white/50 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/pricing"
              className="hidden sm:block px-6 py-2.5 bg-white text-black text-sm font-bold hover:bg-[#ff6b35] hover:text-white transition-all"
            >
              Get Funded
            </Link>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Only render after mount to avoid hydration mismatch */}
      {mounted && (
        <div
          className={`lg:hidden bg-[#0a0a0a] border-t border-white/5 overflow-hidden transition-all duration-300 ${isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="container mx-auto px-6 py-8 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block py-3 text-lg text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="block text-center py-3 text-white/50 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsMobileOpen(false)}
                className="block text-center py-4 bg-white text-black font-bold"
              >
                Get Funded
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
