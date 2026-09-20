"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, ArrowRight, Menu, X, Sparkles, CheckCircle2 } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            <FileText size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              CareerCraft
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 -mt-1">
              Free ATS Resume Builder
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#templates"
            className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Templates
          </a>
          <a
            href="#examples"
            className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Sample Resumes
          </a>
          <a
            href="#why-us"
            className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Why CareerCraft
          </a>
          <a
            href="#faq"
            className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => router.push("/editor")}
            className="group flex items-center gap-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full transition-all shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 cursor-pointer"
          >
            <span>Build My Resume Free</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-5 flex flex-col gap-4 shadow-xl">
          <a
            href="#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-gray-700 hover:text-indigo-600 py-1"
          >
            Templates Gallery
          </a>
          <a
            href="#examples"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-gray-700 hover:text-indigo-600 py-1"
          >
            Sample Resumes by Role
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-gray-700 hover:text-indigo-600 py-1"
          >
            Why Us vs Competitors
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-gray-700 hover:text-indigo-600 py-1"
          >
            FAQ
          </a>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/editor");
              }}
              className="w-full flex items-center justify-center gap-2 text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-md cursor-pointer"
            >
              <span>Build My Resume Free</span>
              <ArrowRight size={18} />
            </button>
            <p className="text-center text-xs text-gray-500 font-medium">
              ✓ Free PDF • No credit card • No signup
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
