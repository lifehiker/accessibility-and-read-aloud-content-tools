"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Zap className="h-6 w-6" />
            <span>AccessiTools</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <div className="relative group">
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Compare
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link href="/compare/speechify-alternative" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  Speechify Alternative
                </Link>
                <Link href="/compare/naturalreader-alternative" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  NaturalReader Alternative
                </Link>
                <Link href="/compare/canva-alt-text-alternative" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  Canva Alt Text Alternative
                </Link>
              </div>
            </div>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Button asChild size="sm">
              <Link href="/signup">Get Started Free</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          <Link href="/#features" className="block text-sm text-gray-600" onClick={() => setMobileOpen(false)}>
            Features
          </Link>
          <Link href="/pricing" className="block text-sm text-gray-600" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          <Link href="/compare/speechify-alternative" className="block text-sm text-gray-600" onClick={() => setMobileOpen(false)}>
            Compare
          </Link>
          <Link href="/login" className="block text-sm text-gray-600" onClick={() => setMobileOpen(false)}>
            Login
          </Link>
          <Button asChild size="sm" className="w-full">
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
