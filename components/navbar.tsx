"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/rules", label: "Rules" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${isScrolled
          ? "bg-[#09090B]/95 backdrop-blur-md border-b border-[#3F3F46]"
          : "bg-transparent"
        }`}
    >
      <nav className="container-wide">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#F97316] flex items-center justify-center transition-shadow group-hover:shadow-glow-magma-sm">
              <span className="font-bold text-black text-sm">A</span>
            </div>
            <span className="font-bold text-white tracking-tight hidden sm:block">
              ALPHA<span className="text-[#F97316]">TRADER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#A1A1AA] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block text-sm text-[#A1A1AA] hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/pricing"
              className="btn-primary text-xs py-2 px-4"
            >
              GET FUNDED
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-[#F97316]"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mounted && isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden bg-[#09090B] border-t border-[#3F3F46]"
        >
          <div className="container-wide py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block text-lg text-[#A1A1AA] hover:text-[#F97316] py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#3F3F46]">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="block text-lg text-[#A1A1AA] hover:text-white py-2"
              >
                Login
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
